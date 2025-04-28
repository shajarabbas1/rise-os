export const ENDPOINT = {
  login: '/auth/login',
  signup: '/auth/signup',
  validateEmail: '/auth/validate-email',

  getEmailTemplateById: (id: string) => `email-template/${id}`,
};
