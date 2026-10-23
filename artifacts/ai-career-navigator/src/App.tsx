import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import { AppShell } from './components/Shared';
import { NavigatorProvider } from './state/NavigatorContext';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import FutureSkills from './pages/FutureSkills';
import Careers from './pages/Careers';
import SkillsGap from './pages/SkillsGap';
import Roadmap from './pages/Roadmap';
import SDGPage from './pages/SDG';
import DisruptionPage from './pages/Disruption';
import ReportPage from './pages/Report';

const queryClient = new QueryClient();

function Router() {
  return (
    <NavigatorProvider>
      <AppShell>
        <RoutedErrorBoundary>
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/future-skills" component={FutureSkills} />
            <Route path="/careers" component={Careers} />
            <Route path="/skills-gap" component={SkillsGap} />
            <Route path="/roadmap" component={Roadmap} />
            <Route path="/sdg" component={SDGPage} />
            <Route path="/disruption" component={DisruptionPage} />
            <Route path="/report" component={ReportPage} />
            <Route component={NotFound} />
          </Switch>
        </RoutedErrorBoundary>
      </AppShell>
    </NavigatorProvider>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
