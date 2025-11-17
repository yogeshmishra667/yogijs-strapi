/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * src/api/user-detail/content-types/user-detail/lifecycles.ts
 *
 * - Idempotent afterCreate lifecycle (uses strapi.store)
 * - Modern, responsive HTML templates with embedded logo
 * - Logo is hard-coded from your Google Drive file (preview URL)
 *
 * NOTE: If the Drive link stops showing in some email clients, upload the image
 * to a public CDN (S3/Cloudinary) and replace LOGO_URL with that URL.
 */

declare const strapi: any;

// Direct Google Drive preview URL (hard-coded as requested)
const LOGO_URL =
  'https://drive.google.com/uc?export=view&id=1a41Fxnl2dhf-CHpKXHzZNNraFztC2mSA';

function adminHtmlTemplate({ name, email, subject, message, logoUrl }: any) {
  const safeMessage = (message || '').replace(/\n/g, '<br/>');
  const logoSection = logoUrl
    ? `<td style="padding:18px 0;text-align:left"><img src="${logoUrl}" alt="logo" width="120" style="display:block;border:0;outline:none;text-decoration:none"/></td>`
    : '';
  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>New Contact Submission</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 16px">
      <tr>
        <td align="center">
          <table role="presentation" width="680" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 24px rgba(15,23,42,0.08)">
            <tr>
              <td style="padding:20px 28px;border-bottom:1px solid #eef2f7">
                <table width="100%" role="presentation">
                  <tr>
                    ${logoSection}
                    <td style="text-align:right;padding-left:12px">
                      <h3 style="margin:0;color:#0f172a;font-weight:700;font-size:16px">New Contact Form</h3>
                      <p style="margin:2px 0 0;color:#475569;font-size:13px">Received a new submission</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:28px">
                <h2 style="margin:0 0 12px;color:#0f172a;font-size:18px">${subject || 'Contact form submission'}</h2>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px">
                  <tr>
                    <td style="vertical-align:top;padding:8px 12px;background:#f8fafc;border-radius:8px">
                      <strong style="display:block;color:#0f172a">Name</strong>
                      <div style="color:#475569">${name || '—'}</div>
                    </td>
                    <td style="vertical-align:top;padding:8px 12px;background:#f8fafc;border-radius:8px">
                      <strong style="display:block;color:#0f172a">Email</strong>
                      <div style="color:#475569">${email || '—'}</div>
                    </td>
                  </tr>
                </table>

                <div style="margin-top:18px;padding:16px;background:#fff7ed;border-left:4px solid #f59e0b;border-radius:8px">
                  <strong style="display:block;color:#92400e;margin-bottom:6px">Message</strong>
                  <div style="color:#6b7280;line-height:1.5">${safeMessage}</div>
                </div>

                <div style="margin-top:20px;display:flex;gap:8px;align-items:center">
                  <a href="mailto:${email}" style="display:inline-block;padding:10px 16px;background:#0ea5a4;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600">Reply: ${email}</a>
                  <span style="color:#94a3b8;font-size:13px">ID: <strong style="color:#0f172a">${idRandom()}</strong></span>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 28px;border-top:1px solid #eef2f7;background:#fbfdff">
                <p style="margin:0;color:#64748b;font-size:13px">You’re receiving this because someone submitted the contact form on your site.</p>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 28px;background:#0f172a;color:#ffffff;text-align:center;font-size:13px">
                <div style="opacity:.9">Yogesh Mishra • <span style="color:#9ca3af">yogijs.tech</span></div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

function userHtmlTemplate({ name, message, logoUrl }: any) {
  const safeMessage = (message || '').replace(/\n/g, '<br/>');
  const logoImg = logoUrl ? `<img src="${logoUrl}" alt="logo" width="110" style="display:block;margin:0 auto 8px"/>` : '';
  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>Thanks for contacting</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 24px rgba(15,23,42,0.06)">
            <tr>
              <td style="padding:28px;text-align:center">
                ${logoImg}
                <h1 style="margin:6px 0 4px;font-size:20px;color:#0f172a">Thanks, ${name || 'there'} 👋</h1>
                <p style="margin:0;color:#64748b;font-size:14px">We got your message — I’ll get back to you within 24–48 hours.</p>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 28px">
                <div style="padding:16px;border-radius:10px;background:#f8fafc;color:#475569">
                  <strong style="display:block;margin-bottom:8px;color:#0f172a">Here’s what we received</strong>
                  <div style="line-height:1.6">${safeMessage}</div>
                </div>

                <div style="margin-top:18px;text-align:center">
                  <a href="https://yogijs.tech" style="display:inline-block;padding:10px 18px;border-radius:10px;background:#0ea5a4;color:white;text-decoration:none;font-weight:600">Visit portfolio</a>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 28px;border-top:1px solid #eef2f7;background:#fbfdff;text-align:center;color:#94a3b8;font-size:13px">
                <div>Want to update your message? Reply to this email and I’ll see it.</div>
                <div style="margin-top:8px">© ${new Date().getFullYear()} Yogesh Mishra — <a href="https://yogijs.tech" style="color:#0ea5a4;text-decoration:none">yogijs.tech</a></div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

function idRandom() {
  return Math.floor(Math.random() * 899999 + 100000);
}

export default {
  async afterCreate(event: any) {
    const { result } = event || {};
    const id = result?.id;
    const name = result?.name ?? 'Guest';
    const email = result?.email ?? '';
    const subject = result?.subject ?? 'Contact Form';
    const message = (result?.message ?? '').toString();
    const logoUrl = LOGO_URL;

    if (!id) {
      strapi.log.warn('[lifecycles:user-detail] missing id — skipping');
      return;
    }

    const store = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'user-detail-notifs',
    });

    const key = `emailed:${id}`;

    try {
      const already = await store.get({ key });
      if (already) {
        strapi.log.info(`[lifecycles:user-detail] duplicate run — skipping id:${id}`);
        return;
      }
    } catch (err) {
      strapi.log.error('[lifecycles:user-detail] store.get failed (continuing):', err);
    }

    // Build and send emails
    try {
      // Admin notification
      await strapi.plugin('email').service('email').send({
        to: process.env.DEFAULT_FROM_EMAIL,
        from: process.env.DEFAULT_FROM_EMAIL,
        replyTo: email || undefined,
        subject: `New contact: ${name} — ${subject}`,
        html: adminHtmlTemplate({ name, email, subject, message, logoUrl }),
      });
      strapi.log.info(`[lifecycles:user-detail] admin email sent for id:${id}`);

      // Confirmation to user
      if (email) {
        await strapi.plugin('email').service('email').send({
          to: email,
          from: process.env.DEFAULT_FROM_EMAIL,
          subject: `Thanks for contacting — I’ll reply soon`,
          html: userHtmlTemplate({ name, message, logoUrl }),
        });
        strapi.log.info(`[lifecycles:user-detail] confirmation email sent to user for id:${id}`);
      } else {
        strapi.log.warn(`[lifecycles:user-detail] no user email provided for id:${id} — skipped user confirmation`);
      }

      // Mark sent
      try {
        await store.set({ key, value: true });
        strapi.log.info(`[lifecycles:user-detail] marked id:${id} as emailed`);
      } catch (err) {
        strapi.log.error('[lifecycles:user-detail] store.set failed after sends:', err);
      }
    } catch (err) {
      strapi.log.error('[lifecycles:user-detail] email flow failed:', err);
    }
  },
};
