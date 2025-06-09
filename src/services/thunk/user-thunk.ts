import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../slices/sliceNames';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { userActions } from '../slices/user';

// получение информации о текущем пользователе (проверяет пользователя по токену)
export const fetchUser = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchUser`,
  getUserApi
);

export const registerUser = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async (dataUser: TRegisterData) => {
    const data = await registerUserApi(dataUser);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  async (dataUser: TLoginData) => {
    const data = await loginUserApi(dataUser);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  updateUserApi
);

export const logout = createAsyncThunk(
  `${USER_SLICE_NAME}/logout`,
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear(); // очищаем refreshToken
        deleteCookie('accessToken'); // очищаем accessToken
        dispatch(userActions.userLogout()); // удаляем пользователя из хранилища
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);
