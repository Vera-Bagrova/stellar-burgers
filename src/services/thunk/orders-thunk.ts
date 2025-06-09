import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDERS_SLICE_NAME } from '../slices/sliceNames';
import { getOrdersApi } from '@api';

// получение списка заказов пользователя
export const fetchOrders = createAsyncThunk(
  `${ORDERS_SLICE_NAME}/fetchOrders`,
  getOrdersApi
);
