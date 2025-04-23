import { setUserNameAndPasword } from '@/services/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
export interface IFormData {
  fullName: string;
  password: string;
  email: string;
}
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

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: state => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action: PayloadAction<LoginSuccessPayload>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest: state => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: state => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    validateEmailRequest: (
      state,
      action: PayloadAction<EmailValidationRequestPayload>,
    ) => {
      state.error = null;
      state.validatedEmail = null;
    },
    validateEmailSuccess: (state, action: PayloadAction<string>) => {
      state.validatedEmail = action.payload;
    },
    validateEmailFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setUserNameAndPaswordRequest: (state, action: PayloadAction<IFormData>) => {
      state.loading = true;
      state.error = null;
    },
    setUserData: (state, action: PayloadAction<LoginSuccessPayload>) => {
      state.user = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const userActions = user.actions;
export const userReducer = user.reducer;
