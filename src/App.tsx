
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import { lazy, Suspense } from "react";
import AppSidebar from "./components/AppSidebar";
import OrderDetails from "./pages/OrderDetails";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import TermsAndConditionsPage from "./pages/legal/TermsAndConditionsPage";
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage";

// Lazy load the pages
const Revenue = lazy(() => import("./pages/Revenue"));
const Support = lazy(() => import("./pages/Support"));
const Profile = lazy(() => import("./pages/Profile"));
const Services = lazy(() => import("./pages/Services"));
const Customers = lazy(() => import("./pages/Customers"));
const Feedback = lazy(() => import("./pages/Feedback"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Legal pages */}
            <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <div className="flex min-h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1 pl-0 lg:pl-64">
                    <Suspense fallback={<div className="p-8">Loading...</div>}>
                      <Index />
                    </Suspense>
                  </main>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/orders" element={
              <ProtectedRoute>
                <div className="flex min-h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1 pl-0 lg:pl-64">
                    <Suspense fallback={<div className="p-8">Loading...</div>}>
                      <Orders />
                    </Suspense>
                  </main>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/order/:orderId" element={
              <ProtectedRoute>
                <div className="flex min-h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1 pl-0 lg:pl-64">
                    <Suspense fallback={<div className="p-8">Loading...</div>}>
                      <OrderDetails />
                    </Suspense>
                  </main>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/revenue" element={
              <ProtectedRoute>
                <div className="flex min-h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1 pl-0 lg:pl-64">
                    <Suspense fallback={<div className="p-8">Loading...</div>}>
                      <Revenue />
                    </Suspense>
                  </main>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/support" element={
              <ProtectedRoute>
                <div className="flex min-h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1 pl-0 lg:pl-64">
                    <Suspense fallback={<div className="p-8">Loading...</div>}>
                      <Support />
                    </Suspense>
                  </main>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <div className="flex min-h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1 pl-0 lg:pl-64">
                    <Suspense fallback={<div className="p-8">Loading...</div>}>
                      <Profile />
                    </Suspense>
                  </main>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/services" element={
              <ProtectedRoute>
                <div className="flex min-h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1 pl-0 lg:pl-64">
                    <Suspense fallback={<div className="p-8">Loading...</div>}>
                      <Services />
                    </Suspense>
                  </main>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/feedback" element={
              <ProtectedRoute>
                <div className="flex min-h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1 pl-0 lg:pl-64">
                    <Suspense fallback={<div className="p-8">Loading...</div>}>
                      <Feedback />
                    </Suspense>
                  </main>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <Navigate to="/services" replace />
              </ProtectedRoute>
            } />
            
            <Route path="/customers" element={
              <ProtectedRoute>
                <div className="flex min-h-screen w-full">
                  <AppSidebar />
                  <main className="flex-1 pl-0 lg:pl-64">
                    <Suspense fallback={<div className="p-8">Loading...</div>}>
                      <Customers />
                    </Suspense>
                  </main>
                </div>
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
