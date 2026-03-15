'use server';

import { createClient } from '@/utils/supabase/supabase/server';
import { cookies } from 'next/headers';
import { SubmissionStatus } from '@/types/submissions';
import { revalidatePath } from 'next/cache';

export async function getSubmissions(filters?: {
    eventId?: string;
    editionId?: string;
    status?: string;
    q?: string;
}) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
        .from('event_submissions')
        .select(`
            *,
            profile:profiles (
                id,
                first_name,
                last_name,
                email,
                avatar_url,
                institution
            ),
            files:submission_files (
                id,
                file_name,
                file_url,
                document_type
            ),
            comments:submission_comments (
                id,
                comment,
                created_at,
                profile:profiles (
                    id,
                    first_name,
                    last_name,
                    email
                )
            ),
            main_events (
                name
            ),
            editions (
                name,
                year
            )
        `)
        .order('created_at', { ascending: false });

    if (filters?.eventId && filters.eventId !== 'all') {
        query = query.eq('main_event_id', filters.eventId);
    }
    if (filters?.editionId && filters.editionId !== 'all') {
        query = query.eq('edition_id', filters.editionId);
    }
    if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching submissions:', error);
        return [];
    }

    return data;
}

export async function getSubmissionById(id: string) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
        .from('event_submissions')
        .select(`
            *,
            profile:profiles (
                id,
                first_name,
                last_name,
                email,
                avatar_url,
                institution
            ),
            files:submission_files (
                id,
                file_name,
                file_url,
                document_type
            ),
            comments:submission_comments (
                id,
                comment,
                created_at,
                profile:profiles (
                    id,
                    first_name,
                    last_name,
                    email
                )
            ),
            main_events (
                name
            ),
            editions (
                name,
                year
            )
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching submission:', error);
        return null;
    }

    return data;
}

export async function updateSubmissionStatus(id: string, status: SubmissionStatus) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
        .from('event_submissions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        console.error('Error updating submission status:', error);
        return { error: 'No se pudo actualizar el estado.' };
    }

    revalidatePath(`/admin/submissions/${id}`);
    revalidatePath(`/admin/submissions`);
    return { success: true };
}

export async function addSubmissionComment(submissionId: string, profileId: string, comment: string) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
        .from('submission_comments')
        .insert({
            submission_id: submissionId,
            profile_id: profileId,
            comment,
        });

    if (error) {
        console.error('Error adding comment:', error);
        return { error: 'No se pudo enviar el comentario.' };
    }

    revalidatePath(`/admin/submissions/${submissionId}`);
    return { success: true };
}

export async function getEventsList() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
        .from('main_events')
        .select('id, name')
        .order('name', { ascending: true });

    if (error) return [];
    return data;
}

export async function getEditionsList() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
        .from('editions')
        .select('id, name, year, main_event_id')
        .order('year', { ascending: false });

    if (error) return [];
    return data;
}

export async function getEditionsByEvent(eventId: string) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
        .from('editions')
        .select('id, name, year, main_event_id')
        .eq('main_event_id', eventId)
        .order('year', { ascending: false });

    if (error) return [];
    return data;
}

export async function insertDirectSubmission(data: {
    userId: string;
    title: string;
    documentType: string;
    mainEventId?: string;
    editionId?: string;
    callId?: string;
    fileUrl?: string;
    fileName?: string;
}) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: res, error } = await supabase
        .from('event_submissions')
        .insert({
            profile_id: data.userId,
            title: data.title,
            main_event_id: data.mainEventId || null,
            edition_id: data.editionId || null,
            call_id: data.callId || null,
            status: 'submitted',
            is_admin_upload: true
        })
        .select('id')
        .single();

    if (error) {
        console.error('Error insertDirectSubmission:', error);
        return { error: error.message };
    }

    if (data.fileUrl) {
        const { error: fileError } = await supabase
            .from('submission_files')
            .insert({
                submission_id: res.id,
                file_name: data.fileName || 'document.pdf',
                file_url: data.fileUrl,
                document_type: data.documentType
            });
        
        if (fileError) {
            console.error('Error insert file:', fileError);
        }
    }

    revalidatePath('/admin/submissions');
    return { success: true, id: res.id };
}

export async function getCallsList(eventId?: string, editionId?: string) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
        .from('event_calls')
        .select('id, name')
        .eq('is_active', true);

    if (editionId) {
        query = query.eq('edition_id', editionId);
    } else if (eventId) {
        query = query.eq('main_event_id', eventId);
    }

    const { data, error } = await query;
    if (error) return [];
    return data;
}

export async function searchProfiles(queryText: string) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email')
        .or(`email.ilike.%${queryText}%,first_name.ilike.%${queryText}%,last_name.ilike.%${queryText}%`)
        .limit(10);

    if (error) {
        console.error('Error searching profiles:', error);
        return [];
    }
    return data;
}
