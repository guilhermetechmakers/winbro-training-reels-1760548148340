export interface Video {
  id: string;
  title: string;
  description?: string;
  duration: number; // in seconds
  thumbnail_url?: string;
  video_url: string;
  transcript?: string;
  tags: string[];
  machine_type?: string;
  process_type?: string;
  tooling?: string;
  step?: string;
  privacy_level: PrivacyLevel;
  status: VideoStatus;
  uploaded_by: string;
  organization_id?: string;
  customer_access: string[]; // customer IDs that can access this video
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
}

export type PrivacyLevel = 'public' | 'internal' | 'customer_specific' | 'private';
export type VideoStatus = 'draft' | 'processing' | 'pending_review' | 'published' | 'archived';

export interface CreateVideoInput {
  title: string;
  description?: string;
  machine_type?: string;
  process_type?: string;
  tooling?: string;
  step?: string;
  privacy_level: PrivacyLevel;
  tags: string[];
  organization_id?: string;
  customer_access?: string[];
}

export interface UpdateVideoInput {
  id: string;
  title?: string;
  description?: string;
  tags?: string[];
  machine_type?: string;
  process_type?: string;
  tooling?: string;
  step?: string;
  privacy_level?: PrivacyLevel;
  status?: VideoStatus;
  customer_access?: string[];
}

export interface VideoComment {
  id: string;
  video_id: string;
  user_id: string;
  content: string;
  timestamp?: number; // video timestamp in seconds
  created_at: string;
  updated_at: string;
}

export interface VideoBookmark {
  id: string;
  video_id: string;
  user_id: string;
  created_at: string;
}
