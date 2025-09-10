import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { USER_SLICE_NAME } from './sliceNames';
import {
  fetchUser,
  loginUser,
  logout,
  registerUser,
  updateUser
} from '../thunk/user-thunk';

export interface TUserState {
  userData: TUser | null;
  isAuthChecked: boolean; // была ли совершена проверка наличия пользователя по токену
  status: RequestStatus;
  error?: string | null;
}

const initialState: TUserState = {
  userData: null,
  isAuthChecked: false,
  status: RequestStatus.Idle,
  error: null
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.userData = null;
    }
  },
  selectors: {
    userDataSelector: (state) => state.userData,
    isAuthCheckedSelector: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.userData = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.isAuthChecked = true;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.userData = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.isAuthChecked = true;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.userData = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.isAuthChecked = true;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.userData = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.isAuthChecked = true;
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = RequestStatus.Success;
        state.userData = initialState.userData;
        state.isAuthChecked = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.isAuthChecked = true;
        state.error = action.error.message;
      });
  }
});

export const userSelectors = userSlice.selectors;
export const userActions = {
  ...userSlice.actions,
  fetchUser,
  registerUser,
  loginUser,
  updateUser,
  logout
};
