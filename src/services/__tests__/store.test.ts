import { expect } from '@jest/globals';
import store, { rootReducer } from '../store';

describe('проверка настройки и работы rootReducer', () => {
  it('вызов rootReducer с undefined состоянием возвращает корректное начальное состояние', () => {
    const initialState = store.getState();

    // Вызываем rootReducer с undefined состоянием и тестовым экшеном
    const state = rootReducer(undefined, { type: '@@init' });

    // Проверяем, что результат совпадает с initialState
    expect(state).toEqual(initialState);
  });

  it('вызов rootReducer с неизвестным экшеном возвращает корректное начальное состояние', () => {
    const initialState = store.getState();
    
    // Создаем неизвестный экшен
    const action = {
      type: 'UNKNOWN_ACTION'
    };

    // Проверяем, что состояние не изменилось после обработки неизвестного экшена
    const state = rootReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});