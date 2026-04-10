import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { assembleRoutes } from './routeAssembler';

const router = createBrowserRouter(assembleRoutes());

export function AppRouter() {
  return <RouterProvider router={router} />;
}
