import PageHero from '@/components/PageHero';
import { IMG } from '@/lib/images';
import Link from 'next/link';
import { STEPS } from '@/lib/data';
import Photo from '@/components/Photo';
export const metadata = { title: 'About Us', description: 'Learn about Talent Bridge, our mission, vision and approach to recruitment in India.' };

export default function About() {
  return (
    <>
      <PageHero title="About Talent Bridge" text="A recruitment and placement partner built on clear communication, quality profiles and fast closures." img={IMG.team} />
      <section><div className="w narrow prose rv">
        <Photo src={IMG.team} alt="Talent Bridge team collaborating" className="wide-img" />
        <h2>Who we are</h2>
        <p>Talent Bridge connects companies looking for talent with candidates searching for the right opportunity. We work with employers across India in IT, BFSI, sales, HR, operations and more.</p>
        <div className="split" style={{ margin: '28px 0' }}>
          <div className="sv"><div className="ic">🎯</div><h3>Mission</h3><p>Make hiring simple, fast and trustworthy for every Indian business, and open doors for every capable candidate.</p></div>
          <div className="sv"><div className="ic">🔭</div><h3>Vision</h3><p>To be India’s most dependable talent bridge across industries and cities.</p></div>
        </div>
        <h2>Our approach to recruitment</h2>
        <p>We start by understanding your role, team and budget. We then screen candidates for skills, attitude and availability, and share only profiles that fit. We stay with you until the offer is accepted and the candidate joins.</p>
      </div></section>
      <section className="alt"><div className="w">
        <div className="sh"><small>OUR PROCESS</small><h2>How we recruit</h2></div>
        <div className="steps">{STEPS.map(([t, d]) => <div className="sp rv" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
        <p style={{ marginTop: 28 }}><Link className="btn b1" href="/hire-talent">Hire talent</Link></p>
      </div></section>
    </>
  );
}
