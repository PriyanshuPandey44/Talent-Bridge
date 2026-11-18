import crypto from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const sign = (v) => crypto.createHmac('sha256', process.env.ADMIN_SECRET || 'dev').update(v).digest('hex');
export function makeToken() {
  const exp = String(Date.now() + 7 * 86400000);
  return `${exp}.${sign(exp)}`;
}
export function isAdmin() {
  const t = cookies().get('tb_admin')?.value;
  if (!t) return false;
  const [exp, sig] = t.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const a = Buffer.from(sig), b = Buffer.from(sign(exp));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
export function requireAdmin() { if (!isAdmin()) redirect('/admin/login'); }
export function safeEqual(a = '', b = '') {
  const x = crypto.createHash('sha256').update(a).digest(), y = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(x, y);
}
