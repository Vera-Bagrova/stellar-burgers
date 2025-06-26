import { TOrder } from '@utils-types';
import { orderActions, orderSlice, TOrderState } from '../slices/order';

describe('orderSlice', () => {
  const initialState: TOrderState = {
    order: null,
    orderByNumber: null,
    isLoading: false,
    isLoadingByNumber: false,
    error: null
  };

  const order: TOrder = {
    _id: '1',
    status: 'done',
    name: 'test order',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    number: 111222,
    ingredients: ['ingredient 1', 'ingredient 2']
  };

  it('[clearOrder] очищает данные о заказе', () => {
    const resultState = orderSlice.reducer(
      {
        ...initialState,
        order
      },
      orderActions.clearOrder()
    );

    expect(resultState.order).toBeNull();
  });

  describe('Создание нового заказа', () => {
    it('Проверка fetchNewOrder.pending', () => {
      const expectedState: TOrderState = {
        ...initialState,
        isLoading: true,
        error: null
      };

      const resultState = orderSlice.reducer(
        {
          ...initialState,
          error: 'test error'
        },
        orderActions.fetchNewOrder.pending('', [])
      );

      expect(resultState).toEqual(expectedState);
    });

    it('Проверка fetchNewOrder.fulfilled', () => {
      const orderResponse = {
        success: true,
        order,
        name: ''
      };

      const expectedState: TOrderState = {
        ...initialState,
        order,
        isLoading: false
      };

      const resultState = orderSlice.reducer(
        {
          ...initialState,
          isLoading: true
        },
        orderActions.fetchNewOrder.fulfilled(orderResponse, '', [])
      );

      expect(resultState).toEqual(expectedState);
    });

    it('Проверка fetchNewOrder.rejected', () => {
      const expectedState: TOrderState = {
        ...initialState,
        isLoading: false,
        error: 'test error'
      };

      const resultState = orderSlice.reducer(
        {
          ...initialState,
          isLoading: true
        },
        orderActions.fetchNewOrder.rejected(new Error('test error'), '', [])
      );

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('Получение данных о заказе по номеру', () => {
    it('Проверка fetchOrderByNumber.pending', () => {
      const expectedState: TOrderState = {
        ...initialState,
        isLoadingByNumber: true,
        error: null
      };

      const resultState = orderSlice.reducer(
        {
          ...initialState,
          error: 'test error'
        },
        orderActions.fetchOrderByNumber.pending('', order.number)
      );

      expect(resultState).toEqual(expectedState);
    });

    it('Проверка fetchOrderByNumber.fulfilled', () => {
      const orderByNumberResponse = {
        success: true,
        orders: [order]
      };

      const expectedState: TOrderState = {
        ...initialState,
        orderByNumber: order,
        isLoadingByNumber: false
      };

      const resultState = orderSlice.reducer(
        {
          ...initialState,
          isLoadingByNumber: true
        },
        orderActions.fetchOrderByNumber.fulfilled(
          orderByNumberResponse,
          '',
          order.number
        )
      );

      expect(resultState).toEqual(expectedState);
    });

    it('Проверка fetchOrderByNumber.rejected', () => {
      const expectedState: TOrderState = {
        ...initialState,
        isLoadingByNumber: false,
        error: 'test error'
      };

      const resultState = orderSlice.reducer(
        {
          ...initialState,
          isLoadingByNumber: true
        },
        orderActions.fetchOrderByNumber.rejected(
          new Error('test error'),
          '',
          order.number
        )
      );

      expect(resultState).toEqual(expectedState);
    });
  });
});
