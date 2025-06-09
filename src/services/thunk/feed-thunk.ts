import { createAsyncThunk } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from '../slices/sliceNames';
import { getFeedsApi } from '@api';

export const fetchFeeds = createAsyncThunk(
  `${FEED_SLICE_NAME}/fetchFeeds`,
  getFeedsApi
);
