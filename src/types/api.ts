export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: Record<string, any>;
}

export interface SearchFilters {
  query?: string;
  tags?: string[];
  machine_type?: string;
  process_type?: string;
  privacy_level?: string;
  status?: string;
  date_from?: string;
  date_to?: string;
  duration_min?: number;
  duration_max?: number;
  uploaded_by?: string;
  organization_id?: string;
  customer_id?: string;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface BulkAction {
  action: 'delete' | 'archive' | 'publish' | 'assign' | 'change_privacy';
  item_ids: string[];
  parameters?: Record<string, any>;
}

export interface UploadProgress {
  file_id: string;
  filename: string;
  progress: number; // 0-100
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}

export interface NotificationSettings {
  email_notifications: boolean;
  push_notifications: boolean;
  digest_frequency: 'daily' | 'weekly' | 'monthly' | 'never';
  notification_types: {
    new_videos: boolean;
    course_assignments: boolean;
    course_completions: boolean;
    system_updates: boolean;
  };
}
