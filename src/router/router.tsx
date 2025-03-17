import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { HomePage } from '../page/home';
import MainLayout from '../layout/main-layout';

// Define the router with typed routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
    </Route>,
  ),
);

export default router;
