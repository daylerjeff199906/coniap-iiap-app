import { NextRequest, NextResponse } from "next/server";
import {
    validateAndConsumeTicket,
    checkEditionParticipation,
    getUserEmail,
    generateSupabaseAuthLink
} from "@/lib/auth-tickets";

/**
 * Route Handler to handle the "Magic Link" or "Secure Redirection".
 * Receives the ticketId, validates it, checks the user participation 
 * for the edition, and redirects them to the Intranet with a Supabase session.
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ ticketId: string }> }
) {
    const { ticketId } = await params;

    // 1. Validate the ticket from the public site request
    const validation = await validateAndConsumeTicket(ticketId);

    if (!validation.valid || !validation.ticket) {
        console.error("Secure Redirection Error:", validation.error);
        return NextResponse.redirect(new URL('/login?error=invalid_ticket', request.url));
    }

    const { profile_id, metadata } = validation.ticket;
    const { targetPath, editionId } = metadata || {};

    try {
        // 2. Determine the user email (required to generate Supabase magic link)
        const email = await getUserEmail(profile_id);
        if (!email) {
            return NextResponse.redirect(new URL('/login?error=user_not_found', request.url));
        }

        // 3. Check for edition participation before final destination
        let finalDestinationPath = targetPath || '/dashboard';

        if (editionId) {
            const isRegistered = await checkEditionParticipation(profile_id, editionId);
            if (!isRegistered) {
                // User hasn't registered for this edition yet - redirect to registration form
                // Example: /editions/[slug]/registration or similar
                // We'll redirect to a generic editions page or registration path if not found
                finalDestinationPath = `/editions/registration?edition_id=${editionId}`;
            }
        }

        // 4. Generate the one-time authentication link from Supabase
        // We'll redirect to the target path once the session is established
        const absoluteRedirectUrl = new URL(finalDestinationPath, request.url).toString();
        const authLink = await generateSupabaseAuthLink(email, absoluteRedirectUrl);

        // 5. Final redirect: This logs in the user and then takes them to their destination
        return NextResponse.redirect(authLink);

    } catch (error: any) {
        console.error("Magic Link Logic Error:", error);
        return NextResponse.redirect(new URL('/login?error=server_error', request.url));
    }
}
