import { ReactLocation, Route, Router } from '@tanstack/react-location';
import { DetailPage, useDetailPageLoader } from '../pages/detail/DetailPage';
import { LoginPage } from '../pages/login/LoginPage';
import { TopPage } from '../pages/top/TopPage';
import { useNextPage } from './useNextPage';
import { urls } from '@/consts/urls';

const location = new ReactLocation();

/** React Locationのルーターです */
export const AppRouter = () => {
  const routes: Route[] = [
    { path: urls.top, element: <TopPage />, loader: useNextPage() },
    { path: urls.login, element: <LoginPage />, loader: useNextPage() },
    {
      path: urls.detail + '/:id',
      element: <DetailPage />,
      loader: useNextPage(useDetailPageLoader),
    },
  ];

  return <Router location={location} routes={routes}></Router>;
};
