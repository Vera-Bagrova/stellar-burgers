import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { userSelectors } from '../../services/slices/user';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector(userSelectors.isAuthCheckedSelector);
  const user = useSelector(userSelectors.userDataSelector);

  // пока идёт чекаут пользователя, показываем прелоадер
  if (!isAuthChecked) {
    return <Preloader />;
  }

  //  если маршрут для авторизованного пользователя, но пользователь неавторизован, то делаем редирект
  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  //  если маршрут для неавторизованного пользователя, но пользователь авторизован
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
