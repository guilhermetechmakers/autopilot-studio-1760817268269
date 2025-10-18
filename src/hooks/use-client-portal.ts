import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  projectStatusApi,
  deliverablesApi,
  assetsApi,
  feedbackApi,
  notificationsApi,
} from '@/lib/api/client-portal';
import type {
  ProjectStatus,
  SharedAsset,
  Feedback,
  FeedbackFormData,
  DeliverableActionData,
  AssetUploadData,
  DeliverableFilters,
  AssetFilters,
  FeedbackFilters,
} from '@/types/client-portal';

// Query Keys
export const clientPortalKeys = {
  all: ['client-portal'] as const,
  projectStatus: (projectId: string) => [...clientPortalKeys.all, 'project-status', projectId] as const,
  projectStatistics: (projectId: string) => [...clientPortalKeys.all, 'project-statistics', projectId] as const,
  deliverables: (projectId: string, page: number, limit: number, filters?: DeliverableFilters) => 
    [...clientPortalKeys.all, 'deliverables', projectId, page, limit, filters] as const,
  deliverable: (projectId: string, deliverableId: string) => 
    [...clientPortalKeys.all, 'deliverable', projectId, deliverableId] as const,
  assets: (projectId: string, page: number, limit: number, filters?: AssetFilters) => 
    [...clientPortalKeys.all, 'assets', projectId, page, limit, filters] as const,
  asset: (projectId: string, assetId: string) => 
    [...clientPortalKeys.all, 'asset', projectId, assetId] as const,
  feedback: (projectId: string, page: number, limit: number, filters?: FeedbackFilters) => 
    [...clientPortalKeys.all, 'feedback', projectId, page, limit, filters] as const,
  feedbackItem: (projectId: string, feedbackId: string) => 
    [...clientPortalKeys.all, 'feedback-item', projectId, feedbackId] as const,
  notifications: (page: number, limit: number) => 
    [...clientPortalKeys.all, 'notifications', page, limit] as const,
  unreadCount: () => [...clientPortalKeys.all, 'unread-count'] as const,
};

// Project Status Hooks
export const useProjectStatus = (projectId: string) => {
  return useQuery({
    queryKey: clientPortalKeys.projectStatus(projectId),
    queryFn: () => projectStatusApi.getProjectStatus(projectId),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProjectStatistics = (projectId: string) => {
  return useQuery({
    queryKey: clientPortalKeys.projectStatistics(projectId),
    queryFn: () => projectStatusApi.getProjectStatistics(projectId),
    enabled: !!projectId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUpdateProjectStatus = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<ProjectStatus>) => 
      projectStatusApi.updateProjectStatus(projectId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.projectStatus(projectId) 
      });
      toast.success('Project status updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update project status');
      console.error('Update project status error:', error);
    },
  });
};

// Deliverables Hooks
export const useDeliverables = (
  projectId: string,
  page: number = 1,
  limit: number = 10,
  filters?: DeliverableFilters
) => {
  return useQuery({
    queryKey: clientPortalKeys.deliverables(projectId, page, limit, filters),
    queryFn: () => deliverablesApi.getDeliverables(projectId, page, limit, filters),
    enabled: !!projectId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useDeliverable = (projectId: string, deliverableId: string) => {
  return useQuery({
    queryKey: clientPortalKeys.deliverable(projectId, deliverableId),
    queryFn: () => deliverablesApi.getDeliverable(projectId, deliverableId),
    enabled: !!projectId && !!deliverableId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateDeliverableStatus = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deliverableId, action }: { deliverableId: string; action: DeliverableActionData }) =>
      deliverablesApi.updateDeliverableStatus(projectId, deliverableId, action),
    onSuccess: (_, { deliverableId }) => {
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.deliverable(projectId, deliverableId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.deliverables(projectId, 1, 10) 
      });
      toast.success('Deliverable status updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update deliverable status');
      console.error('Update deliverable status error:', error);
    },
  });
};

export const useAddDeliverableComment = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deliverableId, comment }: { deliverableId: string; comment: string }) =>
      deliverablesApi.addDeliverableComment(projectId, deliverableId, comment),
    onSuccess: (_, { deliverableId }) => {
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.deliverable(projectId, deliverableId) 
      });
      toast.success('Comment added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add comment');
      console.error('Add deliverable comment error:', error);
    },
  });
};

// Assets Hooks
export const useAssets = (
  projectId: string,
  page: number = 1,
  limit: number = 12,
  filters?: AssetFilters
) => {
  return useQuery({
    queryKey: clientPortalKeys.assets(projectId, page, limit, filters),
    queryFn: () => assetsApi.getAssets(projectId, page, limit, filters),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAsset = (projectId: string, assetId: string) => {
  return useQuery({
    queryKey: clientPortalKeys.asset(projectId, assetId),
    queryFn: () => assetsApi.getAsset(projectId, assetId),
    enabled: !!projectId && !!assetId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUploadAsset = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assetData: AssetUploadData) => assetsApi.uploadAsset(projectId, assetData),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.assets(projectId, 1, 12) 
      });
      toast.success('Asset uploaded successfully');
    },
    onError: (error) => {
      toast.error('Failed to upload asset');
      console.error('Upload asset error:', error);
    },
  });
};

export const useUpdateAsset = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assetId, updates }: { assetId: string; updates: Partial<SharedAsset> }) =>
      assetsApi.updateAsset(projectId, assetId, updates),
    onSuccess: (_, { assetId }) => {
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.asset(projectId, assetId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.assets(projectId, 1, 12) 
      });
      toast.success('Asset updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update asset');
      console.error('Update asset error:', error);
    },
  });
};

export const useDeleteAsset = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assetId: string) => assetsApi.deleteAsset(projectId, assetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.assets(projectId, 1, 12) 
      });
      toast.success('Asset deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete asset');
      console.error('Delete asset error:', error);
    },
  });
};

// Feedback Hooks
export const useFeedback = (
  projectId: string,
  page: number = 1,
  limit: number = 10,
  filters?: FeedbackFilters
) => {
  return useQuery({
    queryKey: clientPortalKeys.feedback(projectId, page, limit, filters),
    queryFn: () => feedbackApi.getFeedback(projectId, page, limit, filters),
    enabled: !!projectId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useFeedbackItem = (projectId: string, feedbackId: string) => {
  return useQuery({
    queryKey: clientPortalKeys.feedbackItem(projectId, feedbackId),
    queryFn: () => feedbackApi.getFeedbackItem(projectId, feedbackId),
    enabled: !!projectId && !!feedbackId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSubmitFeedback = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedbackData: FeedbackFormData) => 
      feedbackApi.submitFeedback(projectId, feedbackData),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.feedback(projectId, 1, 10) 
      });
      toast.success('Feedback submitted successfully');
    },
    onError: (error) => {
      toast.error('Failed to submit feedback');
      console.error('Submit feedback error:', error);
    },
  });
};

export const useUpdateFeedbackStatus = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ feedbackId, status }: { feedbackId: string; status: Feedback['status'] }) =>
      feedbackApi.updateFeedbackStatus(projectId, feedbackId, status),
    onSuccess: (_, { feedbackId }) => {
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.feedbackItem(projectId, feedbackId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.feedback(projectId, 1, 10) 
      });
      toast.success('Feedback status updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update feedback status');
      console.error('Update feedback status error:', error);
    },
  });
};

export const useAddFeedbackComment = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      feedbackId, 
      comment, 
      isInternal = false 
    }: { 
      feedbackId: string; 
      comment: string; 
      isInternal?: boolean; 
    }) => feedbackApi.addFeedbackComment(projectId, feedbackId, comment, isInternal),
    onSuccess: (_, { feedbackId }) => {
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.feedbackItem(projectId, feedbackId) 
      });
      toast.success('Comment added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add comment');
      console.error('Add feedback comment error:', error);
    },
  });
};

// Notifications Hooks
export const useNotifications = (page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: clientPortalKeys.notifications(page, limit),
    queryFn: () => notificationsApi.getNotifications(page, limit),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useUnreadCount = () => {
  return useQuery({
    queryKey: clientPortalKeys.unreadCount(),
    queryFn: () => notificationsApi.getUnreadCount(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => 
      notificationsApi.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.unreadCount() 
      });
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.notifications(1, 20) 
      });
    },
    onError: (error) => {
      console.error('Mark notification as read error:', error);
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.unreadCount() 
      });
      queryClient.invalidateQueries({ 
        queryKey: clientPortalKeys.notifications(1, 20) 
      });
      toast.success('All notifications marked as read');
    },
    onError: (error) => {
      toast.error('Failed to mark all notifications as read');
      console.error('Mark all notifications as read error:', error);
    },
  });
};

// Utility Hooks
export const useDownloadFile = () => {
  return useMutation({
    mutationFn: async ({ 
      projectId, 
      type, 
      id 
    }: { 
      projectId: string; 
      type: 'deliverable' | 'asset'; 
      id: string; 
    }) => {
      const blob = type === 'deliverable' 
        ? await deliverablesApi.downloadDeliverable(projectId, id)
        : await assetsApi.downloadAsset(projectId, id);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `download-${id}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onSuccess: () => {
      toast.success('Download started');
    },
    onError: (error) => {
      toast.error('Download failed');
      console.error('Download error:', error);
    },
  });
};