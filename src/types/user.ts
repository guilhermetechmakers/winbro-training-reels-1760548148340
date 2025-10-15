export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: UserRole;
  organization_id?: string;
  is_verified: boolean;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export type UserRole = 'admin' | 'curator' | 'operator' | 'engineer';

export interface UpdateUserInput {
  id: string;
  full_name?: string;
  avatar_url?: string;
  role?: UserRole;
  is_active?: boolean;
}

export interface CreateUserInput {
  email: string;
  full_name?: string;
  role: UserRole;
  organization_id?: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  device_info?: string;
  ip_address?: string;
  last_activity: string;
  created_at: string;
}
