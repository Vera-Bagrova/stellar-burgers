import { RequestStatus, TUser } from '@utils-types';
import { TUserState, userActions, userSlice } from '../slices/user';

describe('userSlice', () => {
  const initialState: TUserState = {
    userData: null,
    isAuthChecked: false,
    status: RequestStatus.Idle,
    error: null
  };

  const testUser: TUser = { email: 'test@gmail.com', name: 'name' };

  const userRegData = {
    email: 'test@gmail.com',
    name: 'name',
    password: 'password'
  };

  const userResponse = {
    success: true,
    refreshToken: 'refreshToken',
    accessToken: 'accessToken',
    user: testUser
  };

  it('[authCheck] устанавливает флаг isAuthChecked', () => {
    const expectedState: TUserState = {
      ...initialState,
      isAuthChecked: true
    };
    const resultState = userSlice.reducer(
      initialState,
      userActions.authCheck()
    );

    expect(resultState).toEqual(expectedState);
  });

  it('[userLogout] очищает данные о пользователе', () => {
    const resultState = userSlice.reducer(
      {
        ...initialState,
        userData: testUser
      },
      userActions.userLogout()
    );

    expect(resultState).toEqual(initialState);
  });

  describe('Получение данных пользователя', () => {
    it('Проверка fetchUser.pending', () => {
      const expectedState: TUserState = {
        ...initialState,
        status: RequestStatus.Loading
      };
      const resultState = userSlice.reducer(
        {
          ...initialState,
          error: 'test error'
        },
        userActions.fetchUser.pending('')
      );

      expect(resultState).toEqual(expectedState);
    });

    it('Проверка fetchUser.fulfilled', () => {
      const expectedState: TUserState = {
        userData: userResponse.user,
        isAuthChecked: true,
        status: RequestStatus.Success,
        error: null
      };
      const resultState = userSlice.reducer(
        {
          ...initialState,
          status: RequestStatus.Loading
        },
        userActions.fetchUser.fulfilled(userResponse, '')
      );

      expect(resultState).toEqual(expectedState);
    });

    it('Проверка fetchUser.rejected', () => {
      const expectedState: TUserState = {
        userData: null,
        isAuthChecked: true,
        status: RequestStatus.Failed,
        error: 'test error'
      };
      const resultState = userSlice.reducer(
        {
          ...initialState,
          status: RequestStatus.Loading
        },
        userActions.fetchUser.rejected(new Error('test error'), '')
      );

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('Регистрация пользователя', () => {
    it('Проверка registerUser.pending', () => {
      const expectedState: TUserState = {
        ...initialState,
        status: RequestStatus.Loading
      };
      const resultState = userSlice.reducer(
        {
          ...initialState,
          error: 'test error'
        },
        userActions.registerUser.pending('', userRegData)
      );

      expect(resultState).toEqual(expectedState);
    });

    it('Проверка registerUser.fulfilled', () => {
      const expectedState: TUserState = {
        userData: userResponse.user,
        isAuthChecked: true,
        status: RequestStatus.Success,
        error: null
      };
      const resultState = userSlice.reducer(
        {
          ...initialState,
          status: RequestStatus.Loading
        },
        userActions.registerUser.fulfilled(userResponse, '', userRegData)
      );

      expect(resultState).toEqual(expectedState);
    });

    it('Проверка registerUser.rejected', () => {
      const expectedState: TUserState = {
        userData: null,
        isAuthChecked: true,
        status: RequestStatus.Failed,
        error: 'test error'
      };
      const resultState = userSlice.reducer(
        {
          ...initialState,
          status: RequestStatus.Loading
        },
        userActions.registerUser.rejected(
          new Error('test error'),
          '',
          userRegData
        )
      );

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('Вход в учетную запись', () => {
    it('Проверка loginUser.pending', () => {
      const expectedState: TUserState = {
        ...initialState,
        status: RequestStatus.Loading
      };
      const resultState = userSlice.reducer(
        {
          ...initialState,
          error: 'test error'
        },
        userActions.loginUser.pending('', userRegData)
      );

      expect(resultState).toEqual(expectedState);
    });

    it('Проверка loginUser.fulfilled', () => {
      const expectedState: TUserState = {
        userData: userResponse.user,
        isAuthChecked: true,
        status: RequestStatus.Success,
        error: null
      };
      const resultState = userSlice.reducer(
        {
          ...initialState,
          status: RequestStatus.Loading
        },
        userActions.loginUser.fulfilled(userResponse, '', userRegData)
      );

      expect(resultState).toEqual(expectedState);
    });

    it('Проверка loginUser.rejected', () => {
      const expectedState: TUserState = {
        userData: null,
        isAuthChecked: true,
        status: RequestStatus.Failed,
        error: 'test error'
      };
      const resultState = userSlice.reducer(
        {
          ...initialState,
          status: RequestStatus.Loading
        },
        userActions.loginUser.rejected(new Error('test error'), '', userRegData)
      );

      expect(resultState).toEqual(expectedState);
    });
  });

  describe('Редактирование данных пользователя', () => {
    const updateUser = {
      email: 'test@yandex.com',
      name: 'example'
    };

    const updateUserResponse = {
      success: true,
      refreshToken: 'refreshToken',
      accessToken: 'accessToken',
      user: updateUser
    };

    it('Проверка updateUser.pending', () => {
      const expectedState: TUserState = {
        ...initialState,
        userData: testUser,
        status: RequestStatus.Loading
      };
      const resultState = userSlice.reducer(
        {
          ...initialState,
          userData: testUser,
          error: 'test error'
        },
        userActions.updateUser.pending('', updateUser)
      );

      expect(resultState).toEqual(expectedState);
    });

    it('Проверка updateUser.fulfilled', () => {
      const expectedState: TUserState = {
        userData: updateUserResponse.user,
        isAuthChecked: true,
        status: RequestStatus.Success,
        error: null
      };

      const resultState = userSlice.reducer(
        {
          ...initialState,
          userData: testUser,
          status: RequestStatus.Loading
        },
        userActions.updateUser.fulfilled(updateUserResponse, '', updateUser)
      );

      expect(resultState).toEqual(expectedState);
    });

    it('Проверка updateUser.rejected', () => {
      const expectedState: TUserState = {
        userData: testUser,
        isAuthChecked: true,
        status: RequestStatus.Failed,
        error: 'test error'
      };

      const resultState = userSlice.reducer(
        {
          ...initialState,
          userData: testUser,
          status: RequestStatus.Loading
        },
        userActions.updateUser.rejected(new Error('test error'), '', updateUser)
      );

      expect(resultState).toEqual(expectedState);
    });
  });
});
