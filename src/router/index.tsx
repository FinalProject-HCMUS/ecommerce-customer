// import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
// import { HomePage } from '../page/home';
// import { SearchPage } from '../page/search';
// import MainLayout from '../layout/main-layout';
// import { DetailProduct } from '../page/detail-product';
// import { LoginPage } from '../page/auth';
// import { Registration } from '../page/auth';
// import { CartPage } from '../page/cart';
// import { CheckoutPage } from '../page/checkout';
// import { Chat } from '../page/chat';
// import { Policy } from '../page/policy';
// import { BlogPage, DetailBlogPage } from '../page/blog';
// import Page403 from '../page/error/Page403';
// import Page404 from '../page/error/Page404';
// import Page500 from '../page/error/Page500';

// // Define the router with typed routes
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<MainLayout />}>
//       <Route index element={<HomePage />} />
//       <Route path="/search" element={<SearchPage />} />
//       <Route path="/product/:id" element={<DetailProduct />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<Registration />} />
//       <Route path="/cart" element={<CartPage />} />
//       <Route path="/checkout" element={<CheckoutPage />} />
//       <Route path="/chat" element={<Chat />} />
//       <Route path="/policy" element={<Policy />} />
//       <Route path="/blog" element={<BlogPage />} />
//       <Route path="/blog/:id" element={<DetailBlogPage />} />
//       <Route path="/403" element={<Page403 />} />
//       <Route path="/500" element={<Page500 />} />
//       {/* Catch-all route for 404 errors */}
//       <Route path="*" element={<Page404 />} />
//     </Route>,
//   ),
// );

// export default router;
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
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
        <Route key={index} path={route.path} element={route.component ? <route.component /> : null} />
      ))}
      {/* Catch-all route for 404 errors */}
      <Route path="*" element={<Page404 />} />
    </Route>,
  ),
);

export default router;

// export default router;
// import { Suspense } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import routes from "./index";
// import MainLayout from "../layout/main-layout";
// import Page404 from "../page/error/Page404";

// const App = () => {
//   return (
//     <Router>
//       <MainLayout>
//         <Suspense fallback={<div>Loading...</div>}>
//           <Routes>
//             {routes.map((route, index) => (
//               <Route
//                 key={index}
//                 path={route.path}
//                 element={route.component ? <route.component /> : null}
//               />
//             ))}
//             {/* Catch-all route for 404 errors */}
//             <Route path="*" element={<Page404 />} />
//           </Routes>
//         </Suspense>
//       </MainLayout>
//     </Router>
//   );
// };
