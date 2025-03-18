import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { HomePage } from '../page/home';
import { SearchPage } from '../page/search';
import MainLayout from '../layout/main-layout';
import { DetailProduct } from '../page/detail-product';

// Define the router with typed routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:id" element={<DetailProduct />} />
    </Route>,
  ),
);

export default router;
