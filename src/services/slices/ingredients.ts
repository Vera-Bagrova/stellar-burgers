import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from './sliceNames';
import { fetchIngredients } from '../thunk/ingredients-thunk';

type TIngredientsState = {
  ingredients: TIngredient[];
  status: RequestStatus;
  error?: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  status: RequestStatus.Idle,
  error: null
};

export const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    statusSelector: (state) => state.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message;
      });
  }
});

export const ingredientsActions = {
  ...ingredientsSlice.actions,
  fetchIngredients
};
export const ingredientsSelectors = ingredientsSlice.selectors;
