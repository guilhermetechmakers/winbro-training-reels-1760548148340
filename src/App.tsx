import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

// Pages
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import PasswordResetPage from "@/pages/PasswordResetPage";
import EmailVerificationPage from "@/pages/EmailVerificationPage";
import Dashboard from "@/pages/Dashboard";
import VideoLibrary from "@/pages/VideoLibrary";
import VideoPlayer from "@/pages/VideoPlayer";
import UploadVideo from "@/pages/UploadVideo";
import CourseBuilder from "@/pages/CourseBuilder";
import CoursePlayer from "@/pages/CoursePlayer";
import UserProfile from "@/pages/UserProfile";
import AdminDashboard from "@/pages/AdminDashboard";
import UserManagement from "@/pages/UserManagement";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

// React Query client with optimal defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="winbro-theme">
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/password-reset" element={<PasswordResetPage />} />
              <Route path="/verify-email" element={<EmailVerificationPage />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/videos" element={<VideoLibrary />} />
              <Route path="/videos/:id" element={<VideoPlayer />} />
              <Route path="/upload" element={<UploadVideo />} />
              <Route path="/courses" element={<CourseBuilder />} />
              <Route path="/courses/:id" element={<CoursePlayer />} />
              <Route path="/profile" element={<UserProfile />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/settings" element={<Settings />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
