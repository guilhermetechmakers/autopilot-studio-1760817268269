import { motion } from "motion/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  useProjectStatus, 
  useDeliverables, 
  useAssets, 
  useFeedback,
  useSubmitFeedback,
  useUpdateDeliverableStatus,
  useDownloadFile
} from "@/hooks/use-client-portal";
import { toast } from "sonner";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Download, 
  Upload, 
  MessageSquare, 
  FileText, 
  Video, 
  Image, 
  Archive,
  Send,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Calendar,
  User,
  Phone,
  Mail,
  Filter,
  Search,
  MoreHorizontal,
  Share2,
  Edit,
  Plus,
  X
} from "lucide-react";



export default function ClientPortal() {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // React Query hooks
  const { data: projectStatus, isLoading: projectLoading } = useProjectStatus(projectId || '');
  const { data: deliverablesData, isLoading: deliverablesLoading } = useDeliverables(projectId || '', 1, 10);
  const { data: assetsData, isLoading: assetsLoading } = useAssets(projectId || '', 1, 12);
  const { data: feedbackData, isLoading: feedbackLoading } = useFeedback(projectId || '', 1, 10);
  
  // Mutations
  const submitFeedbackMutation = useSubmitFeedback(projectId || '');
  const updateDeliverableStatusMutation = useUpdateDeliverableStatus(projectId || '');
  const downloadFileMutation = useDownloadFile();

  // Loading state
  if (projectLoading) {
    return (
      <div className="min-h-screen bg-surface-base">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="surface-card">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card className="surface-card">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-24 mb-4" />
                    <div className="space-y-3">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!projectStatus?.data) {
    return (
      <div className="min-h-screen bg-surface-base flex items-center justify-center">
        <Card className="surface-card">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Project Not Found
            </h2>
            <p className="text-text-secondary">
              The project you're looking for doesn't exist or you don't have access to it.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Extract the actual project data
  const project = projectStatus.data;

  // Get data from API responses
  const deliverables = deliverablesData?.data?.data || [];
  const sharedAssets = assetsData?.data?.data || [];
  const feedbackItems = feedbackData?.data?.data || [];



  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-states-success';
      case 'rejected': return 'text-states-danger';
      case 'revision-requested': return 'text-states-warning';
      case 'pending': return 'text-text-muted';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'rejected': return AlertCircle;
      case 'revision-requested': return Clock;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-states-danger/10 text-states-danger border-states-danger/20';
      case 'high': return 'bg-states-warning/10 text-states-warning border-states-warning/20';
      case 'medium': return 'bg-brand-primary/10 text-brand-primary border-brand-primary/20';
      case 'low': return 'bg-text-muted/10 text-text-muted border-text-muted/20';
      default: return 'bg-text-muted/10 text-text-muted border-text-muted/20';
    }
  };

  const handleDeliverableAction = (deliverableId: string, action: 'approve' | 'reject' | 'request-revision') => {
    updateDeliverableStatusMutation.mutate({
      deliverableId,
      action: {
        deliverableId,
        action,
        comments: action === 'request-revision' ? 'Please review and make the requested changes.' : undefined
      }
    });
  };

  const handleFeedbackSubmit = (feedback: any) => {
    if (!feedback.title || !feedback.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    submitFeedbackMutation.mutate({
      type: feedback.type || 'general',
      priority: feedback.priority || 'medium',
      title: feedback.title,
      description: feedback.description,
      tags: feedback.tags || []
    });
  };

  const handleDownload = (type: 'deliverable' | 'asset', id: string) => {
    if (projectId) {
      downloadFileMutation.mutate({ projectId, type, id });
    }
  };

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-borders-strong bg-surface-sunken"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-hover rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">{project.name}</h1>
                <p className="text-text-secondary">Client Portal • {project.client}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                <Input
                  type="text"
                  placeholder="Search deliverables, assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-surface-elevated border border-borders-strong rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <Button variant="outline" className="border-borders-strong text-text-primary hover:bg-surface-elevated">
                <Share2 className="w-4 h-4 mr-2" />
                Share Portal
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-surface-elevated border border-borders-strong">
              <TabsTrigger value="overview" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
                Project Overview
              </TabsTrigger>
              <TabsTrigger value="deliverables" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
                Deliverables
              </TabsTrigger>
              <TabsTrigger value="assets" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
                Shared Assets
              </TabsTrigger>
              <TabsTrigger value="feedback" className="data-[state=active]:bg-brand-primary data-[state=active]:text-white">
                Feedback
              </TabsTrigger>
            </TabsList>

            {/* Project Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Project Status Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="lg:col-span-2"
                >
                  <Card className="surface-card">
                    <CardHeader>
                      <CardTitle className="text-text-primary flex items-center justify-between">
                        Project Status
                        <Badge className={`${
                          project.status === 'in-progress' ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' :
                          project.status === 'completed' ? 'bg-states-success/10 text-states-success border-states-success/20' :
                          'bg-states-warning/10 text-states-warning border-states-warning/20'
                        }`}>
                          {project.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-text-primary font-medium">Overall Progress</span>
                          <span className="text-text-primary font-bold">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-3" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm text-text-secondary">Current Phase</div>
                          <div className="text-text-primary font-medium">{project.currentPhase}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-text-secondary">Next Milestone</div>
                          <div className="text-text-primary font-medium">{project.nextMilestone}</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-text-primary font-medium">Budget Overview</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Total Budget</span>
                            <span className="text-text-primary">${project.budget.total.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Spent</span>
                            <span className="text-text-primary">${project.budget.spent.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Remaining</span>
                            <span className="text-states-success">${project.budget.remaining.toLocaleString()}</span>
                          </div>
                          <Progress 
                            value={(project.budget.spent / project.budget.total) * 100} 
                            className="h-2" 
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-text-primary font-medium">Team Members</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.team.map((member, index) => (
                            <motion.div
                              key={member}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                              className="flex items-center space-x-2 px-3 py-2 bg-surface-elevated rounded-lg border border-borders-strong"
                            >
                              <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-3 h-3 text-brand-primary" />
                              </div>
                              <span className="text-sm text-text-primary">{member}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Quick Actions & Contact */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-6"
                >
                  <Card className="surface-card">
                    <CardHeader>
                      <CardTitle className="text-text-primary">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start" variant="ghost">
                        <Download className="w-4 h-4 mr-3" />
                        Download Project Files
                      </Button>
                      <Button className="w-full justify-start" variant="ghost">
                        <Calendar className="w-4 h-4 mr-3" />
                        Schedule Meeting
                      </Button>
                      <Button className="w-full justify-start" variant="ghost">
                        <MessageSquare className="w-4 h-4 mr-3" />
                        Send Message
                      </Button>
                      <Button className="w-full justify-start" variant="ghost">
                        <FileText className="w-4 h-4 mr-3" />
                        View Reports
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="surface-card">
                    <CardHeader>
                      <CardTitle className="text-text-primary">Contact Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-text-primary">Project Manager</div>
                          <div className="text-xs text-text-secondary">Sarah Johnson</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Deliverables Tab */}
            <TabsContent value="deliverables" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">Project Deliverables</h2>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {deliverablesLoading ? (
                    // Loading skeletons for deliverables
                    Array.from({ length: 3 }).map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="surface-card">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <Skeleton className="w-8 h-8 rounded-full" />
                                  <div className="flex-1">
                                    <Skeleton className="h-5 w-48 mb-2" />
                                    <Skeleton className="h-4 w-64" />
                                  </div>
                                </div>
                                <Skeleton className="h-4 w-32 mb-4" />
                                <div className="flex items-center justify-between">
                                  <Skeleton className="h-4 w-24" />
                                  <div className="flex space-x-2">
                                    <Skeleton className="h-8 w-20" />
                                    <Skeleton className="h-8 w-24" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : deliverables.length === 0 ? (
                    <Card className="surface-card">
                      <CardContent className="p-8 text-center">
                        <FileText className="w-12 h-12 text-text-muted mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-text-primary mb-2">No Deliverables Yet</h3>
                        <p className="text-text-secondary">Deliverables will appear here once they are submitted by the team.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    deliverables.map((deliverable, index) => {
                    const StatusIcon = getStatusIcon(deliverable.status);
                    return (
                      <motion.div
                        key={deliverable.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="surface-card hover:shadow-hover transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    deliverable.type === 'document' ? 'bg-blue-100 text-blue-600' :
                                    deliverable.type === 'video' ? 'bg-red-100 text-red-600' :
                                    deliverable.type === 'image' ? 'bg-green-100 text-green-600' :
                                    deliverable.type === 'code' ? 'bg-purple-100 text-purple-600' :
                                    'bg-gray-100 text-gray-600'
                                  }`}>
                                    {deliverable.type === 'document' ? <FileText className="w-4 h-4" /> :
                                     deliverable.type === 'video' ? <Video className="w-4 h-4" /> :
                                     deliverable.type === 'image' ? <Image className="w-4 h-4" /> :
                                     deliverable.type === 'code' ? <Archive className="w-4 h-4" /> :
                                     <FileText className="w-4 h-4" />}
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold text-text-primary">{deliverable.title}</h3>
                                    <p className="text-sm text-text-secondary">{deliverable.description}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-4 text-sm text-text-muted mb-4">
                                  <span>Version {deliverable.version}</span>
                                  <span>•</span>
                                  <span>{deliverable.fileSize}</span>
                                  <span>•</span>
                                  <span>Submitted by {deliverable.submittedBy}</span>
                                  <span>•</span>
                                  <span>{deliverable.submittedAt}</span>
                                </div>

                                {deliverable.comments && (
                                  <div className="p-3 bg-surface-elevated rounded-lg border border-borders-strong mb-4">
                                    <p className="text-sm text-text-primary">{deliverable.comments}</p>
                                  </div>
                                )}

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <StatusIcon className={`w-4 h-4 ${getStatusColor(deliverable.status)}`} />
                                    <span className={`text-sm font-medium ${getStatusColor(deliverable.status)}`}>
                                      {deliverable.status.replace('-', ' ').toUpperCase()}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleDownload('deliverable', deliverable.id)}
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      Preview
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleDownload('deliverable', deliverable.id)}
                                    >
                                      <Download className="w-4 h-4 mr-1" />
                                      Download
                                    </Button>
                                    {deliverable.status === 'pending' && (
                                      <div className="flex space-x-1">
                                        <Button 
                                          size="sm" 
                                          className="bg-states-success hover:bg-states-success/90"
                                          onClick={() => handleDeliverableAction(deliverable.id, 'approve')}
                                        >
                                          <ThumbsUp className="w-4 h-4 mr-1" />
                                          Approve
                                        </Button>
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => handleDeliverableAction(deliverable.id, 'reject')}
                                        >
                                          <ThumbsDown className="w-4 h-4 mr-1" />
                                          Reject
                                        </Button>
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => handleDeliverableAction(deliverable.id, 'request-revision')}
                                        >
                                          <Edit className="w-4 h-4 mr-1" />
                                          Request Revision
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
                )}
                </div>
              </motion.div>
            </TabsContent>

            {/* Shared Assets Tab */}
            <TabsContent value="assets" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">Shared Assets</h2>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Asset
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assetsLoading ? (
                    // Loading skeletons for assets
                    Array.from({ length: 6 }).map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="surface-card">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <Skeleton className="w-12 h-12 rounded-lg" />
                              <Skeleton className="w-6 h-6" />
                            </div>
                            <Skeleton className="h-5 w-32 mb-2" />
                            <Skeleton className="h-4 w-full mb-4" />
                            <div className="space-y-2 mb-4">
                              <Skeleton className="h-4 w-16" />
                              <Skeleton className="h-4 w-20" />
                              <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex justify-between">
                              <div className="flex space-x-2">
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-8 w-20" />
                              </div>
                              <Skeleton className="h-6 w-16" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : sharedAssets.length === 0 ? (
                    <div className="col-span-full">
                      <Card className="surface-card">
                        <CardContent className="p-8 text-center">
                          <Archive className="w-12 h-12 text-text-muted mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-text-primary mb-2">No Shared Assets</h3>
                          <p className="text-text-secondary">Shared assets will appear here once they are uploaded by the team.</p>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    sharedAssets.map((asset, index) => (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="surface-card hover:shadow-hover transition-all duration-300 group">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              asset.type === 'document' ? 'bg-blue-100 text-blue-600' :
                              asset.type === 'video' ? 'bg-red-100 text-red-600' :
                              asset.type === 'image' ? 'bg-green-100 text-green-600' :
                              asset.type === 'code' ? 'bg-purple-100 text-purple-600' :
                              asset.type === 'presentation' ? 'bg-orange-100 text-orange-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {asset.type === 'document' ? <FileText className="w-6 h-6" /> :
                               asset.type === 'video' ? <Video className="w-6 h-6" /> :
                               asset.type === 'image' ? <Image className="w-6 h-6" /> :
                               asset.type === 'code' ? <Archive className="w-6 h-6" /> :
                               asset.type === 'presentation' ? <FileText className="w-6 h-6" /> :
                               <FileText className="w-6 h-6" />}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold text-text-primary mb-2">{asset.name}</h3>
                          <p className="text-sm text-text-secondary mb-4 line-clamp-2">{asset.description}</p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-text-muted">Size</span>
                              <span className="text-text-primary">{asset.fileSize}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-text-muted">Downloads</span>
                              <span className="text-text-primary">{asset.downloadCount}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-text-muted">Uploaded</span>
                              <span className="text-text-primary">{asset.uploadedAt}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {asset.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDownload('asset', asset.id)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDownload('asset', asset.id)}
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                            </div>
                            <Badge variant={asset.isPublic ? "default" : "secondary"}>
                              {asset.isPublic ? "Public" : "Private"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
                </div>
              </motion.div>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-text-primary">Feedback & Issues</h2>
                  <Button onClick={() => setShowFeedbackForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </Button>
                </div>

                <div className="space-y-4">
                  {feedbackLoading ? (
                    // Loading skeletons for feedback
                    Array.from({ length: 3 }).map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card className="surface-card">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <Skeleton className="h-6 w-16" />
                                  <Skeleton className="h-6 w-20" />
                                  <Skeleton className="h-6 w-24" />
                                </div>
                                <Skeleton className="h-5 w-48 mb-2" />
                                <Skeleton className="h-4 w-full mb-4" />
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex space-x-1">
                                <Skeleton className="h-5 w-12" />
                                <Skeleton className="h-5 w-16" />
                                <Skeleton className="h-5 w-14" />
                              </div>
                              <div className="flex space-x-2">
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-8 w-20" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : feedbackItems.length === 0 ? (
                    <Card className="surface-card">
                      <CardContent className="p-8 text-center">
                        <MessageSquare className="w-12 h-12 text-text-muted mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-text-primary mb-2">No Feedback Yet</h3>
                        <p className="text-text-secondary">Submit your first feedback to get started with the project collaboration.</p>
                        <Button 
                          className="mt-4"
                          onClick={() => setShowFeedbackForm(true)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Submit Feedback
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    feedbackItems.map((feedback, index) => (
                    <motion.div
                      key={feedback.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="surface-card hover:shadow-hover transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge className={getPriorityColor(feedback.priority)}>
                                  {feedback.priority.toUpperCase()}
                                </Badge>
                                <Badge variant="outline">
                                  {feedback.type.toUpperCase()}
                                </Badge>
                                <Badge variant={feedback.status === 'open' ? 'destructive' : 
                                               feedback.status === 'in-progress' ? 'default' : 
                                               'secondary'}>
                                  {feedback.status.replace('-', ' ').toUpperCase()}
                                </Badge>
                              </div>
                              <h3 className="text-lg font-semibold text-text-primary mb-2">{feedback.title}</h3>
                              <p className="text-text-secondary mb-4">{feedback.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                            <div className="flex items-center space-x-4">
                              <span>Submitted by {feedback.submittedBy}</span>
                              <span>•</span>
                              <span>{feedback.submittedAt}</span>
                              {feedback.assignedTo && (
                                <>
                                  <span>•</span>
                                  <span>Assigned to {feedback.assignedTo}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {feedback.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Comment
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-surface-sunken rounded-lg border border-borders-strong p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-text-primary">Submit Feedback</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowFeedbackForm(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-primary mb-2 block">Type</label>
                  <select className="w-full p-2 bg-surface-elevated border border-borders-strong rounded-md text-text-primary">
                    <option value="general">General</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="design">Design Feedback</option>
                    <option value="performance">Performance Issue</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-text-primary mb-2 block">Priority</label>
                  <select className="w-full p-2 bg-surface-elevated border border-borders-strong rounded-md text-text-primary">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-text-primary mb-2 block">Title</label>
                <Input placeholder="Brief description of the feedback" />
              </div>

              <div>
                <label className="text-sm font-medium text-text-primary mb-2 block">Description</label>
                <Textarea 
                  placeholder="Detailed description of your feedback, including steps to reproduce if applicable"
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text-primary mb-2 block">Tags (optional)</label>
                <Input placeholder="Enter tags separated by commas" />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFeedbackForm(false)}
                  disabled={submitFeedbackMutation.isPending}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleFeedbackSubmit({})}
                  disabled={submitFeedbackMutation.isPending}
                >
                  {submitFeedbackMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}