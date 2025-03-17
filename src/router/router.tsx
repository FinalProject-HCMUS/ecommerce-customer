import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { HomePage } from '../page/home';
import { SearchPage } from '../page/search';
import MainLayout from '../layout/main-layout';

// Define the router with typed routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
    </Route>,
  ),
);

export default router;
