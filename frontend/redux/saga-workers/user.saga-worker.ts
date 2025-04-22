/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from 'redux-saga/effects';
import { userActions } from '../actions/user.action';
import { loginService, validateEmailService } from '@/services/auth';
import { AxiosResponse } from 'axios';

interface IUser {
  isAdmin: boolean;
  [key: string]: any;
}

function* loginUserSaga(action: ReturnType<typeof userActions.login.request>) {
  try {
    const { email, password, onSuccess } = action.payload;

    const response: AxiosResponse<IUser> = yield call(loginService, {
      email,
      password,
    });

    const data = response.data;

    yield put(
      userActions.login.success({
        user: data.data,
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

    yield put(userActions.login.failure(errorMessage));

    if (action.payload.onError) {
      yield call(action.payload.onError, errorMessage);
    }
  }
}

function* validateEmailSaga(
  action: ReturnType<typeof userActions.validateEmail.request>,
) {
  try {
    const { email, onSuccess, onError } = action.payload;

    const response: AxiosResponse<{ data: boolean }> = yield call(
      validateEmailService,
      action.payload,
    );

    if (response.data.data === true) {
      // Email already exists
      const errorMessage =
        'This email is already registered. Please use another one.';

      yield put(userActions.validateEmail.failure(errorMessage));

      if (onError) yield call(onError, errorMessage);
      return;
    }

    // Email is available
    yield put(userActions.validateEmail.success(email));
    if (onSuccess) yield call(onSuccess);
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      'Email validation failed';

    yield put(userActions.validateEmail.failure(errorMessage));
  }
}

export function* userSaga() {
  yield takeLatest(userActions.login.request.type, loginUserSaga);
  yield takeLatest(userActions.validateEmail.request.type, validateEmailSaga);
}
