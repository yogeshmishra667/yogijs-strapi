/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Refined, modern + accessible email templates (admin + user)
 * Place at: src/api/user-detail/content-types/user-detail/lifecycles.ts
 *
 * Keep DEFAULT_FROM_EMAIL in env. LOGO_URL is hard-coded to your Drive image (can replace).
 */

declare const strapi: any;
const LOGO_URL = 'https://drive.google.com/uc?export=view&id=1a41Fxnl2dhf-CHpKXHzZNNraFztC2mSA';

const LOCK_STALE_MS = 2 * 60 * 1000; // 2 minutes — tune if needed

function now() {
  return Date.now();
}


// Colors & typography tokens (easy to tweak)
const TOKENS = {
  bg: '#f6f7fb',
  card: '#ffffff',
  muted: '#6b7280',
  primary: '#0ea5a4',
  primaryText: '#ffffff',
  accent: '#f59e0b',
  heading: '#0f172a',
  subtle: '#eef2f6',
};

// Preheader helper
function preheader(text: string) {
  return `<span style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${text}</span>`;
}

function adminHtmlTemplate({ id, name, email, subject, message, logoUrl }: any) {
  const safeMessage = (message || '').replace(/\n/g, '<br/>') || '—';
  const headPre = preheader(`New contact from ${name || 'Guest'} — ${subject || ''}`);

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Contact Form</title>
</head>
<body style="margin:0;background:${TOKENS.bg};font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${TOKENS.heading};-webkit-font-smoothing:antialiased;">
  ${headPre}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="680" cellpadding="0" cellspacing="0" style="max-width:680px;background:${TOKENS.card};border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(15,23,42,0.06)">
          <tr>
            <td style="padding:20px 24px;border-bottom:1px solid ${TOKENS.subtle};display:flex;align-items:center;gap:12px">
              <img src="${logoUrl}" alt="Yogesh Mishra Logo" width="72" style="height:auto;display:block;border:0;outline:none;text-decoration:none;border-radius:8px"/>
              <div style="flex:1">
                <div style="font-weight:700;font-size:16px;color:${TOKENS.heading};margin-bottom:2px">New Contact Form</div>
                <div style="color:${TOKENS.muted};font-size:13px">A new submission was received</div>
              </div>
              <div style="text-align:right;color:${TOKENS.muted};font-size:12px">ID: <strong style="color:${TOKENS.heading}">${id}</strong></div>
            </td>
          </tr>

          <tr>
            <td style="padding:22px">
              <h2 style="margin:0 0 12px;font-size:18px;color:${TOKENS.heading};font-weight:700">${subject || 'Contact form submission'}</h2>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;border-collapse:separate;row-gap:8px">
                <tr>
                  <td style="vertical-align:top;padding:10px 12px;border-radius:8px;background:#fbfdff;border:1px solid ${TOKENS.subtle};width:48%;font-size:14px">
                    <div style="font-weight:600;color:${TOKENS.heading};margin-bottom:6px">Name</div>
                    <div style="color:${TOKENS.muted}">${name || '—'}</div>
                  </td>
                  <td style="vertical-align:top;padding:10px 12px;border-radius:8px;background:#fbfdff;border:1px solid ${TOKENS.subtle};width:48%;font-size:14px">
                    <div style="font-weight:600;color:${TOKENS.heading};margin-bottom:6px">Email</div>
                    <div style="color:${TOKENS.muted}"><a href="mailto:${email}" style="color:${TOKENS.primary};text-decoration:none">${email || '—'}</a></div>
                  </td>
                </tr>
              </table>

              <div style="margin-top:18px;padding:16px;border-radius:10px;background:linear-gradient(90deg,#fff 0%, #fffbf5 100%);border-left:4px solid ${TOKENS.accent};color:#3b3b3b;line-height:1.6;font-size:14px">
                <div style="font-weight:600;color:#7c3f00;margin-bottom:8px">Message</div>
                <div>${safeMessage}</div>
              </div>

              <div style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap;align-items:center">
                <a href="mailto:${email}" style="display:inline-block;background:${TOKENS.primary};color:${TOKENS.primaryText};padding:10px 16px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px">Reply: ${email || '—'}</a>
                <div style="color:${TOKENS.muted};font-size:13px">Received: <strong style="color:${TOKENS.heading}">${new Date().toLocaleString()}</strong></div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 22px;border-top:1px solid ${TOKENS.subtle};background:#fbfdff;font-size:13px;color:${TOKENS.muted};text-align:center">
              You’re receiving this because someone submitted the contact form on your site.
            </td>
          </tr>

          <tr>
            <td style="padding:14px 22px;background:${TOKENS.heading};color:${TOKENS.primaryText};text-align:center;font-size:13px;">
              <div style="opacity:0.95">© ${new Date().getFullYear()} Yogesh Mishra — <a href="https://yogijs.tech" style="color:inherit;text-decoration:underline">${'yogijs.tech'}</a></div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function userHtmlTemplate({ name, message, logoUrl }: any) {
  const safeMessage = (message || '').replace(/\n/g, '<br/>') || '—';
  const headPre = preheader('Thanks for contacting — I’ll get back to you within 24–48 hours');

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Thanks for contacting</title>
</head>
<body style="margin:0;background:${TOKENS.bg};font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${TOKENS.heading};-webkit-font-smoothing:antialiased;">
  ${headPre}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:${TOKENS.card};border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(15,23,42,0.06)">
          <tr>
            <td style="padding:28px 24px;text-align:center">
              <img src="${logoUrl}" alt="Yogesh Mishra Logo" width="84" style="height:auto;display:block;border:0;outline:none;text-decoration:none;margin:0 auto 12px;border-radius:8px"/>
              <h1 style="margin:0 0 6px;font-size:20px;color:${TOKENS.heading};font-weight:700">Thanks, ${name || 'there'} 👋</h1>
              <p style="margin:0;color:${TOKENS.muted};font-size:14px">I got your message. I’ll reply within 24–48 hours.</p>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 22px">
              <div style="padding:16px;border-radius:10px;background:#fbfdff;border:1px solid ${TOKENS.subtle};color:${TOKENS.muted};font-size:14px;line-height:1.6">
                <div style="font-weight:700;color:${TOKENS.heading};margin-bottom:8px">Here’s what I received</div>
                <div>${safeMessage}</div>
              </div>

              <div style="margin-top:18px;text-align:center">
                <a href="https://yogijs.tech" style="display:inline-block;padding:10px 18px;border-radius:10px;background:${TOKENS.primary};color:${TOKENS.primaryText};text-decoration:none;font-weight:700;">Visit portfolio</a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 22px;border-top:1px solid ${TOKENS.subtle};background:#fbfdff;text-align:center;color:${TOKENS.muted};font-size:13px">
              Reply to this email to update your message — or visit <a href="https://yogijs.tech" style="color:${TOKENS.primary};text-decoration:none">yogijs.tech</a>.
              <div style="margin-top:8px">© ${new Date().getFullYear()} Yogesh Mishra</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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

    // Try to claim
    try {
      const current = await store.get({ key });
      if (current && current.status === 'done') {
        strapi.log.info(`[lifecycles:user-detail] already done for id:${id} — skipping`);
        return;
      }
      if (current && current.status === 'processing') {
        const age = now() - (current.ts || 0);
        if (age < LOCK_STALE_MS) {
          strapi.log.info(`[lifecycles:user-detail] processing lock active for id:${id} (age=${age}ms) — skipping`);
          return;
        }
        // stale lock — fallthrough and claim
        strapi.log.warn(`[lifecycles:user-detail] stale processing lock for id:${id} (age=${age}ms) — reclaiming`);
      }

      // Claim the job: set processing immediately
      await store.set({ key, value: { status: 'processing', ts: now() } });
    } catch (err) {
      // If store.get/set errors, log and try to continue — best-effort
      strapi.log.error('[lifecycles:user-detail] store get/set failed while claiming (continuing):', err);
    }

    // Perform sends
    try {
      // send admin notification
      await strapi.plugin('email').service('email').send({
        to: process.env.DEFAULT_FROM_EMAIL,
        from: process.env.DEFAULT_FROM_EMAIL,
        replyTo: email || undefined,
        subject: `New contact: ${name} — ${subject}`,
        html: adminHtmlTemplate({ id, name, email, subject, message, logoUrl: LOGO_URL }),
      });
      strapi.log.info(`[lifecycles:user-detail] admin email sent for id:${id}`);

      // send confirmation to user
      if (email) {
        await strapi.plugin('email').service('email').send({
          to: email,
          from: process.env.DEFAULT_FROM_EMAIL,
          subject: `Thanks for contacting — I’ll reply soon`,
          html: userHtmlTemplate({ name, message, logoUrl: LOGO_URL }),
        });
        strapi.log.info(`[lifecycles:user-detail] confirmation email sent to user for id:${id}`);
      } else {
        strapi.log.warn(`[lifecycles:user-detail] no user email provided for id:${id} — skipped user confirmation`);
      }

      // mark done
      try {
        await store.set({ key, value: { status: 'done', ts: now() } });
        strapi.log.info(`[lifecycles:user-detail] marked id:${id} as done`);
      } catch (err) {
        strapi.log.error('[lifecycles:user-detail] store.set failed when marking done:', err);
      }
    } catch (err) {
      // If anything fails, remove the processing flag so future runs can retry.
      strapi.log.error(`[lifecycles:user-detail] email flow failed for id:${id}:`, err);
      try {
        // Only clear if the value is processing (avoid clearing a done)
        const current = await store.get({ key });
        if (current && current.status === 'processing') {
          await store.set({ key, value: null });
          strapi.log.info(`[lifecycles:user-detail] cleared processing lock for id:${id} after failure`);
        }
      } catch (clearErr) {
        strapi.log.error('[lifecycles:user-detail] failed to clear processing lock after failure:', clearErr);
      }
    }
  },
};
