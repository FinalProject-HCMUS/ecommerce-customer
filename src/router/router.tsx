import { lazy } from 'react';
import routeConstants from '../constants/route';


const HomePage = lazy(() => import('../page/home/home-page'));
const SearchPage = lazy(() => import('../page/search/search-page'));
const DetailProduct = lazy(
  () => import('../page/detail-product/detail-product-page')
);
const Policy = lazy(() => import('../page/policy/policy'));
const Page403 = lazy(() => import('../page/error/Page403'));
const Page500 = lazy(() => import('../page/error/Page500'));


export interface IRoute {
  exact?: boolean;
  path: string;
  name: string;
  component?: React.ElementType;
  children?: string[];
  flagKey?: string;
  root?: string;
}

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
    path: routeConstants.PRODUCT.DETAIL,
    name: 'Detail Product',
    component: DetailProduct,
  },
  {
    exact: true,
    path: routeConstants.POLICY,
    name: 'Policy Page',
    component: Policy,
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
];

export default routes;
