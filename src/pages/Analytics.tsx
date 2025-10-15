import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Video, 
  BookOpen, 
  Eye, 
  CheckCircle,
  Download,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from "lucide-react";

// Mock data
const userGrowthData = [
  { month: "Jan", users: 1200, active: 800 },
  { month: "Feb", users: 1350, active: 920 },
  { month: "Mar", users: 1480, active: 1050 },
  { month: "Apr", users: 1620, active: 1180 },
  { month: "May", users: 1750, active: 1280 },
  { month: "Jun", users: 1890, active: 1400 }
];

const videoPerformanceData = [
  { name: "CNC Setup", views: 1234, completion: 89, likes: 156 },
  { name: "Safety Protocols", views: 1156, completion: 92, likes: 134 },
  { name: "Tool Change", views: 987, completion: 85, likes: 98 },
  { name: "Quality Control", views: 876, completion: 78, likes: 87 },
  { name: "Troubleshooting", views: 765, completion: 82, likes: 76 }
];

const courseCompletionData = [
  { name: "CNC Fundamentals", enrolled: 150, completed: 120, completionRate: 80 },
  { name: "Safety Training", enrolled: 200, completed: 185, completionRate: 92.5 },
  { name: "Advanced Programming", enrolled: 80, completed: 60, completionRate: 75 },
  { name: "Maintenance Basics", enrolled: 120, completed: 90, completionRate: 75 }
];

const engagementData = [
  { time: "00:00", users: 45 },
  { time: "04:00", users: 32 },
  { time: "08:00", users: 156 },
  { time: "12:00", users: 234 },
  { time: "16:00", users: 198 },
  { time: "20:00", users: 167 }
];

const deviceData = [
  { name: "Desktop", value: 65, color: "#003F7F" },
  { name: "Mobile", value: 25, color: "#FF7C2D" },
  { name: "Tablet", value: 10, color: "#2ECC71" }
];

const roleDistributionData = [
  { name: "Operators", value: 45, color: "#003F7F" },
  { name: "Engineers", value: 25, color: "#2ECC71" },
  { name: "Curators", value: 15, color: "#FF7C2D" },
  { name: "Admins", value: 15, color: "#444B54" }
];

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("6m");
  const [selectedMetric, setSelectedMetric] = useState("users");

  const periods = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "3m", label: "Last 3 months" },
    { value: "6m", label: "Last 6 months" },
    { value: "1y", label: "Last year" }
  ];


  const totalUsers = 1890;
  const activeUsers = 1400;
  const totalVideos = 3456;
  const totalCourses = 89;
  const totalViews = 45678;
  const averageSessionDuration = 24.5;
  const completionRate = 87.5;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Track performance and user engagement</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalUsers.toLocaleString()}</div>
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
            <div className="text-2xl font-bold text-emerald-green">{activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeUsers / totalUsers) * 100)}% of total users
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-process-orange to-process-orange/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Eye className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-process-orange">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-emerald-green flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18% from last month
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
            <div className="text-2xl font-bold text-amber">{completionRate}%</div>
            <p className="text-xs text-emerald-green flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs value={selectedMetric} onValueChange={setSelectedMetric} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Growth</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="courses">Course Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  User Growth Over Time
                </CardTitle>
                <CardDescription>
                  Total users and active users by month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stackId="1"
                      stroke="#003F7F"
                      fill="#003F7F"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="active"
                      stackId="2"
                      stroke="#2ECC71"
                      fill="#2ECC71"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Role Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="w-5 h-5 mr-2" />
                  User Role Distribution
                </CardTitle>
                <CardDescription>
                  Breakdown of users by role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={roleDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {roleDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Engagement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Daily Engagement Pattern
                </CardTitle>
                <CardDescription>
                  User activity throughout the day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#003F7F"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Device Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="w-5 h-5 mr-2" />
                  Device Usage
                </CardTitle>
                <CardDescription>
                  Platform distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="w-5 h-5 mr-2" />
                Video Performance
              </CardTitle>
              <CardDescription>
                Top performing videos by views and completion rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={videoPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="views" fill="#003F7F" name="Views" />
                  <Bar yAxisId="right" dataKey="completion" fill="#2ECC71" name="Completion %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Course Completion Analytics
              </CardTitle>
              <CardDescription>
                Course enrollment and completion rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseCompletionData.map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{course.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{course.enrolled} enrolled</span>
                        <span>{course.completed} completed</span>
                        <Badge variant="outline">{course.completionRate}%</Badge>
                      </div>
                    </div>
                    <Progress value={course.completionRate} className="w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Session Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Average Session Duration</span>
              <span className="font-medium">{averageSessionDuration} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Sessions per User</span>
              <span className="font-medium">3.2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Bounce Rate</span>
              <span className="font-medium">12.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Content Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Videos</span>
              <span className="font-medium">{totalVideos.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Courses</span>
              <span className="font-medium">{totalCourses}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Average Video Length</span>
              <span className="font-medium">4.2 minutes</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Video Completion Rate</span>
              <span className="font-medium">78.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Course Completion Rate</span>
              <span className="font-medium">{completionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">User Retention (30d)</span>
              <span className="font-medium">85.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
