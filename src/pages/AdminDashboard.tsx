import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users, 
  Video, 
  BookOpen, 
  CheckCircle, 
  TrendingUp, 
  Activity,
  Shield,
  Settings,
  Eye,
  Play,
  MoreHorizontal,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const moderationQueue = [
  {
    id: "1",
    type: "video",
    title: "CNC Machine Setup - Part 1",
    uploadedBy: "John Smith",
    uploadedAt: "2024-01-15T10:30:00Z",
    status: "pending_review",
    reason: "New upload",
    priority: "high"
  },
  {
    id: "2",
    type: "video",
    title: "Safety Protocol Violation",
    uploadedBy: "Mike Chen",
    uploadedAt: "2024-01-15T09:15:00Z",
    status: "flagged",
    reason: "Reported for inappropriate content",
    priority: "urgent"
  },
  {
    id: "3",
    type: "course",
    title: "Advanced CNC Programming",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "2024-01-14T16:45:00Z",
    status: "pending_review",
    reason: "Course update",
    priority: "medium"
  }
];

const systemHealth = {
  status: "healthy",
  uptime: "99.9%",
  activeUsers: 1247,
  processingJobs: 3,
  storageUsed: "2.4 TB",
  lastBackup: "2024-01-15T02:00:00Z"
};

const recentActivity = [
  {
    id: "1",
    type: "user_registration",
    description: "New user registered: David Rodriguez",
    timestamp: "2024-01-15T14:30:00Z",
    severity: "info"
  },
  {
    id: "2",
    type: "video_upload",
    description: "Video uploaded: CNC Safety Procedures",
    timestamp: "2024-01-15T13:45:00Z",
    severity: "info"
  },
  {
    id: "3",
    type: "system_alert",
    description: "High CPU usage detected on video processing server",
    timestamp: "2024-01-15T12:20:00Z",
    severity: "warning"
  },
  {
    id: "4",
    type: "course_completion",
    description: "Course completed: 15 users finished CNC Fundamentals",
    timestamp: "2024-01-15T11:15:00Z",
    severity: "success"
  }
];

const analyticsData = {
  totalUsers: 1247,
  activeUsers: 892,
  totalVideos: 3456,
  totalCourses: 89,
  totalViews: 45678,
  completionRate: 87.5,
  averageSessionDuration: 24.5,
  topVideos: [
    { title: "CNC Machine Setup", views: 1234, completion: 89 },
    { title: "Safety Protocols", views: 1156, completion: 92 },
    { title: "Tool Change Procedure", views: 987, completion: 85 }
  ]
};

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [moderationFilter, setModerationFilter] = useState("all");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-error-red text-white";
      case "high": return "bg-amber text-white";
      case "medium": return "bg-process-orange text-white";
      case "low": return "bg-emerald-green text-white";
      default: return "bg-secondary text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_review": return "bg-amber text-white";
      case "flagged": return "bg-error-red text-white";
      case "approved": return "bg-emerald-green text-white";
      case "rejected": return "bg-secondary text-white";
      default: return "bg-secondary text-white";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "info": return "text-primary";
      case "warning": return "text-amber";
      case "error": return "text-error-red";
      case "success": return "text-emerald-green";
      default: return "text-muted-foreground";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const filteredModerationQueue = moderationFilter === "all" 
    ? moderationQueue 
    : moderationQueue.filter(item => item.status === moderationFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage the platform</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{analyticsData.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-emerald-green flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-green to-emerald-green/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Activity className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-green">{analyticsData.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((analyticsData.activeUsers / analyticsData.totalUsers) * 100)}% of total users
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-process-orange to-process-orange/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Video className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-process-orange">{analyticsData.totalVideos.toLocaleString()}</div>
            <p className="text-xs text-emerald-green flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-amber to-amber/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber">{analyticsData.completionRate}%</div>
            <p className="text-xs text-emerald-green flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-2",
                        getSeverityColor(activity.severity)
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimestamp(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Videos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Top Performing Videos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topVideos.map((video, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                          <Play className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{video.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {video.views.toLocaleString()} views
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{video.completion}%</p>
                        <p className="text-xs text-muted-foreground">completion</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="moderation" className="space-y-6">
          {/* Moderation Queue */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Moderation Queue
                  </CardTitle>
                  <CardDescription>
                    Review and approve content before publishing
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={moderationFilter} onValueChange={setModerationFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Items</SelectItem>
                      <SelectItem value="pending_review">Pending Review</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredModerationQueue.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                            {item.type === 'video' ? <Video className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.reason}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.uploadedBy}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {formatTimestamp(item.uploadedAt)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>User Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Users</span>
                    <span className="font-medium">{analyticsData.totalUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Users (30d)</span>
                    <span className="font-medium">{analyticsData.activeUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average Session</span>
                    <span className="font-medium">{analyticsData.averageSessionDuration} min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Content Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Videos</span>
                    <span className="font-medium">{analyticsData.totalVideos.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Courses</span>
                    <span className="font-medium">{analyticsData.totalCourses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Views</span>
                    <span className="font-medium">{analyticsData.totalViews.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-emerald-green text-white">
                    {systemHealth.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="font-medium">{systemHealth.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Processing Jobs</span>
                  <span className="font-medium">{systemHealth.processingJobs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Storage Used</span>
                  <span className="font-medium">{systemHealth.storageUsed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Backup</span>
                  <span className="font-medium text-sm">
                    {formatTimestamp(systemHealth.lastBackup)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="w-full" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} className="w-full" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Disk Usage</span>
                    <span>23%</span>
                  </div>
                  <Progress value={23} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
