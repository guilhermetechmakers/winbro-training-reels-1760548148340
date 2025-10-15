import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Upload, BookOpen, Search, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-lg text-muted-foreground">Welcome to Winbro Training Reels</p>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Play className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">1,234</div>
              <p className="text-sm text-emerald-green flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-process-orange to-process-orange/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-process-orange">56</div>
              <p className="text-sm text-emerald-green flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learners</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-green to-emerald-green/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-green">342</div>
              <p className="text-sm text-emerald-green flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +23% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-br from-amber to-amber/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber">87%</div>
              <p className="text-sm text-emerald-green flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-process-orange rounded-lg flex items-center justify-center mr-3">
                  <Upload className="w-4 h-4 text-white" />
                </div>
                Quick Actions
              </CardTitle>
              <CardDescription>Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/upload">
                <Button className="w-full justify-start group hover:scale-105 transition-transform duration-200">
                  <Upload className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  Upload New Video
                  <ArrowRight className="ml-auto h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" className="w-full justify-start group hover:scale-105 transition-transform duration-200">
                  <BookOpen className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  Create Course
                  <ArrowRight className="ml-auto h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
              <Link to="/videos">
                <Button variant="outline" className="w-full justify-start group hover:scale-105 transition-transform duration-200">
                  <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  Browse Library
                  <ArrowRight className="ml-auto h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-green to-emerald-green/80 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest training activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">New video uploaded</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                  <div className="w-3 h-3 bg-emerald-green rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Course completed</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                  <div className="w-3 h-3 bg-process-orange rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">New course assigned</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
