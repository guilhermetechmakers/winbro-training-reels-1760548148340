import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { videoApi } from '@/lib/api';
import { toast } from 'sonner';
import type { SearchFilters } from '@/types';

// Query keys
export const videoKeys = {
  all: ['videos'] as const,
  lists: () => [...videoKeys.all, 'list'] as const,
  list: (filters: SearchFilters) => [...videoKeys.lists(), { filters }] as const,
  details: () => [...videoKeys.all, 'detail'] as const,
  detail: (id: string) => [...videoKeys.details(), id] as const,
  search: (query: string, filters?: SearchFilters) => [...videoKeys.all, 'search', query, filters] as const,
};

// Get all videos
export const useVideos = (filters?: SearchFilters) => {
  return useQuery({
    queryKey: videoKeys.list(filters || {}),
    queryFn: () => videoApi.getAll(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get video by ID
export const useVideo = (id: string) => {
  return useQuery({
    queryKey: videoKeys.detail(id),
    queryFn: () => videoApi.getById(id),
    enabled: !!id,
  });
};

// Search videos
export const useVideoSearch = (query: string, filters?: SearchFilters) => {
  return useQuery({
    queryKey: videoKeys.search(query, filters),
    queryFn: () => videoApi.search(query, filters),
    enabled: !!query,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

// Create video mutation
export const useCreateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: videoApi.create,
    onSuccess: (newVideo: any) => {
      // Invalidate and refetch videos list
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
      
      // Add the new video to the cache
      queryClient.setQueryData(videoKeys.detail(newVideo.id), newVideo);
      
      toast.success('Video created successfully!');
    },
    onError: (error: any) => {
      toast.error(`Failed to create video: ${error.message}`);
    },
  });
};

// Update video mutation
export const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      videoApi.update(id, data),
    onSuccess: (updatedVideo: any) => {
      // Update the video in the cache
      queryClient.setQueryData(videoKeys.detail(updatedVideo.id), updatedVideo);
      
      // Invalidate videos list to ensure consistency
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
      
      toast.success('Video updated successfully!');
    },
    onError: (error: any) => {
      toast.error(`Failed to update video: ${error.message}`);
    },
  });
};

// Delete video mutation
export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: videoApi.delete,
    onSuccess: (_, deletedId) => {
      // Remove the video from the cache
      queryClient.removeQueries({ queryKey: videoKeys.detail(deletedId) });
      
      // Invalidate videos list
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
      
      toast.success('Video deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(`Failed to delete video: ${error.message}`);
    },
  });
};

// Upload video mutation
export const useUploadVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, onProgress }: { file: File; onProgress?: (progress: number) => void }) =>
      videoApi.upload(file, onProgress),
    onSuccess: () => {
      // Invalidate videos list
      queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
      
      toast.success('Video uploaded successfully!');
    },
    onError: (error: any) => {
      toast.error(`Failed to upload video: ${error.message}`);
    },
  });
};
