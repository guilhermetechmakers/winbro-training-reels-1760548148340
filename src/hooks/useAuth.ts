import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi, userApi } from '@/lib/api';
import { toast } from 'sonner';
import type { AuthResponse } from '@/types';

// Query keys
export const authKeys = {
  user: ['auth', 'user'] as const,
};

// Get current user
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: userApi.getCurrent,
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!localStorage.getItem('auth_token'), // Only fetch if token exists
  });
};

// Sign in mutation
export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: any) => authApi.signIn(credentials) as Promise<AuthResponse>,
    onSuccess: (data: AuthResponse) => {
      // Store auth token
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      
      // Update the user in the cache
      if (data.user) {
        queryClient.setQueryData(authKeys.user, data.user);
      }
      
      toast.success('Signed in successfully!');
    },
    onError: (error: any) => {
      toast.error(`Sign in failed: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Sign up mutation
export const useSignUp = () => {
  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: () => {
      toast.success('Account created! Please check your email to verify your account.');
    },
    onError: (error: any) => {
      toast.error(`Sign up failed: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Sign out mutation
export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.signOut,
    onSuccess: () => {
      // Clear auth token
      localStorage.removeItem('auth_token');
      
      // Clear all cached data
      queryClient.clear();
      
      toast.success('Signed out successfully!');
    },
    onError: (error: any) => {
      toast.error(`Sign out failed: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Password reset mutation
export const usePasswordReset = () => {
  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast.success('Password reset email sent! Check your inbox.');
    },
    onError: (error: any) => {
      toast.error(`Password reset failed: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Confirm password reset mutation
export const useConfirmPasswordReset = () => {
  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authApi.confirmPasswordReset(token, password),
    onSuccess: () => {
      toast.success('Password reset successfully! You can now sign in.');
    },
    onError: (error: any) => {
      toast.error(`Password reset failed: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Email verification mutation
export const useEmailVerification = () => {
  return useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: () => {
      toast.success('Email verified successfully!');
    },
    onError: (error: any) => {
      toast.error(`Email verification failed: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Resend verification mutation
export const useResendVerification = () => {
  return useMutation({
    mutationFn: authApi.resendVerification,
    onSuccess: () => {
      toast.success('Verification email sent! Check your inbox.');
    },
    onError: (error: any) => {
      toast.error(`Failed to send verification email: ${error.response?.data?.message || error.message}`);
    },
  });
};

// Magic link mutation
export const useMagicLink = () => {
  return useMutation({
    mutationFn: authApi.sendMagicLink,
    onSuccess: () => {
      toast.success('Magic link sent! Check your email.');
    },
    onError: (error: any) => {
      toast.error(`Failed to send magic link: ${error.response?.data?.message || error.message}`);
    },
  });
};
