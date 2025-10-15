import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import DashboardLayout from "@/components/DashboardLayout";

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
              <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
              <Route path="/videos" element={<DashboardLayout><VideoLibrary /></DashboardLayout>} />
              <Route path="/videos/:id" element={<DashboardLayout><VideoPlayer /></DashboardLayout>} />
              <Route path="/upload" element={<DashboardLayout><UploadVideo /></DashboardLayout>} />
              <Route path="/courses" element={<DashboardLayout><CourseBuilder /></DashboardLayout>} />
              <Route path="/courses/:id" element={<DashboardLayout><CoursePlayer /></DashboardLayout>} />
              <Route path="/profile" element={<DashboardLayout><UserProfile /></DashboardLayout>} />
              <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
              <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
              <Route path="/admin/users" element={<DashboardLayout><UserManagement /></DashboardLayout>} />
              <Route path="/admin/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
              <Route path="/admin/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
              
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
