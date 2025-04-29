export const ENDPOINT = {
  login: '/auth/login',
  signup: '/auth/signup',
  validateEmail: '/auth/validate-email',

  emailTemplates: 'email-template',
  getEmailTemplateById: (id: string) => `email-template/${id}`,
};
