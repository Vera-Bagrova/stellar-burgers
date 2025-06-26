import { RequestStatus, TOrder } from '@utils-types';
import { ordersActions, ordersSlice, TOrdersState } from '../slices/orders';

describe('ordersSlice', () => {
  const initialState: TOrdersState = {
    orders: [],
    status: RequestStatus.Idle,
    error: null
  };

  it('Проверка fetchOrders.pending', () => {
    const expectedState: TOrdersState = {
      ...initialState,
      status: RequestStatus.Loading,
      error: null
    };

    const resultState = ordersSlice.reducer(
      {
        ...initialState,
        error: 'test error'
      },
      ordersActions.fetchOrders.pending('')
    );

    expect(resultState).toEqual(expectedState);
  });

  it('Проверка fetchOrders.fulfilled', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        status: 'done',
        name: 'test order',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        number: 111222,
        ingredients: ['ingredient 1', 'ingredient 2']
      }
    ];

    const expectedState: TOrdersState = {
      ...initialState,
      orders,
      status: RequestStatus.Success
    };

    const resultState = ordersSlice.reducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      ordersActions.fetchOrders.fulfilled(orders, '')
    );

    expect(resultState).toEqual(expectedState);
  });

  it('Проверка fetchOrders.rejected', () => {
    const expectedState: TOrdersState = {
      ...initialState,
      status: RequestStatus.Failed,
      error: 'test error'
    };

    const resultState = ordersSlice.reducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      ordersActions.fetchOrders.rejected(new Error('test error'), '')
    );

    expect(resultState).toEqual(expectedState);
  });
});
