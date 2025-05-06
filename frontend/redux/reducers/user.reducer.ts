/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer } from '@reduxjs/toolkit';
import { userActions } from '../actions/user.action';

export interface IUserState {
  user: any;
  loading: boolean;
  error: string | null;
  validatedEmail: string | null;
}

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
  validatedEmail: null,
};

export const userReducer = createReducer(initialState, builder => {
  builder
    // Login flow
    .addCase(userActions.login.request, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(userActions.login.success, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    })
    .addCase(userActions.login.failure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Email validation flow
    .addCase(userActions.validateEmail.request, state => {
      state.error = null;
      state.validatedEmail = null;
    })
    .addCase(userActions.validateEmail.success, (state, action) => {
      state.validatedEmail = action.payload;
    })
    .addCase(userActions.validateEmail.failure, (state, action) => {
      state.error = action.payload;
      state.validatedEmail = null;
    })

    // Logout flow
    .addCase(userActions.logout.request, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(userActions.logout.success, state => {
      state.loading = false;
      state.user = null;
      state.error = null;
    })
    .addCase(userActions.logout.failure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
