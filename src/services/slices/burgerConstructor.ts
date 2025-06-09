import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null; // выбранная булочка
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload; // Если добавляется булочка, заменяем текущую
        } else {
          // другой ингредиент добавляем в список
          state.ingredients.push(action.payload);
        }
      },
      // Присваимваем уникальный id ингредиенту перед добавлением
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      // Сохраняем перемещаемый ингредиент
      const movingIngredient = state.ingredients[index];
      // Перемещаем его на позицию выше
      state.ingredients[index] = state.ingredients[index - 1];
      state.ingredients[index - 1] = movingIngredient;
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const movingIngredient = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index + 1];
      state.ingredients[index + 1] = movingIngredient;
    }
  },
  selectors: {
    bunSelector: (state) => state.bun,
    bunIdSelector: (state) => state.bun?._id,
    ingredientsSelector: (state) => state.ingredients
  }
});

export const burgerConstructorSelectors = burgerConstructorSlice.selectors;
export const burgerConstructorActions = burgerConstructorSlice.actions;
