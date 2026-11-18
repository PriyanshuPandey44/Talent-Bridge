import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';
import { KINDS, fmt } from '@/lib/admin';
export const dynamic = 'force-dynamic';

async function setStatus(fd) {
  'use server';
  requireAdmin();
  const cfg = KINDS[String(fd.get('kind'))];
  const status = String(fd.get('status'));
  if (!cfg || !cfg.statuses.includes(status)) return;
  await db().from(cfg.table).update({ status }).eq('id', String(fd.get('id')));
  revalidatePath(`/admin/${fd.get('kind')}`);
}

export default async function List({ params, searchParams }) {
  requireAdmin();
  const cfg = KINDS[params.kind];
  if (!cfg) notFound();
  const q = String(searchParams?.q || '').replace(/[,()%*\\]/g, ' ').trim().slice(0, 60);
  const status = String(searchParams?.status || '');
  let query = db().from(cfg.table).select('*').order('created_at', { ascending: false }).limit(300);
  if (q) query = query.or(cfg.search.map((c) => `${c}.ilike.%${q}%`).join(','));
  const ex = String(searchParams?.ex || '');
  if (cfg.extra && cfg.extra[1].includes(ex)) query = query.eq(cfg.extra[0], ex);
  if (cfg.statuses.includes(status)) query = query.eq('status', status);
  const { data: rows = [], error } = await query;
  const link = (r) => `/api/admin/file?path=${encodeURIComponent(r.file_path)}&name=${encodeURIComponent(r.file_name || 'file')}`;

  return (
    <div className="am">
      <h1>{cfg.title}</h1>
      <form className="tools">
        <input name="q" defaultValue={q} placeholder={`Search ${cfg.search.slice(0, 3).join(', ').replace(/_/g, ' ')}…`} />
        <select name="status" defaultValue={status}><option value="">All statuses</option>{cfg.statuses.map((s) => <option key={s}>{s}</option>)}</select>
        {cfg.extra && <select name="ex" defaultValue={ex}><option value="">Any experience</option>{cfg.extra[1].map((s) => <option key={s}>{s}</option>)}</select>}
        <button className="btn b3 sm-btn">Search</button>
      </form>
      {error && <p className="err">Could not load data. Check Supabase settings.</p>}
      <div className="tw"><table>
        <thead><tr><th>Date</th>{cfg.cols.map(([, l]) => <th key={l}>{l}</th>)}{cfg.fileLabel && <th>File</th>}<th>Status</th></tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={cfg.cols.length + 3}>No records found.</td></tr>}
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{fmt(r.created_at)}</td>
              {cfg.cols.map(([k]) => <td key={k} className={['description', 'skills', 'message'].includes(k) ? 'l' : ''}>{k === 'consent' ? (r[k] ? 'Yes' : 'No') : r[k]}</td>)}
              {cfg.fileLabel && <td>{r.file_path ? <a href={link(r)} style={{ color: 'var(--pri)', fontWeight: 700 }}>{cfg.fileLabel}</a> : '–'}</td>}
              <td><form action={setStatus} className="sf">
                <input type="hidden" name="id" value={r.id} /><input type="hidden" name="kind" value={params.kind} />
                <select name="status" defaultValue={r.status}>{cfg.statuses.map((s) => <option key={s}>{s}</option>)}</select>
                <button className="btn b3 sm-btn">Save</button>
              </form></td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  );
}
