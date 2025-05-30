import { IRoute } from '../interfaces/temp/common';
import { lazy } from 'react';
import { withAuthenticatedUser } from '../hocs/withAuthenticatedUser';
import { withUnAuthenticatedUser } from '../hocs/withUnAuthenticatedUser';
import routeConstants from '../constants/route';

const ActivateAccountPage = lazy(
  () => import('../page/auth/activate-account-page')
);
const ConfirmEmailPage = lazy(() => import('../page/auth/confirm-email-page'));
const HomePage = lazy(() => import('../page/home/home-page'));
const SearchPage = lazy(() => import('../page/search/search-page'));
const LoginPage = lazy(() => import('../page/auth/login-page'));
const RegistrationPage = lazy(() => import('../page/auth/registration-page'));
const DetailProduct = lazy(
  () => import('../page/detail-product/detail-product-page')
);
const CartPage = lazy(() => import('../page/cart/cart-page'));
const CheckoutPage = lazy(() => import('../page/checkout/checkout-page'));
const Chat = lazy(() => import('../page/chat/chat'));
const Policy = lazy(() => import('../page/policy/policy'));
const BlogPage = lazy(() => import('../page/blog/blog-page'));
const DetailBlogPage = lazy(() => import('../page/blog/detail-blog-page'));
const Page403 = lazy(() => import('../page/error/Page403'));
const Page500 = lazy(() => import('../page/error/Page500'));
const OrdersPage = lazy(() => import('../page/order/order-page'));
const ProfilePage = lazy(() => import('../page/profile/profile-page'));
const ChangePasswordPage = lazy(
  () => import('../page/auth/change-password-page')
);
const AuthenticatePage = lazy(() => import('../page/auth/authenticate-page'));
const OrderConfirmationPage = lazy(()=> import('../page/checkout/order-confirmation'));

const routes: IRoute[] = [
  {
    exact: true,
    path: routeConstants.HOME,
    name: 'Home',
    component: HomePage,
  },
  {
    exact: true,
    path: '/products',
    name: 'Products',
    component: SearchPage,
  },
  {
    exact: true,
    path: '/login',
    name: 'Login',
    component: withUnAuthenticatedUser(LoginPage),
  },
  {
    exact: true,
    path: '/register',
    name: 'Register',
    component: RegistrationPage,
  },
  {
    exact: true,
    path: '/product/:id',
    name: 'Detail Product',
    component: DetailProduct,
  },
  {
    exact: true,
    path: '/profile',
    name: 'Profile Page',
    component: withAuthenticatedUser(ProfilePage),
  },
  {
    exact: true,
    path: '/cart',
    name: 'Cart Page',
    component: withAuthenticatedUser(CartPage),
  },
  {
    exact: true,
    path: '/checkout',
    name: 'Checkout Page',
    component: withAuthenticatedUser(CheckoutPage),
  },
  {
    exact: true,
    path: '/chat',
    name: 'Chat Pages',
    component: withAuthenticatedUser(Chat),
  },
  {
    exact: true,
    path: '/policy',
    name: 'Policy Page',
    component: Policy,
  },
  {
    exact: true,
    path: '/blog',
    name: 'Blog Page',
    component: BlogPage,
  },
  {
    exact: true,
    path: '/blog/:id',
    name: 'Detail Blog Page',
    component: DetailBlogPage,
  },
  {
    exact: true,
    path: '/403',
    name: 'Page 403',
    component: Page403,
  },
  {
    exact: true,
    path: '/500',
    name: 'Page 500',
    component: Page500,
  },
  {
    exact: true,
    path: '/orders',
    name: 'Orders Page',
    component: withAuthenticatedUser(OrdersPage),
  },
  {
    exact: true,
    path: 'activate-account',
    name: 'Activate Account',
    component: ActivateAccountPage,
  },
  {
    exact: true,
    path: '/confirm-email',
    name: 'Confirm Email',
    component: ConfirmEmailPage,
  },
  {
    exact: true,
    path: '/change-password',
    name: 'Change Password',
    component: withAuthenticatedUser(ChangePasswordPage),
  },
  {
    exact: true,
    path: '/authenticate',
    name: 'Authenticate User',
    component: AuthenticatePage,
  },
  {
    exact: true,
    path: '/order-confirmation',
    name: 'Order Confirmation',
    component: OrderConfirmationPage
  }
];

export default routes;
