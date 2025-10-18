import type { 
  ProjectStatus, 
  Deliverable, 
  Feedback, 
  SharedAsset, 
  ProjectStatistics,
  Notification,
  ClientPortalApiResponse,
  PaginatedResponse,
  FeedbackFormData,
  DeliverableActionData,
  AssetUploadData,
  DeliverableFilters,
  AssetFilters,
  FeedbackFilters
} from '@/types/client-portal';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const CLIENT_PORTAL_ENDPOINT = `${API_BASE_URL}/client-portal`;

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ClientPortalApiResponse<T>> {
  const token = localStorage.getItem('auth_token');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${CLIENT_PORTAL_ENDPOINT}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Project Status API
export const projectStatusApi = {
  // Get project status
  getProjectStatus: (projectId: string): Promise<ClientPortalApiResponse<ProjectStatus>> =>
    apiRequest<ProjectStatus>(`/projects/${projectId}/status`),

  // Update project status (if client has permissions)
  updateProjectStatus: (projectId: string, updates: Partial<ProjectStatus>): Promise<ClientPortalApiResponse<ProjectStatus>> =>
    apiRequest<ProjectStatus>(`/projects/${projectId}/status`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),

  // Get project statistics
  getProjectStatistics: (projectId: string): Promise<ClientPortalApiResponse<ProjectStatistics>> =>
    apiRequest<ProjectStatistics>(`/projects/${projectId}/statistics`),
};

// Deliverables API
export const deliverablesApi = {
  // Get deliverables with pagination and filters
  getDeliverables: (
    projectId: string,
    page: number = 1,
    limit: number = 10,
    filters?: DeliverableFilters
  ): Promise<ClientPortalApiResponse<PaginatedResponse<Deliverable>>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.status && { status: filters.status.join(',') }),
      ...(filters?.type && { type: filters.type.join(',') }),
      ...(filters?.submittedBy && { submittedBy: filters.submittedBy.join(',') }),
      ...(filters?.dateRange && {
        startDate: filters.dateRange.start,
        endDate: filters.dateRange.end,
      }),
    });

    return apiRequest<PaginatedResponse<Deliverable>>(`/projects/${projectId}/deliverables?${params}`);
  },

  // Get single deliverable
  getDeliverable: (projectId: string, deliverableId: string): Promise<ClientPortalApiResponse<Deliverable>> =>
    apiRequest<Deliverable>(`/projects/${projectId}/deliverables/${deliverableId}`),

  // Download deliverable
  downloadDeliverable: async (projectId: string, deliverableId: string): Promise<Blob> => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(
      `${CLIENT_PORTAL_ENDPOINT}/projects/${projectId}/deliverables/${deliverableId}/download`,
      {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Download failed: ${response.status}`);
    }

    return response.blob();
  },

  // Approve/Reject/Request revision for deliverable
  updateDeliverableStatus: (
    projectId: string,
    deliverableId: string,
    action: DeliverableActionData
  ): Promise<ClientPortalApiResponse<Deliverable>> =>
    apiRequest<Deliverable>(`/projects/${projectId}/deliverables/${deliverableId}/status`, {
      method: 'PATCH',
      body: JSON.stringify(action),
    }),

  // Add comment to deliverable
  addDeliverableComment: (
    projectId: string,
    deliverableId: string,
    comment: string
  ): Promise<ClientPortalApiResponse<Deliverable>> =>
    apiRequest<Deliverable>(`/projects/${projectId}/deliverables/${deliverableId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
    }),
};

// Shared Assets API
export const assetsApi = {
  // Get shared assets with pagination and filters
  getAssets: (
    projectId: string,
    page: number = 1,
    limit: number = 12,
    filters?: AssetFilters
  ): Promise<ClientPortalApiResponse<PaginatedResponse<SharedAsset>>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.type && { type: filters.type.join(',') }),
      ...(filters?.tags && { tags: filters.tags.join(',') }),
      ...(filters?.isPublic !== undefined && { isPublic: filters.isPublic.toString() }),
      ...(filters?.uploadedBy && { uploadedBy: filters.uploadedBy.join(',') }),
      ...(filters?.dateRange && {
        startDate: filters.dateRange.start,
        endDate: filters.dateRange.end,
      }),
    });

    return apiRequest<PaginatedResponse<SharedAsset>>(`/projects/${projectId}/assets?${params}`);
  },

  // Get single asset
  getAsset: (projectId: string, assetId: string): Promise<ClientPortalApiResponse<SharedAsset>> =>
    apiRequest<SharedAsset>(`/projects/${projectId}/assets/${assetId}`),

  // Download asset
  downloadAsset: async (projectId: string, assetId: string): Promise<Blob> => {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(
      `${CLIENT_PORTAL_ENDPOINT}/projects/${projectId}/assets/${assetId}/download`,
      {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Download failed: ${response.status}`);
    }

    return response.blob();
  },

  // Upload asset
  uploadAsset: async (projectId: string, assetData: AssetUploadData): Promise<ClientPortalApiResponse<SharedAsset>> => {
    const token = localStorage.getItem('auth_token');
    const formData = new FormData();
    
    formData.append('file', assetData.file);
    formData.append('name', assetData.name);
    formData.append('description', assetData.description);
    formData.append('tags', JSON.stringify(assetData.tags));
    formData.append('isPublic', assetData.isPublic.toString());
    
    if (assetData.permissions) {
      formData.append('permissions', JSON.stringify(assetData.permissions));
    }

    const response = await fetch(`${CLIENT_PORTAL_ENDPOINT}/projects/${projectId}/assets`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    return response.json();
  },

  // Update asset
  updateAsset: (
    projectId: string,
    assetId: string,
    updates: Partial<SharedAsset>
  ): Promise<ClientPortalApiResponse<SharedAsset>> =>
    apiRequest<SharedAsset>(`/projects/${projectId}/assets/${assetId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),

  // Delete asset
  deleteAsset: (projectId: string, assetId: string): Promise<ClientPortalApiResponse<void>> =>
    apiRequest<void>(`/projects/${projectId}/assets/${assetId}`, {
      method: 'DELETE',
    }),
};

// Feedback API
export const feedbackApi = {
  // Get feedback items with pagination and filters
  getFeedback: (
    projectId: string,
    page: number = 1,
    limit: number = 10,
    filters?: FeedbackFilters
  ): Promise<ClientPortalApiResponse<PaginatedResponse<Feedback>>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.type && { type: filters.type.join(',') }),
      ...(filters?.priority && { priority: filters.priority.join(',') }),
      ...(filters?.status && { status: filters.status.join(',') }),
      ...(filters?.assignedTo && { assignedTo: filters.assignedTo.join(',') }),
      ...(filters?.tags && { tags: filters.tags.join(',') }),
      ...(filters?.dateRange && {
        startDate: filters.dateRange.start,
        endDate: filters.dateRange.end,
      }),
    });

    return apiRequest<PaginatedResponse<Feedback>>(`/projects/${projectId}/feedback?${params}`);
  },

  // Get single feedback item
  getFeedbackItem: (projectId: string, feedbackId: string): Promise<ClientPortalApiResponse<Feedback>> =>
    apiRequest<Feedback>(`/projects/${projectId}/feedback/${feedbackId}`),

  // Submit new feedback
  submitFeedback: (
    projectId: string,
    feedbackData: FeedbackFormData
  ): Promise<ClientPortalApiResponse<Feedback>> =>
    apiRequest<Feedback>(`/projects/${projectId}/feedback`, {
      method: 'POST',
      body: JSON.stringify(feedbackData),
    }),

  // Update feedback status
  updateFeedbackStatus: (
    projectId: string,
    feedbackId: string,
    status: Feedback['status']
  ): Promise<ClientPortalApiResponse<Feedback>> =>
    apiRequest<Feedback>(`/projects/${projectId}/feedback/${feedbackId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  // Add comment to feedback
  addFeedbackComment: (
    projectId: string,
    feedbackId: string,
    comment: string,
    isInternal: boolean = false
  ): Promise<ClientPortalApiResponse<Feedback>> =>
    apiRequest<Feedback>(`/projects/${projectId}/feedback/${feedbackId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment, isInternal }),
    }),
};

// Notifications API
export const notificationsApi = {
  // Get notifications
  getNotifications: (
    page: number = 1,
    limit: number = 20
  ): Promise<ClientPortalApiResponse<PaginatedResponse<Notification>>> =>
    apiRequest<PaginatedResponse<Notification>>(`/notifications?page=${page}&limit=${limit}`),

  // Mark notification as read
  markAsRead: (notificationId: string): Promise<ClientPortalApiResponse<void>> =>
    apiRequest<void>(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
    }),

  // Mark all notifications as read
  markAllAsRead: (): Promise<ClientPortalApiResponse<void>> =>
    apiRequest<void>('/notifications/read-all', {
      method: 'PATCH',
    }),

  // Get unread count
  getUnreadCount: (): Promise<ClientPortalApiResponse<{ count: number }>> =>
    apiRequest<{ count: number }>('/notifications/unread-count'),
};

// Utility functions
export const clientPortalUtils = {
  // Format file size
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Format date
  formatDate: (date: string | Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  // Format date and time
  formatDateTime: (date: string | Date): string => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Get file type icon
  getFileTypeIcon: (type: string): string => {
    const iconMap: Record<string, string> = {
      document: 'FileText',
      video: 'Video',
      image: 'Image',
      code: 'Code',
      presentation: 'Presentation',
      other: 'File',
    };
    return iconMap[type] || 'File';
  },

  // Generate download URL
  generateDownloadUrl: (projectId: string, type: 'deliverable' | 'asset', id: string): string => {
    return `${CLIENT_PORTAL_ENDPOINT}/projects/${projectId}/${type}s/${id}/download`;
  },
};
