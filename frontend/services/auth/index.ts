import { ENDPOINT } from '@/constants/api.constants';
import axiosInstance from '../axios';

export interface ISetUserNameAndPasword {
  email: string;
  fullName: string;
  password: string;
}
export interface EmailValidationPayload {
  email: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export const loginService = async (payload: ILoginPayload) => {
  return await axiosInstance.post(ENDPOINT.login, payload);
};

// check if the user exist with the provided email
export const signUp = async (payload: EmailValidationPayload) => {
  return await axiosInstance.post(ENDPOINT.signup, payload);
};

// set user name and password and get the token from the backend - work same as signup
export const setUserNameAndPasword = async (
  payload: ISetUserNameAndPasword,
) => {
  return await axiosInstance.put(ENDPOINT.setEmailAndPassword, payload);
};
