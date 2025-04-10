import { ValueTransformer } from 'typeorm';

/**
 * Function to convert a string to lowercase, safely handling null/undefined values
 */
function toLowerCase(
  value: string | null | undefined,
): string | null | undefined {
  return value?.toLowerCase();
}

/**
 * Reusable transformer to always store values in lowercase
 */
export const toLowerCaseTransformer: ValueTransformer = {
  to: toLowerCase,
  from: toLowerCase,
};

// to validate the email
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
