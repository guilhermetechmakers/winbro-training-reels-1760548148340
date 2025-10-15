import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Home, 
  Search, 
  ArrowLeft, 
  HelpCircle,
  BookOpen,
  Video
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* 404 Error */}
        <div className="text-center mb-8">
          <div className="text-8xl font-bold text-primary mb-4 animate-bounce">
            404
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold mb-2">Looking for something specific?</h2>
              <p className="text-muted-foreground">Try searching for what you need</p>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search videos, courses, or users..."
                  className="pl-10"
                />
              </div>
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Popular Pages</CardTitle>
            <CardDescription className="text-center">
              Here are some pages you might be looking for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/dashboard">
                <Card className="card-hover group">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-process-orange rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Home className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors duration-200">Dashboard</h3>
                        <p className="text-sm text-muted-foreground">Your main workspace</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/videos">
                <Card className="card-hover group">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-green to-emerald-green/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Video className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors duration-200">Video Library</h3>
                        <p className="text-sm text-muted-foreground">Browse training videos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/courses">
                <Card className="card-hover group">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber to-amber/80 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors duration-200">Courses</h3>
                        <p className="text-sm text-muted-foreground">Training courses and programs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/help">
                <Card className="card-hover group">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-secondary to-industrial-gray rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <HelpCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors duration-200">Help Center</h3>
                        <p className="text-sm text-muted-foreground">Get support and guidance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/dashboard">
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please{" "}
            <Link to="/contact" className="text-primary hover:underline">
              contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
