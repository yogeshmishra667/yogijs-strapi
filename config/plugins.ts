// config/plugins.js
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: '@strapi/provider-email-nodemailer', // exact scoped package name
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env.int('SMTP_PORT', 465),            // 465 = SSL, 587 = STARTTLS
        secure: env.bool('SMTP_SECURE', true),     // true for 465
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),              // Gmail app password if using Gmail + 2FA
        },
        // Optional STARTTLS mode example:
        // secure: false,
        // requireTLS: env.bool('SMTP_REQUIRE_TLS', true),
        // tls: { rejectUnauthorized: env.bool('SMTP_TLS_REJECT_UNAUTHORIZED', true) },
      },
      settings: {
        defaultFrom: env('DEFAULT_FROM_EMAIL', 'no-reply@yourdomain.com'),
        defaultReplyTo: env('DEFAULT_REPLY_TO_EMAIL', 'support@yourdomain.com'),
      },
    },
  },
});
