import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { orderActions, orderSelectors } from '../../services/slices/order';
import {
  burgerConstructorActions,
  burgerConstructorSelectors
} from '../../services/slices/burgerConstructor';
import { userSelectors } from '../../services/slices/user';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = {
    bun: useSelector(burgerConstructorSelectors.bunSelector),
    ingredients: useSelector(burgerConstructorSelectors.ingredientsSelector)
  };

  const orderRequest = useSelector(orderSelectors.orderRequestSelector);

  const orderModalData = useSelector(orderSelectors.orderSelector);

  const user = useSelector(userSelectors.userDataSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      return navigate('/login');
    }

    if (constructorItems.bun._id && constructorItems.ingredients.length) {
      const orderData = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ];

      dispatch(orderActions.fetchNewOrder(orderData))
        .unwrap()
        .then(() => {
          dispatch(burgerConstructorActions.clearConstructor());
        })
        .catch((error) => console.error(error));
    }
  };

  const closeOrderModal = () => {
    dispatch(orderActions.clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
