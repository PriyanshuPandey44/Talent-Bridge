import PageHero from '@/components/PageHero';
import { IMG } from '@/lib/images';
import { CandidateForm } from '@/components/forms';
export const metadata = { title: 'Find a Job', description: 'Register with Talent Bridge, upload your resume and get matched with employers across India.' };

export default function FindJob({ searchParams }) {
  const role = typeof searchParams?.role === 'string' ? searchParams.role.slice(0, 120) : '';
  return (
    <>
      <PageHero title="Find a Job" text="Register once and upload your resume. We will contact you when a role matches." img={IMG.woman} />
      <section><div className="w narrow"><div className="box rv"><CandidateForm role={role} /></div></div></section>
    </>
  );
}
