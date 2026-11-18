export const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function notify(subject, data) {
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_TO) return;
  const rows = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555"><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
    .join('');
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.MAIL_FROM,
        to: process.env.NOTIFY_TO.split(',').map((s) => s.trim()),
        reply_to: data.Email || undefined,
        subject,
        html: `<h3>${esc(subject)}</h3><table>${rows}</table><p>Open the admin panel to view files and update status.</p>`,
      }),
    });
  } catch {}
}
