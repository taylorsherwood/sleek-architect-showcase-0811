import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import SchemaMarkup, { organizationSchema, websiteSchema, realEstateAgentSchema } from "@/components/SchemaMarkup";

const browserQueryClient = new QueryClient();

interface AppShellProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

export const AppShell = ({ children, queryClient = browserQueryClient }: AppShellProps) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={websiteSchema} />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <Toaster />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <AppShell>
      <BrowserRouter>
        <main id="main-content">
          <AppRoutes />
        </main>
      </BrowserRouter>
  </AppShell>
);

export default App;
