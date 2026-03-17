'use server';

import { createClient } from '@/utils/supabase/supabase/server';
import { cookies } from 'next/headers';
import { SubmissionStatus } from '@/types/submissions';
import { revalidatePath } from 'next/cache';

import { unstable_noStore as noStore } from 'next/cache';

export async function getSubmissions(filters?: {
    eventId?: string;
    editionId?: string;
    callId?: string;
    status?: string;
    q?: string;
}) {
    noStore();
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
                content,  
                created_at,
                is_internal,
                author:profiles!fk_comment_author (
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
    if (filters?.callId && filters.callId !== 'all') {
        query = query.eq('call_id', filters.callId);
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
    noStore();
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
                content,
                created_at,
                file_id,
                file:submission_files!fk_comment_file (
                    file_name
                ),
                author:profiles!fk_comment_author (
                    id,
                    first_name,
                    last_name,
                    email,
                    user_roles (
                        roles:role_id (
                            name
                        )
                    )
                )
            ),
            history:submission_history (
                id,
                old_status,
                new_status,
                justification,
                created_at,
                profile:profiles!fk_history_profile (
                    id,
                    first_name,
                    last_name,
                    email,
                    avatar_url,
                    user_roles (
                        roles:role_id (
                            name
                        )
                    )
                )
            ),
            main_events (
                name
            ),
            editions (
                name,
                year
            ),
            event_calls (
                title
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

export async function reviewSubmission(id: string, status: SubmissionStatus, justification?: string) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: sub } = await supabase
        .from('event_submissions')
        .select('call_id, profile_id')
        .eq('id', id)
        .single();

    const { error } = await supabase.rpc('review_submission', {
        p_submission_id: id,
        p_new_status: status,
        p_justification: justification || null
    });

    if (error) {
        console.error('Error reviewing submission:', error);
        return { error: 'No se pudo actualizar el estado del trabajo.' };
    }

    if (sub?.call_id && sub?.profile_id) {
        const { error: appError } = await supabase
            .from('call_applications')
            .update({ status: status as any, updated_at: new Date().toISOString() })
            .eq('call_id', sub.call_id)
            .eq('profile_id', sub.profile_id);
            
        if (appError) {
            console.error('Error updating call_applications status:', appError);
        }
    }

    revalidatePath(`/admin/submissions/${id}`);
    revalidatePath(`/admin/submissions`);
    return { success: true };
}

export async function addSubmissionComment(submissionId: string, profileId: string, comment: string, fileId?: string) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
        .from('submission_comments')
        .insert({
            submission_id: submissionId,
            author_id: profileId,
            content: comment,
            file_id: fileId || null
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

    // Si está ligado a una convocatoria, registrar/actualizar la solicitud (call_applications)
    if (data.callId) {
        const { data: existingApp } = await supabase
            .from('call_applications')
            .select('id')
            .eq('call_id', data.callId)
            .eq('profile_id', data.userId)
            .maybeSingle();

        if (!existingApp) {
            await supabase
                .from('call_applications')
                .insert({
                    call_id: data.callId,
                    profile_id: data.userId,
                    status: 'submitted' as any, // 'submitted' o equivalente en application_status
                    submitted_at: new Date().toISOString()
                });
        } else {
            await supabase
                .from('call_applications')
                .update({ status: 'submitted' as any, updated_at: new Date().toISOString(), submitted_at: new Date().toISOString() })
                .eq('id', existingApp.id);
        }
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

export async function searchUsersForDirectUpload(queryText: string, eventId?: string, editionId?: string) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Si no hay evento ni edición seleccionados, buscar todos los perfiles en general
    if ((!eventId || eventId === 'none') && (!editionId || editionId === 'none')) {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, first_name, last_name, email')
            .or(`first_name.ilike.%${queryText}%,last_name.ilike.%${queryText}%,email.ilike.%${queryText}%`)
            .limit(10);

        if (error) {
            console.error('Error searching profiles:', error);
            return [];
        }
        return data || [];
    }

    // Buscar entre los participantes del evento/edición
    let query = supabase
        .from('event_participants')
        .select(`
            profile_id,
            profiles:profile_id!inner (
                id,
                first_name,
                last_name,
                email
            )
        `)
        .limit(10);

    if (editionId && editionId !== 'none') {
        query = query.eq('edition_id', editionId);
    } else if (eventId && eventId !== 'none') {
        query = query.eq('main_event_id', eventId);
    }

    if (queryText) {
        const q = `%${queryText}%`;
        query = query.or(`first_name.ilike.${q},last_name.ilike.${q},email.ilike.${q}`, { foreignTable: 'profiles' });
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error searching event participants:', error);
        return [];
    }

    // Transformar el resultado para que coincida con la estructura de un Perfil
    return (data as any[]).map((item) => ({
        id: item.profiles.id,
        first_name: item.profiles.first_name,
        last_name: item.profiles.last_name,
        email: item.profiles.email
    }));
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
