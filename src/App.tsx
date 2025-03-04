
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import { lazy, Suspense } from "react";
import AppSidebar from "./components/AppSidebar";

// Lazy load the pages
const Revenue = lazy(() => import("./pages/Revenue"));
const Support = lazy(() => import("./pages/Support"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Customers = lazy(() => import("./pages/Customers"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 pl-0 lg:pl-64">
            <Suspense fallback={<div className="p-8">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/revenue" element={<Revenue />} />
                <Route path="/support" element={<Support />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/customers" element={<Customers />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
