/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from 'redux-saga/effects';
// import { userActions } from '../actions/user.action';
import { userActions } from '../slices/user.slice';
import { loginService, signUp, setUserNameAndPasword } from '@/services/auth';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface IUser {
  isAdmin: boolean;
  [key: string]: any;
}
interface IFormData {
  fullName: string;
  password: string;
  email: string;
}
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

function* loginUserSaga(action: PayloadAction<LoginRequestPayload>) {
  try {
    const { email, password, onSuccess } = action.payload;

    const response: AxiosResponse<IUser> = yield call(loginService, {
      email,
      password,
    });

    const data = response.data;

    yield put(
      userActions.loginSuccess({
        user: data,
      }),
    );

    if (onSuccess) {
      yield call(onSuccess);
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      'Unexpected login error';

    yield put(userActions.loginFailure(errorMessage));

    if (action.payload.onError) {
      yield call(action.payload.onError, errorMessage);
    }
  }
}

function* validateEmailSaga(
  action: PayloadAction<EmailValidationRequestPayload>,
) {
  try {
    const { email, onSuccess, onError } = action.payload;

    const response: AxiosResponse<any> = yield call(signUp, action.payload);
    yield put(userActions.setUserData(response.data));

    if (response.data.data === true) {
      // Email already exists
      const errorMessage =
        'This email is already registered. Please use another one.';
      toast.error(errorMessage);
      yield put(userActions.validateEmailFailure(errorMessage));

      if (onError) yield call(onError, errorMessage);
      return;
    }

    // Email is available
    yield put(userActions.validateEmailSuccess(email));
    if (onSuccess) yield call(onSuccess);
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      'Email validation failed';
    toast.error(errorMessage);
    yield put(userActions.validateEmailFailure(errorMessage));
  }
}

function* setPasswordAndNameService(action: PayloadAction<IFormData>) {
  try {
    const { fullName, password, email } = action.payload;

    const response: AxiosResponse<any> = yield call(setUserNameAndPasword, {
      fullName,
      password,
      email,
    });
    yield put(userActions.setUserData(response.data.data));
  } catch (error: any) {
    console.log('this is a error', error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      'Email validation failed';

    yield put(userActions.setError(errorMessage));
  }
}

export function* userSaga() {
  yield takeLatest(userActions.loginRequest.type, loginUserSaga);
  yield takeLatest(userActions.validateEmailRequest.type, validateEmailSaga);
  yield takeLatest(
    userActions.setUserNameAndPaswordRequest.type,
    setPasswordAndNameService,
  );
}
