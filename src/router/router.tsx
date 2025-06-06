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
const OrderConfirmationPage = lazy(
  () => import('../page/checkout/order-confirmation')
);
const RequestPasswordResetPage = lazy(
  () => import('../page/auth/request-password-reset-page')
);
const ResetPasswordPage = lazy(
  () => import('../page/auth/reset-password-page')
);

const routes: IRoute[] = [
  {
    exact: true,
    path: routeConstants.HOME,
    name: 'Home',
    component: HomePage,
  },
  {
    exact: true,
    path: routeConstants.SEARCH,
    name: 'Products',
    component: SearchPage,
  },
  {
    exact: true,
    path: routeConstants.AUTH.LOGIN,
    name: 'Login',
    component: withUnAuthenticatedUser(LoginPage),
  },
  {
    exact: true,
    path: routeConstants.AUTH.REGISTER,
    name: 'Register',
    component: RegistrationPage,
  },
  {
    exact: true,
    path: routeConstants.PRODUCT.DETAIL,
    name: 'Detail Product',
    component: DetailProduct,
  },
  {
    exact: true,
    path: routeConstants.PROFILE,
    name: 'Profile Page',
    component: withAuthenticatedUser(ProfilePage),
  },
  {
    exact: true,
    path: routeConstants.CART,
    name: 'Cart Page',
    component: withAuthenticatedUser(CartPage),
  },
  {
    exact: true,
    path: routeConstants.CHECKOUT,
    name: 'Checkout Page',
    component: withAuthenticatedUser(CheckoutPage),
  },
  {
    exact: true,
    path: routeConstants.CHAT,
    name: 'Chat Pages',
    component: withAuthenticatedUser(Chat),
  },
  {
    exact: true,
    path: routeConstants.POLICY,
    name: 'Policy Page',
    component: Policy,
  },
  {
    exact: true,
    path: routeConstants.BLOG.LIST,
    name: 'Blog Page',
    component: BlogPage,
  },
  {
    exact: true,
    path: routeConstants.BLOG.DETAIL,
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
    path: routeConstants.ORDER.ROOT,
    name: 'Orders Page',
    component: withAuthenticatedUser(OrdersPage),
  },
  {
    exact: true,
    path: routeConstants.AUTH.ACTIVATE_ACCOUNT,
    name: 'Activate Account',
    component: ActivateAccountPage,
  },
  {
    exact: true,
    path: routeConstants.AUTH.CONFIRM_EMAIL,
    name: 'Confirm Email',
    component: ConfirmEmailPage,
  },
  {
    exact: true,
    path: routeConstants.AUTH.CHANGE_PASSWORD,
    name: 'Change Password',
    component: withAuthenticatedUser(ChangePasswordPage),
  },
  {
    exact: true,
    path: routeConstants.AUTH.AUTHENTICATE,
    name: 'Authenticate User',
    component: AuthenticatePage,
  },
  {
    exact: true,
    path: routeConstants.ORDER.CONFIRMATION,
    name: 'Order Confirmation',
    component: OrderConfirmationPage,
  },
  {
    exact: true,
    path: routeConstants.AUTH.RESET_PASSWORD_REQUEST,
    name: 'Request Password Reset',
    component: RequestPasswordResetPage,
  },
  {
    exact: true,
    path: routeConstants.AUTH.RESET_PASSWORD_REQUEST,
    name: 'Request Password Reset',
    component: RequestPasswordResetPage,
  },
  {
    exact: true,
    path: routeConstants.AUTH.RESET_PASSWORD,
    name: 'Reset Password',
    component: ResetPasswordPage,
  },
];

export default routes;
