import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { ORDERS_SLICE_NAME } from './sliceNames';
import { fetchOrders } from '../thunk/orders-thunk';

type TOrdersState = {
  orders: TOrder[];
  status: RequestStatus;
  error?: string | null;
};

const initialState: TOrdersState = {
  orders: [],
  status: RequestStatus.Idle,
  error: null
};

export const ordersSlice = createSlice({
  name: ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    ordersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message;
      });
  }
});

export const ordersSelectors = ordersSlice.selectors;
export const ordersActions = { ...ordersSlice.actions, fetchOrders };
