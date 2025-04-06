import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { HomePage } from '../page/home';
import { SearchPage } from '../page/search';
import MainLayout from '../layout/main-layout';
import { DetailProduct } from '../page/detail-product';
import { LoginPage } from '../page/auth';
import { Registration } from '../page/auth';
import { CartPage } from '../page/cart';
import { CheckoutPage } from '../page/checkout';
import { Chat } from '../page/chat';
import { Policy } from '../page/policy';
import { BlogPage, DetailBlogPage } from '../page/blog';
import Page403 from '../page/error/Page403';
import Page404 from '../page/error/Page404';
import Page500 from '../page/error/Page500';

// Define the router with typed routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:id" element={<DetailProduct />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<DetailBlogPage />} />
      <Route path="/403" element={<Page403 />} />
      <Route path="/500" element={<Page500 />} />
      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<Page404 />} />
    </Route>,
  ),
);

export default router;
