import PageHero from '@/components/PageHero';
import { IMG } from '@/lib/images';
import Link from 'next/link';
import { db } from '@/lib/supabase';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Current Openings', description: 'Browse current job openings handled by Talent Bridge across India.' };

async function getJobs() {
  try { const { data } = await db().from('jobs').select('*').eq('active', true).order('created_at', { ascending: false }); return data || []; }
  catch { return []; }
}

export default async function Jobs() {
  const jobs = await getJobs();
  return (
    <>
      <PageHero title="Current Openings" text="Roles we are hiring for right now." img={IMG.group} />
      <section><div className="w narrow jobs">
        {jobs.length === 0 && <div className="box"><h3>No openings listed right now</h3><p>Register your profile and we will contact you when a matching role opens.</p><Link className="btn b1" href="/find-a-job">Register your profile</Link></div>}
        {jobs.map((j) => (
          <div className="job" key={j.id}>
            <div><h3>{j.title}</h3><p>{j.location} · {j.job_type}{j.experience ? ` · ${j.experience}` : ''}</p>{j.description && <p>{j.description.slice(0, 220)}</p>}</div>
            <Link className="btn b3" href={`/find-a-job?role=${encodeURIComponent(j.title)}`}>Apply</Link>
          </div>
        ))}
      </div></section>
    </>
  );
}
