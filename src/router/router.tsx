import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { HomePage } from '../page/home';
import { SearchPage } from '../page/search';
import MainLayout from '../layout/main-layout';
import { DetailProduct } from '../page/detail-product';
import { LoginPage } from '../page/login';
import { RegistrationPage } from '../page/registration';
import { CartPage } from '../page/cart';
import { CheckoutPage } from '../page/checkout';
import { Chat } from '../page/chat';
import { Policy } from '../page/policy';
import { BlogPage } from '../page/blog';

// Define the router with typed routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:id" element={<DetailProduct />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/checkout" element={<CheckoutPage/>} />
      <Route path="/chat" element={<Chat/>} />
      <Route path="/policy" element={<Policy/>} />
      <Route path="/blog" element={<BlogPage/>} />
    </Route>,
  ),
);

export default router;
