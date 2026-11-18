import Link from 'next/link';
import { db } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';
import { KINDS } from '@/lib/admin';
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  requireAdmin();
  const supabase = db();
  const items = await Promise.all(Object.entries(KINDS).map(async ([k, c]) => {
    const [all, fresh] = await Promise.all([
      supabase.from(c.table).select('*', { count: 'exact', head: true }),
      supabase.from(c.table).select('*', { count: 'exact', head: true }).eq('status', 'New'),
    ]);
    return { k, title: c.title, all: all.count ?? 0, fresh: fresh.count ?? 0 };
  }));
  const jobs = await supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('active', true);
  return (
    <div className="am">
      <h1>Dashboard</h1>
      <div className="cards">
        {items.map((i) => <Link key={i.k} href={`/admin/${i.k}`}><b>{i.fresh}</b>New · {i.title}<br /><small>{i.all} total</small></Link>)}
        <Link href="/admin/jobs"><b>{jobs.count ?? 0}</b>Active job listings</Link>
      </div>
    </div>
  );
}
