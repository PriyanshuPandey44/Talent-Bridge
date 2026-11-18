import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { makeToken, safeEqual } from '@/lib/auth';

async function login(fd) {
  'use server';
  const okUser = safeEqual(String(fd.get('email') || ''), process.env.ADMIN_EMAIL || '');
  const okPass = safeEqual(String(fd.get('password') || ''), process.env.ADMIN_PASSWORD || '');
  if (!okUser || !okPass || !process.env.ADMIN_PASSWORD) redirect('/admin/login?e=1');
  cookies().set('tb_admin', makeToken(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 7 * 86400 });
  redirect('/admin');
}

export default function Login({ searchParams }) {
  return (
    <div className="lg box">
      <h1 style={{ fontSize: 26, marginTop: 0 }}>Admin login</h1>
      <form action={login} className="form">
        <div className="fgrid" style={{ gridTemplateColumns: '1fr' }}>
          <label><span>Email</span><input name="email" type="email" required autoComplete="username" /></label>
          <label><span>Password</span><input name="password" type="password" required autoComplete="current-password" /></label>
        </div>
        {searchParams?.e && <p className="err">Incorrect email or password.</p>}
        <button className="btn b3">Log in</button>
      </form>
    </div>
  );
}
