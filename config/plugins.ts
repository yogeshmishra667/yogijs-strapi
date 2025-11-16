export default ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env.int("SMTP_PORT", 465),
        secure: true,
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        // secure, tls, etc. depending on provider
      },
      settings: {
        defaultFrom: env("DEFAULT_FROM_EMAIL"),
        defaultReplyTo: env("DEFAULT_REPLY_TO_EMAIL"),
      },
    },
  },
});
