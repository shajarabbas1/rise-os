const EmailTemplateSeedData = [
  // welcome email
  {
    id: '52e04009-fb84-4786-84f9-f88d3d3fe59b',
    subject: 'Welcome to Our System',
    group: 'account_creation',
    htmlContent: `<h1>Welcome, {{fullName}}!</h1>
          <p>We're excited to have you on board. You can now start exploring all the amazing features we have to offer.</p>
          <p>If you have any questions, feel free to reply to this email.</p>
          <p>Cheers,<br/>The Team</p>`,
    textContent: `Welcome, {{name}}!
          We're excited to have you on board. You can now start exploring all the amazing features we have to offer.
    
          If you have any questions, feel free to reply to this email.
    
          Cheers,
          The Team`,
    metaData:
      'Sent when a user signs up or creates an account. Contains basic onboarding message.',
    archived: false,
    isSystemDefault: true,
  },
];

export default EmailTemplateSeedData;
