import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

// Pages
import LandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/auth/AuthPage";
import PasswordResetPage from "@/pages/auth/PasswordResetPage";
import EmailVerificationPage from "@/pages/auth/EmailVerificationPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import AIIntakePage from "@/pages/intake/AIIntakePage";
import ProposalsPage from "@/pages/business/ProposalsPage";
import ProjectSpacePage from "@/pages/projects/ProjectSpacePage";
import ClientPortalPage from "@/pages/projects/ClientPortalPage";
import AICopilotPage from "@/pages/ai/AICopilotPage";
import RepositoryIntegrationsPage from "@/pages/integrations/RepositoryIntegrationsPage";
import StandupsPage from "@/pages/team/StandupsPage";
import LaunchChecklistPage from "@/pages/launch/LaunchChecklistPage";
import BillingPage from "@/pages/billing/BillingPage";
import TimeTrackingPage from "@/pages/time/TimeTrackingPage";
import HandoverPackPage from "@/pages/handover/HandoverPackPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import HelpPage from "@/pages/help/HelpPage";
import CheckoutPage from "@/pages/payment/CheckoutPage";
import OrderHistoryPage from "@/pages/payment/OrderHistoryPage";
import ContentEditorPage from "@/pages/content/ContentEditorPage";
import PrivacyPolicyPage from "@/pages/legal/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/legal/TermsOfServicePage";
import CookiePolicyPage from "@/pages/legal/CookiePolicyPage";
import NotFoundPage from "@/pages/error/NotFoundPage";
import ServerErrorPage from "@/pages/error/ServerErrorPage";
import LoadingPage from "@/pages/status/LoadingPage";

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
      <ThemeProvider defaultTheme="system" storageKey="autopilot-theme">
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} />
              <Route path="/password-reset" element={<PasswordResetPage />} />
              <Route path="/email-verification" element={<EmailVerificationPage />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/intake" element={<AIIntakePage />} />
              
              {/* Business Process Routes */}
              <Route path="/proposals" element={<ProposalsPage />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/time-tracking" element={<TimeTrackingPage />} />
              <Route path="/handover-pack" element={<HandoverPackPage />} />
              
              {/* Project Routes */}
              <Route path="/projects/:id" element={<ProjectSpacePage />} />
              <Route path="/client-portal/:id" element={<ClientPortalPage />} />
              
              {/* AI & Integration Routes */}
              <Route path="/ai-copilot" element={<AICopilotPage />} />
              <Route path="/integrations" element={<RepositoryIntegrationsPage />} />
              <Route path="/standups" element={<StandupsPage />} />
              <Route path="/launch-checklist" element={<LaunchChecklistPage />} />
              
              {/* Admin & Settings Routes */}
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/help" element={<HelpPage />} />
              
              {/* Payment Routes */}
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              
              {/* Content Management Routes */}
              <Route path="/content-editor" element={<ContentEditorPage />} />
              
              {/* Legal Routes */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              
              {/* Status Routes */}
              <Route path="/loading" element={<LoadingPage />} />
              
              {/* Error Routes */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/500" element={<ServerErrorPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;