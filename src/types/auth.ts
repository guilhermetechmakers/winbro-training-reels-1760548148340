import type { User, UserRole } from './user';

export interface AuthResponse {
  user: User;
  token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface SignInInput {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface SignUpInput {
  email: string;
  password: string;
  full_name?: string;
  role?: UserRole;
  organization_id?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
}

export interface EmailVerificationRequest {
  token: string;
}

export interface MagicLinkRequest {
  email: string;
}

export interface TwoFactorSetup {
  secret: string;
  qr_code: string;
  backup_codes: string[];
}

export interface TwoFactorVerify {
  code: string;
}

export interface SSOProvider {
  id: string;
  name: string;
  type: 'saml' | 'oidc' | 'oauth';
  enabled: boolean;
  config: Record<string, any>;
}

// Re-export User types
export type { User, UserRole } from './user';
