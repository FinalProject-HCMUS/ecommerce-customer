import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { HomePage } from '../page/home';
import { SearchPage } from '../page/search';
import MainLayout from '../layout/main-layout';
import { DetailProduct } from '../page/detail-product';
import { LoginPage } from '../page/login';
import { RegistrationPage } from '../page/registration';

// Define the router with typed routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:id" element={<DetailProduct />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Route>,
  ),
);

export default router;
