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
  <style>
    /* Email-safe helpers */
    .wrap{width:100%;padding:28px 12px;background:#f6f7fb}
    .card{max-width:680px;background:#0b0f14;border-radius:12px;overflow:hidden;color:#e6eef6}
    .header{display:flex;align-items:center;gap:14px;padding:20px 24px;border-bottom:1px solid rgba(255,255,255,0.04)}
    .logo{width:68px;border-radius:8px;display:block}
    .title{font-weight:800;font-size:18px;margin:0;color:#ffffff}
    .muted{color:#9aa6b2;font-size:13px;margin-top:4px}
    .meta{font-size:12px;color:#94a3b8}
    .body{padding:22px;background:linear-gradient(180deg,#071018 0%, #061019 100%)}
    .subject{font-size:18px;font-weight:700;color:#f8fafc;margin:0 0 12px}
    .grid{display:flex;gap:12px;flex-wrap:wrap}
    .pill{flex:1;min-width:160px;background:rgba(255,255,255,0.03);border-radius:10px;padding:12px;border:1px solid rgba(255,255,255,0.02)}
    .pill .label{font-weight:700;color:#cfe9e8;font-size:13px;margin-bottom:6px}
    .pill .value{color:#9fb6b5;font-size:14px}
    .messageBox{margin-top:16px;padding:16px;border-radius:10px;background:linear-gradient(90deg,#0f172a 0%, #071018 100%);border-left:4px solid #f59e0b;color:#cbd5db;line-height:1.6}
    .ctaRow{margin-top:18px;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
    .btn{background:#0ea5a4;color:#fff;padding:10px 16px;border-radius:10px;text-decoration:none;font-weight:700;display:inline-block}
    .metaSmall{color:#94a3b8;font-size:13px}
    .foot{padding:14px 22px;border-top:1px solid rgba(255,255,255,0.03);text-align:center;background:#061018;color:#7f99a6;font-size:13px}
    @media (max-width:480px){ .grid{flex-direction:column} .logo{width:56px} .title{font-size:16px} .subject{font-size:16px} }
  </style>
</head>
<body style="margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  ${headPre}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="wrap">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px">
          <tr>
            <td class="card" style="background:#071018">
              <!-- Header -->
              <div class="header" style="display:block">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="vertical-align:middle;padding:0 24px 0 24px">
                      <img src="${logoUrl}" alt="logo" class="logo" />
                    </td>
                    <td style="vertical-align:middle;padding:0 24px">
                      <div style="display:flex;flex-direction:column;align-items:flex-start">
                        <div class="title">New Contact Form</div>
                        <div class="muted">A new submission was received</div>
                      </div>
                    </td>
                    <td style="vertical-align:middle;padding:0 24px;text-align:right">
                      <div class="meta">ID: <strong style="color:#e6eef6">${id}</strong></div>
                      <div class="meta" style="margin-top:6px">${new Date().toLocaleString()}</div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Body -->
              <div class="body" style="display:block">
                <div style="padding:0 24px">
                  <div class="subject">${subject || 'Contact form submission'}</div>

                  <div class="grid" style="margin-top:8px">
                    <div class="pill">
                      <div class="label">Name</div>
                      <div class="value">${name || '—'}</div>
                    </div>
                    <div class="pill">
                      <div class="label">Email</div>
                      <div class="value"><a href="mailto:${email}" style="color:#7feaea;text-decoration:none">${email || '—'}</a></div>
                    </div>
                  </div>

                  <div class="messageBox" role="article" aria-label="Message content">
                    <div style="font-weight:700;color:#ffd39b;margin-bottom:8px">Message</div>
                    <div style="color:#cbd5db">${safeMessage}</div>
                  </div>

                  <div class="ctaRow" style="padding:0 0 22px 0">
                    <a class="btn" href="mailto:${email}">Reply: ${email}</a>
                    <div class="metaSmall">Received: <strong style="color:#e6eef6">${new Date().toLocaleString()}</strong></div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="foot">
                You’re receiving this because someone submitted the contact form on your site.
                <div style="margin-top:6px">© ${new Date().getFullYear()} Yogesh Mishra — <a href="https://yogijs.tech" style="color:#7feaea;text-decoration:none">yogijs.tech</a></div>
              </div>
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
