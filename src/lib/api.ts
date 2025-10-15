// Simple fetch wrapper with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// API utilities
export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint),
  post: <T>(endpoint: string, data: unknown) => 
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  put: <T>(endpoint: string, data: unknown) => 
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  patch: <T>(endpoint: string, data: unknown) => 
    apiRequest<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (endpoint: string) => 
    apiRequest(endpoint, { method: 'DELETE' }),
};

// Video API
export const videoApi = {
  getAll: (filters?: Record<string, any>) => 
    api.get(`/videos${filters ? '?' + new URLSearchParams(filters).toString() : ''}`),
  getById: (id: string) => api.get(`/videos/${id}`),
  create: (data: any) => api.post('/videos', data),
  update: (id: string, data: any) => api.put(`/videos/${id}`, data),
  delete: (id: string) => api.delete(`/videos/${id}`),
  upload: (file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = (e.loaded / e.total) * 100;
          onProgress(progress);
        }
      });
      
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Upload failed: ${xhr.status}`));
        }
      });
      
      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });
      
      xhr.open('POST', `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/videos/upload`);
      
      const token = localStorage.getItem('auth_token');
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }
      
      xhr.send(formData);
    });
  },
  search: (query: string, filters?: Record<string, any>) => 
    api.get(`/videos/search?q=${encodeURIComponent(query)}${filters ? '&' + new URLSearchParams(filters).toString() : ''}`),
};

// Course API
export const courseApi = {
  getAll: (filters?: Record<string, any>) => 
    api.get(`/courses${filters ? '?' + new URLSearchParams(filters).toString() : ''}`),
  getById: (id: string) => api.get(`/courses/${id}`),
  create: (data: any) => api.post('/courses', data),
  update: (id: string, data: any) => api.put(`/courses/${id}`, data),
  delete: (id: string) => api.delete(`/courses/${id}`),
  enroll: (id: string) => api.post(`/courses/${id}/enroll`, {}),
  unenroll: (id: string) => api.delete(`/courses/${id}/enroll`),
  getProgress: (id: string) => api.get(`/courses/${id}/progress`),
  updateProgress: (id: string, data: any) => api.put(`/courses/${id}/progress`, data),
};

// User API
export const userApi = {
  getCurrent: () => api.get('/users/me'),
  updateProfile: (data: any) => api.put('/users/me', data),
  getById: (id: string) => api.get(`/users/${id}`),
  getAll: (filters?: Record<string, any>) => 
    api.get(`/users${filters ? '?' + new URLSearchParams(filters).toString() : ''}`),
  delete: (id: string) => api.delete(`/users/${id}`),
  updateRole: (id: string, role: string) => api.patch(`/users/${id}/role`, { role }),
};

// Auth API
export const authApi = {
  signIn: (credentials: any) => api.post('/auth/login', credentials),
  signUp: (data: any) => api.post('/auth/register', data),
  signOut: () => api.post('/auth/logout', {}),
  refreshToken: () => api.post('/auth/refresh', {}),
  resetPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  confirmPasswordReset: (token: string, password: string) => 
    api.post('/auth/reset-password', { token, password }),
  verifyEmail: (token: string) => api.post('/auth/verify-email', { token }),
  resendVerification: () => api.post('/auth/resend-verification', {}),
  sendMagicLink: (email: string) => api.post('/auth/magic-link', { email }),
};

// Analytics API
export const analyticsApi = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getVideoStats: (videoId: string) => api.get(`/analytics/videos/${videoId}`),
  getCourseStats: (courseId: string) => api.get(`/analytics/courses/${courseId}`),
  getUserActivity: (userId?: string) => api.get(`/analytics/users${userId ? `/${userId}` : ''}`),
  getSystemHealth: () => api.get('/analytics/system-health'),
};
