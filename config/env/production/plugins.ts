module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: env('SMTP_USERNAME'), // Your Gmail address
          pass: env('SMTP_PASSWORD'), // Your Gmail app password
        },
      },
      settings: {
        defaultFrom: env('DEFAULT_FROM_EMAIL', 'your-email@gmail.com'),
        defaultReplyTo: env('DEFAULT_REPLY_TO_EMAIL', 'your-email@gmail.com'),
      },
    },
  },
});