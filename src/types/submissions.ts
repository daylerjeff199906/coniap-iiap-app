import { IProfile } from './profile';

export type SubmissionStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'changes_requested'
  | 'approved'
  | 'rejected';

export interface EventSubmission {
  id: string;
  profile_id: string;
  main_event_id?: string | null;
  edition_id?: string | null;
  call_id?: string | null;
  topic_id?: number | string | null;
  title: string;
  status: SubmissionStatus;
  metadata?: Record<string, any>;
  is_admin_upload: boolean;
  created_at: string;
  updated_at: string;
  
  // Relations
  profile?: IProfile;
  files?: SubmissionFile[];
  comments?: SubmissionComment[];
}

export interface SubmissionFile {
  id: string;
  submission_id: string;
  file_name: string;
  file_url: string;
  document_type?: string | null;
  mime_type?: string | null;
  size_bytes?: number | null;
  created_at: string;
}

export interface SubmissionComment {
  id: string;
  submission_id: string;
  profile_id: string;
  content: string;
  created_at: string;
  profile?: IProfile;
}
