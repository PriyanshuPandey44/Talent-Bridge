import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';

export const metadata = { title: 'Admin', robots: { index: false, follow: false } };

async function logout() {
  'use server';
  cookies().delete('tb_admin');
  redirect('/admin/login');
}

export default function AdminLayout({ children }) {
  const ok = isAdmin();
  return (
    <div className="adm">
      {ok && (
        <div className="abar">
          <b>Talent Bridge Admin</b>
          <Link href="/admin">Dashboard</Link><Link href="/admin/employers">Company enquiries</Link>
          <Link href="/admin/candidates">Candidates</Link><Link href="/admin/jobs">Jobs</Link>
          <Link href="/admin/contacts">Contact enquiries</Link>
          <form action={logout}><button>Log out</button></form>
        </div>
      )}
      {children}
    </div>
  );
}
