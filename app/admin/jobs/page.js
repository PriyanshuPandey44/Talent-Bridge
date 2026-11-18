import { revalidatePath } from 'next/cache';
import { db } from '@/lib/supabase';
import { requireAdmin } from '@/lib/auth';
import { fmt } from '@/lib/admin';
export const dynamic = 'force-dynamic';

async function addJob(fd) {
  'use server';
  requireAdmin();
  const t = (k, n = 200) => String(fd.get(k) || '').trim().slice(0, n);
  if (!t('title') || !t('location')) return;
  await db().from('jobs').insert({ title: t('title'), location: t('location'), job_type: t('job_type') || 'Full-time', experience: t('experience') || null, description: t('description', 3000) || null });
  revalidatePath('/admin/jobs'); revalidatePath('/jobs');
}
async function toggleJob(fd) {
  'use server';
  requireAdmin();
  await db().from('jobs').update({ active: fd.get('active') === 'true' }).eq('id', String(fd.get('id')));
  revalidatePath('/admin/jobs'); revalidatePath('/jobs');
}
async function deleteJob(fd) {
  'use server';
  requireAdmin();
  await db().from('jobs').delete().eq('id', String(fd.get('id')));
  revalidatePath('/admin/jobs'); revalidatePath('/jobs');
}

export default async function Jobs() {
  requireAdmin();
  const { data: jobs = [] } = await db().from('jobs').select('*').order('created_at', { ascending: false });
  return (
    <div className="am">
      <h1>Job listings</h1>
      <div className="box" style={{ marginBottom: 20 }}>
        <form action={addJob} className="form">
          <div className="fgrid">
            <label><span>Job title *</span><input name="title" required maxLength={200} /></label>
            <label><span>Location *</span><input name="location" required maxLength={200} /></label>
            <label><span>Type</span><select name="job_type"><option>Full-time</option><option>Part-time</option><option>Contract</option></select></label>
            <label><span>Experience</span><input name="experience" placeholder="e.g. 2-5 years" maxLength={100} /></label>
            <label className="wide"><span>Description</span><textarea name="description" rows={3} maxLength={3000} /></label>
          </div>
          <button className="btn b3">Add job</button>
        </form>
      </div>
      <div className="tw"><table>
        <thead><tr><th>Posted</th><th>Title</th><th>Location</th><th>Type</th><th>Experience</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {jobs.length === 0 && <tr><td colSpan={7}>No jobs yet. Add your first listing above.</td></tr>}
          {jobs.map((j) => (
            <tr key={j.id}>
              <td>{fmt(j.created_at)}</td><td>{j.title}</td><td>{j.location}</td><td>{j.job_type}</td><td>{j.experience || '–'}</td>
              <td><form action={toggleJob}><input type="hidden" name="id" value={j.id} /><input type="hidden" name="active" value={String(!j.active)} />
                <button className="btn b3 sm-btn">{j.active ? 'Active · Hide' : 'Hidden · Publish'}</button></form></td>
              <td><form action={deleteJob}><input type="hidden" name="id" value={j.id} /><button className="btn sm-btn" style={{ background: '#d93025', color: '#fff' }}>Delete</button></form></td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  );
}
