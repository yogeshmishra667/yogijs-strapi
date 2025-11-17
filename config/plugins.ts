// config/env/production/plugins.js
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: '@strapi/provider-email-nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env.int('SMTP_PORT', 465),
        secure: env.bool('SMTP_SECURE', true),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('DEFAULT_FROM_EMAIL','no-reply@yourdomain.com'),
        defaultReplyTo: env('DEFAULT_REPLY_TO_EMAIL','support@yourdomain.com'),
      },
    },
  },
});
// config/env/production/plugins.js
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: '@strapi/provider-email-nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env.int('SMTP_PORT', 465),
        secure: env.bool('SMTP_SECURE', true),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('DEFAULT_FROM_EMAIL','no-reply@yourdomain.com'),
        defaultReplyTo: env('DEFAULT_REPLY_TO_EMAIL','support@yourdomain.com'),
      },
    },
  },
});
