import { AppProviders } from './app/providers/AppProviders';
import { AppRouter } from './app/router/AppRouter';
import { ErrorBoundary } from './shared/errors/ErrorBoundary';

export default function App() {
  return (
    <AppProviders>
      <ErrorBoundary name="App">
        <AppRouter />
      </ErrorBoundary>
    </AppProviders>
  );
}
