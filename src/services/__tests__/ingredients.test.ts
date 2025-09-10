import { RequestStatus } from '@utils-types';
import {
  ingredientsActions,
  ingredientsSlice,
  TIngredientsState
} from '../slices/ingredients';

describe('ingredientsSlice', () => {
  const initialState: TIngredientsState = {
    ingredients: [],
    status: RequestStatus.Idle,
    error: null
  };

  it('Проверка fetchIngredients.pending', () => {
    const expectedState: TIngredientsState = {
      ingredients: [],
      status: RequestStatus.Loading,
      error: null
    };

    const resultState = ingredientsSlice.reducer(
      {
        ...initialState,
        error: 'test error'
      },
      ingredientsActions.fetchIngredients.pending('')
    );

    expect(resultState).toEqual(expectedState);
  });

  it('Проверка fetchIngredients.fulfilled', () => {
    const ingredients = [
      {
        _id: '1',
        name: 'Ингредиент 1',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '2',
        name: 'Ингредиент 2',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ];

    const expectedState: TIngredientsState = {
      ingredients,
      status: RequestStatus.Success,
      error: null
    };

    const resultState = ingredientsSlice.reducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      ingredientsActions.fetchIngredients.fulfilled(ingredients, '')
    );

    expect(resultState).toEqual(expectedState);
  });

  it('Проверка fetchIngredients.rejected', () => {
    const expectedState: TIngredientsState = {
      ingredients: [],
      status: RequestStatus.Failed,
      error: 'test error'
    };

    const resultState = ingredientsSlice.reducer(
      {
        ...initialState,
        status: RequestStatus.Loading
      },
      ingredientsActions.fetchIngredients.rejected(new Error('test error'), '')
    );

    expect(resultState).toEqual(expectedState);
  });
});
