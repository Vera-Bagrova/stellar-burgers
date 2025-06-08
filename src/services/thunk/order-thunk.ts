import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../slices/sliceNames';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

export const fetchNewOrder = createAsyncThunk(
  `${ORDER_SLICE_NAME}/fetchNewOrder`,
  async (data: string[]) => await orderBurgerApi(data)
);

export const fetchOrderByNumber = createAsyncThunk(
  `${ORDER_SLICE_NAME}/fetchOrderbyNumber`,
  async (number: number) => await getOrderByNumberApi(number)
);
