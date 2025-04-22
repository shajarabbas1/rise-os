import { dummyEmail } from '.';

export const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    message: 'Please enter a valid email address',
  },
};

export const emailField = {
  name: 'email',
  label: 'Enter your email',
  placeHolder: dummyEmail,
  type: 'email',
  rules: emailValidation,
};

export const passwordField = {
  name: 'password',
  label: 'Enter your password',
  placeHolder: 'Enter your password',
  type: 'password',
  rules: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
    validate: {
      hasUpperCase: (value: string) =>
        /[A-Z]/.test(value) || 'Must include an uppercase letter',
      hasLowerCase: (value: string) =>
        /[a-z]/.test(value) || 'Must include a lowercase letter',
      hasSpecialChar: (value: string) =>
        /[^A-Za-z0-9]/.test(value) || 'Must include a special character',
    },
  },
  showErrors: false,
};

export const fullNameField = {
  name: 'fullName',
  label: 'Enter your full name',
  placeHolder: 'John Doe',
  type: 'text',
  rules: { required: 'Full name is required' },
  showErrors: true,
};
