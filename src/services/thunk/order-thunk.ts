import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../slices/sliceNames';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

export const fetchNewOrder = createAsyncThunk(
  `${ORDER_SLICE_NAME}/fetchNewOrder`,
  orderBurgerApi
);

export const fetchOrderByNumber = createAsyncThunk(
  `${ORDER_SLICE_NAME}/fetchOrderbyNumber`,
  getOrderByNumberApi
);
