export const ENDPOINT = {
  login: '/auth/login',
  signup: '/auth/signup',
  validateEmail: '/auth/validate-email',
  validateToken:"/auth/validate-token",

  emailTemplates: 'email-template',
  getEmailTemplateById: (id: string) => `email-template/${id}`,
};
