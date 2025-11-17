/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * src/api/user-detail/content-types/user-detail/lifecycles.ts
 *
 * - Must export a plain object (default export) with lifecycle handlers.
 * - Use strapi.plugin('email').service('email').send(...) for sending.
 * - Add logs so you can see what's happening in Strapi Cloud logs.
 */

declare const strapi: any;

export default {
  async afterCreate(event: any) {
    try {
      const { result } = event;
      const { name, email, subject, message } = result || {};

      strapi.log.info(`[lifecycles:user-detail] afterCreate fired — name:${name || '—'} email:${email || '—'}`);

      const safeMessage = (message || '').toString().replace(/\n/g, '<br/>');

      // 1) Send notification to you (admin)
      try {
        await strapi.plugin('email').service('email').send({
          to: process.env.DEFAULT_FROM_EMAIL,
          from: process.env.DEFAULT_FROM_EMAIL,
          replyTo: email || undefined,
          subject: `New contact form submission from ${name || 'Unknown'}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name || '—'}</p>
            <p><strong>Email:</strong> ${email || '—'}</p>
            <p><strong>Subject:</strong> ${subject || '—'}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          `,
        });
        strapi.log.info('[lifecycles:user-detail] admin notification email sent');
      } catch (err) {
        strapi.log.error('[lifecycles:user-detail] Failed to send admin notification email', err);
      }

      // 2) Send confirmation to user (only if email exists)
      if (email) {
        try {
          await strapi.plugin('email').service('email').send({
            to: email,
            from: process.env.DEFAULT_FROM_EMAIL,
            subject: 'Thank you for contacting me ✔',
            html: `
              <p>Hi <strong>${name || ''}</strong>,</p>
              <p>Thanks for reaching out. I've received your message and will reply shortly.</p>
              <p><strong>Your message:</strong></p>
              <p>${safeMessage}</p>
              <br/>
              <p>Best regards,<br/>Yogesh Mishra</p>
            `,
          });
          strapi.log.info('[lifecycles:user-detail] confirmation email to user sent');
        } catch (err) {
          strapi.log.error('[lifecycles:user-detail] Failed to send confirmation email to user', err);
        }
      } else {
        strapi.log.warn('[lifecycles:user-detail] User email missing — skipped confirmation email');
      }
    } catch (err) {
      strapi.log.error('[lifecycles:user-detail] afterCreate top-level handler crashed', err);
    }
  },
};
