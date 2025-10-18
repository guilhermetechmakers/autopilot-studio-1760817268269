// Client Portal Types
export interface ProjectStatus {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  expectedCompletion: string;
  currentPhase: string;
  nextMilestone: string;
  team: string[];
  budget: {
    total: number;
    spent: number;
    remaining: number;
  };
  description?: string;
  tags?: string[];
  lastUpdated: string;
}

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'image' | 'code' | 'other';
  status: 'pending' | 'approved' | 'rejected' | 'revision-requested';
  submittedAt: string;
  submittedBy: string;
  fileSize?: string;
  version: string;
  comments?: string;
  attachments?: string[];
  downloadUrl?: string;
  previewUrl?: string;
  metadata?: {
    pages?: number;
    duration?: string;
    resolution?: string;
    language?: string;
  };
}

export interface Feedback {
  id: string;
  type: 'general' | 'bug' | 'feature' | 'design' | 'performance';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  submittedAt: string;
  submittedBy: string;
  assignedTo?: string;
  tags: string[];
  attachments?: string[];
  comments?: FeedbackComment[];
  estimatedResolution?: string;
  actualResolution?: string;
}

export interface FeedbackComment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  isInternal: boolean;
}

export interface SharedAsset {
  id: string;
  name: string;
  type: 'document' | 'video' | 'image' | 'code' | 'presentation' | 'other';
  description: string;
  uploadedAt: string;
  uploadedBy: string;
  fileSize: string;
  downloadCount: number;
  isPublic: boolean;
  tags: string[];
  downloadUrl: string;
  previewUrl?: string;
  metadata?: {
    pages?: number;
    duration?: string;
    resolution?: string;
    language?: string;
  };
  permissions?: {
    canDownload: boolean;
    canEdit: boolean;
    canDelete: boolean;
  };
}

export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: 'project-manager' | 'developer' | 'designer' | 'client' | 'stakeholder';
  avatar?: string;
  isActive: boolean;
  joinedAt: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  dueDate: string;
  completedAt?: string;
  deliverables: string[];
  acceptanceCriteria: string[];
  dependencies?: string[];
}

export interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  type: 'milestone' | 'deliverable' | 'general' | 'issue';
  author: string;
  createdAt: string;
  isImportant: boolean;
  attachments?: string[];
  tags?: string[];
}

export interface ClientPortalSettings {
  notifications: {
    email: boolean;
    inApp: boolean;
    deliverableUpdates: boolean;
    milestoneUpdates: boolean;
    feedbackUpdates: boolean;
  };
  display: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    timezone: string;
  };
  privacy: {
    showTeamMembers: boolean;
    showBudget: boolean;
    allowFeedback: boolean;
  };
}

// API Response Types
export interface ClientPortalApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface FeedbackFormData {
  type: Feedback['type'];
  priority: Feedback['priority'];
  title: string;
  description: string;
  tags: string[];
  attachments?: File[];
}

export interface DeliverableActionData {
  deliverableId: string;
  action: 'approve' | 'reject' | 'request-revision';
  comments?: string;
  revisionNotes?: string;
}

export interface AssetUploadData {
  file: File;
  name: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  permissions?: SharedAsset['permissions'];
}

// Filter and Search Types
export interface DeliverableFilters {
  status?: Deliverable['status'][];
  type?: Deliverable['type'][];
  submittedBy?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface AssetFilters {
  type?: SharedAsset['type'][];
  tags?: string[];
  isPublic?: boolean;
  uploadedBy?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface FeedbackFilters {
  type?: Feedback['type'][];
  priority?: Feedback['priority'][];
  status?: Feedback['status'][];
  assignedTo?: string[];
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

// Statistics Types
export interface ProjectStatistics {
  totalDeliverables: number;
  approvedDeliverables: number;
  pendingDeliverables: number;
  rejectedDeliverables: number;
  totalAssets: number;
  totalDownloads: number;
  openFeedback: number;
  resolvedFeedback: number;
  averageResolutionTime: number; // in hours
  teamActivity: {
    member: string;
    contributions: number;
    lastActive: string;
  }[];
}

// Notification Types
export interface Notification {
  id: string;
  type: 'deliverable' | 'milestone' | 'feedback' | 'asset' | 'general';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}
