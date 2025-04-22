// user.actions.ts
import { createAction } from '@reduxjs/toolkit';

export interface EmailValidationRequestPayload {
  email: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface LoginRequestPayload {
  email: string;
  password: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface LoginSuccessPayload {
  user: any;
}

export const userActions = {
  login: {
    request: createAction<LoginRequestPayload>('user/loginRequest'),
    success: createAction<LoginSuccessPayload>('user/loginSuccess'),
    failure: createAction<string>('user/loginFailure'),
  },

  logout: {
    request: createAction('user/logoutRequest'),
    success: createAction('user/logoutSuccess'),
    failure: createAction<string>('user/logoutFailure'),
  },

  validateEmail: {
    request: createAction<EmailValidationRequestPayload>(
      'user/validateEmailRequest',
    ),
    success: createAction<string>('user/validateEmailSuccess'), // saves valid email
    failure: createAction<string>('user/validateEmailFailure'), // contains error message
  },
};
