import { createClient } from "@/utils/supabase/supabase/client";

export interface ITicketMetadata {
    targetPath: string;
    editionId?: string;
    [key: string]: any;
}

/**
 * Generates an ephemeral ticket (Magic Link) for a user.
 * @param profileId - The UUID of the user (matching auth.users.id)
 * @param metadata - Information about the destination and context
 * @param expiresInMinutes - How long the ticket is valid (default 5 min)
 * @returns The ticket ID
 */
export async function createAuthTicket(
    profileId: string,
    metadata: ITicketMetadata,
    expiresInMinutes = 5
) {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);

    const { data, error } = await createClient()
        .from('auth_tickets')
        .insert({
            profile_id: profileId,
            metadata,
            expires_at: expiresAt.toISOString(),
        })
        .select('id')
        .single();

    if (error) {
        console.error("Error creating auth ticket:", error);
        throw new Error("Failed to create secure redirection ticket.");
    }

    return data.id;
}

/**
 * Validates a ticket ID and returns the associated data.
 * @param ticketId - The UUID of the ticket
 */
export async function validateAndConsumeTicket(ticketId: string) {
    // Check ticket
    const { data: ticket, error } = await createClient()
        .from('auth_tickets')
        .select('*')
        .eq('id', ticketId)
        .eq('used_at', null) // only unused
        .single();

    if (error || !ticket) {
        return { valid: false, error: 'Ticket non-existent or already used.' };
    }

    // Check expiration
    const now = new Date();
    const expiresAt = new Date(ticket.expires_at);
    if (now > expiresAt) {
        return { valid: false, error: 'Ticket expired.' };
    }

    // Mark as used (or delete)
    // Deleting is more secure for ephemeral tokens
    const { error: deleteError } = await createClient()
        .from('auth_tickets')
        .delete()
        .eq('id', ticketId);

    if (deleteError) {
        console.error("Error consuming ticket:", deleteError);
        return { valid: false, error: 'Internal server error.' };
    }

    return { valid: true, ticket };
}

/**
 * Checks if a user is already registered for a specific edition.
 */
export async function checkEditionParticipation(profileId: string, editionId: string) {
    const { data, error } = await createClient()
        .from('event_participants')
        .select('id')
        .eq('profile_id', profileId)
        .eq('edition_id', editionId)
        .maybeSingle();

    if (error) {
        console.error("Error checking participation:", error);
        return false;
    }

    return !!data;
}

/**
 * Gets the email of a user by their profile_id.
 * It resolves the auth_id from the profiles table first.
 */
export async function getUserEmail(profileId: string) {
    const supabase = createClient();

    // First, try to find the auth_id in the profiles table
    const { data: profile } = await supabase
        .from('profiles')
        .select('auth_id')
        .eq('id', profileId)
        .maybeSingle();

    const targetAuthId = profile?.auth_id || profileId;

    const { data, error } = await supabase.auth.admin.getUserById(targetAuthId);
    if (error || !data.user) {
        return null;
    }
    return data.user.email;
}

/**
 * Generates a Supabase authentication link for the user.
 * This is the "Magic" part that logs in the user via Supabase.
 */
export async function generateSupabaseAuthLink(email: string, redirectTo: string) {
    const { data, error } = await createClient().auth.admin.generateLink({
        type: 'magiclink',
        email,
        options: { redirectTo }
    });

    if (error) {
        console.error("Error generating Supabase auth link:", error);
        throw new Error("Failed to generate authentication link.");
    }

    return data.properties.action_link;
}

/**
 * High-level utility to generate a secure magic link URL for the public site.
 * This URL will point to our Route Handler, which will then validate and log in the user.
 * @param authUserId - The ID from Supabase Auth (user.id)
 */
export async function getSecureMagicLink(
    authUserId: string,
    metadata: ITicketMetadata,
    baseUrl: string
) {
    const supabase = createClient();

    // Resolve the internal profile.id for the ticket
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('auth_id', authUserId)
        .maybeSingle();

    const profileIdForTicket = profile?.id || authUserId;

    const ticketId = await createAuthTicket(profileIdForTicket, metadata);
    // Construct the full link to our API route: /api/magic-link/[ticketId]
    const absoluteUrl = new URL(`/api/magic-link/${ticketId}`, baseUrl);
    return absoluteUrl.toString();
}
