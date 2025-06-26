import { TOrder } from '@utils-types';
import { ORDER_SLICE_NAME } from './sliceNames';
import { createSlice } from '@reduxjs/toolkit';
import { fetchNewOrder, fetchOrderByNumber } from '../thunk/order-thunk';

export type TOrderState = {
  order: TOrder | null; // Текущий заказ, отображаемый в модальном окне
  orderByNumber: TOrder | null; // данные о заказе по номеру
  isLoading: boolean;
  isLoadingByNumber: boolean;
  error?: string | null;
};

const initialState: TOrderState = {
  order: null,
  orderByNumber: null,
  isLoading: false,
  isLoadingByNumber: false,
  error: null
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState: initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    orderSelector: (state) => state.order,
    orderByNumberSelector: (state) => state.orderByNumber,
    orderRequestSelector: (state) => state.isLoading
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
      })
      .addCase(fetchNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoadingByNumber = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoadingByNumber = false;
        state.orderByNumber = action.payload.orders[0];
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoadingByNumber = false;
        state.error = action.error.message;
      });
  }
});

export const orderSelectors = orderSlice.selectors;
export const orderActions = {
  ...orderSlice.actions,
  fetchNewOrder,
  fetchOrderByNumber
};
