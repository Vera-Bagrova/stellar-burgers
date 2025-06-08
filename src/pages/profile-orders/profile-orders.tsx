import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { ordersActions, ordersSelectors } from '../../services/slices/orders';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(ordersSelectors.ordersSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersActions.fetchOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
