export const emailTemplateData = [
  {
    id: '52e04009-fb84-4786-84f9-f88d3d3fe59b',
    subject: 'Welcome to Our System',
    group: 'account_creation',
    htmlContent:
      "<h1>Welcome, {{name}}!</h1>\n          <p>We're excited to have you on board. You can now start exploring all the amazing features we have to offer.</p>\n          <p>If you have any questions, feel free to reply to this email.</p>\n          <p>Cheers,<br/>The Team</p>",
    metaData:
      'Sent when a user signs up or creates an account. Contains basic onboarding message.',
    textContent:
      "Welcome, {{name}}!\n          We're excited to have you on board. You can now start exploring all the amazing features we have to offer.\n    \n          If you have any questions, feel free to reply to this email.\n    \n          Cheers,\n          The Team",
    archived: false,//
    isSystemDefault: true,
  },
];
