import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { lazy } from 'react';
import routes from './router';
import MainLayout from '../layout/main-layout';

const Page404 = lazy(() => import('../page/error/Page404'));
const HomePage = lazy(() => import('../page/home/home-page'));

// Define the router with typed routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.component ? <route.component /> : null}
        />
      ))}
      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<Page404 />} />
    </Route>
  ),
  {
    basename: '/ecommerce-customer'
  }
);

export default router;
