import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  burgerConstructorActions,
  burgerConstructorSlice,
  TBurgerConstructorState
} from '../slices/burgerConstructor';

describe('burgerConstructorSlice', () => {
  const initialState: TBurgerConstructorState = {
    bun: null,
    ingredients: []
  };

  const bunToAdd: TIngredient = {
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
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const ingredient_1: TConstructorIngredient = {
    id: 'test1',
    _id: '2',
    name: 'Ингредиент 2',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const ingredient_2: TConstructorIngredient = {
    id: 'test2',
    _id: '3',
    name: 'Ингредиент 3',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const prevState: TBurgerConstructorState = {
    bun: null,
    ingredients: [ingredient_1, ingredient_2]
  };

  it('[addIngredient] добавляет ингредиент в конструктор', () => {
    const resultState = burgerConstructorSlice.reducer(
      initialState,
      burgerConstructorActions.addIngredient(bunToAdd)
    );
    const { bun } = resultState;

    expect(bun).toEqual({ ...bunToAdd, id: expect.any(String) });
  });

  it('[removeIngredient] удаляет ингредиент из конструктора', () => {
    const expectedState: TBurgerConstructorState = {
      bun: null,
      ingredients: [ingredient_2]
    };
    const resultState = burgerConstructorSlice.reducer(
      prevState,
      burgerConstructorActions.removeIngredient(ingredient_1.id)
    );

    expect(resultState).toEqual(expectedState);
  });

  it('[clearConstructor] очищает конструктор', () => {
    const resultState = burgerConstructorSlice.reducer(
      prevState,
      burgerConstructorActions.clearConstructor()
    );

    expect(resultState).toEqual(initialState);
  });

  describe('проверка перемещения ингредиента', () => {
    const expectedState: TBurgerConstructorState = {
      bun: null,
      ingredients: [ingredient_2, ingredient_1]
    };

    it('[moveUp] перемещает ингредиент вверх', () => {
      const resultState = burgerConstructorSlice.reducer(
        prevState,
        burgerConstructorActions.moveUp(1)
      );

      expect(resultState).toEqual(expectedState);
    });

    it('[moveDown] перемещает ингредиент вниз', () => {
      const resultState = burgerConstructorSlice.reducer(
        prevState,
        burgerConstructorActions.moveDown(0)
      );

      expect(resultState).toEqual(expectedState);
    });
  });
});
