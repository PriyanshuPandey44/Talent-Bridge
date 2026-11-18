import Link from 'next/link';
import Photo from '@/components/Photo';
import Tabs from '@/components/Tabs';
import Counter from '@/components/Counter';
import { IMG } from '@/lib/images';
import { SERVICES, INDUSTRIES, STEPS, SECTORS, STATS, PTS, SITE } from '@/lib/data';
import { ContactForm } from '@/components/forms';

const PILLARS = [['Screened, not scraped', 'Every profile is checked for skills, experience, notice period and salary fit before it reaches you.'], ['India-market insight', 'We know salary trends, talent hubs and hiring cycles across metros and Tier 2 cities.'], ['Candidate-first experience', 'Clear communication and quick feedback keep candidates engaged until joining.'], ['Accountable delivery', 'Clear timelines and regular updates, so outcomes are never left to chance.']];

export default function Home() {
  const tabs = SERVICES.map((s, i) => ({ label: s.title.replace(' Recruitment', '').replace('Sales & Business Development', 'Sales & BD').replace('Customer Support & Operations', 'Support & Ops'), title: s.title, text: s.long, points: PTS[i], img: IMG[s.img], href: '/hire-talent' }));
  return (
    <>
      <div className="hero2"><div className="w hg2">
        <div>
          <span className="pill2">India’s trusted recruitment & placement partner</span>
          <h1>We deliver <em>hiring outcomes</em> you can count on.</h1>
          <p>Talent Bridge combines deep India market knowledge with a structured screening process, so companies hire faster and candidates land roles that fit.</p>
          <div className="cta"><Link className="btn b1" href="/hire-talent">Hire Talent →</Link><Link className="btn b4" href="/find-a-job">Find a Job</Link></div>
          <ul className="ticks2"><li>Screened candidates</li><li>Pan-India hiring</li><li>Quick shortlists</li></ul>
        </div>
        <div className="collage">
          <Photo src={IMG.hero} alt="Colleagues working together" className="c1" priority />
          <Photo src={IMG.woman} alt="Professional" className="c2" />
          <div className="fb f1"><b>Verified</b><span>Skills & experience checked</span></div>
          <div className="fb f2"><b>Pan-India</b><span>Metros and Tier 2 cities</span></div>
        </div>
      </div></div>

      <div className="marq" aria-hidden="true"><div className="mtrack">{[...INDUSTRIES, ...INDUSTRIES].map((i, n) => <span key={n}>{i}</span>)}</div></div>

      <section><div className="w">
        <div className="sh rv"><small>WHAT WE DO</small><h2>We don’t just fill roles. We build teams.</h2><p>Pick a function to see how we hire for it.</p></div>
        <div className="rv"><Tabs tabs={tabs} /></div>
      </div></section>

      <section className="alt"><div className="w split">
        <div className="aud rv"><Photo src={IMG.office} alt="Employers" className="aud-img" />
          <div className="aud-b"><small>FOR EMPLOYERS</small><h3>Build your team faster</h3>
            <ul><li>Share your requirement in 2 minutes</li><li>Get screened, relevant profiles</li><li>Interview support until offer</li></ul>
            <Link className="btn b1" href="/hire-talent">Hire Talent</Link></div></div>
        <div className="aud rv"><Photo src={IMG.woman2} alt="Job seekers" className="aud-img" />
          <div className="aud-b"><small>FOR JOB SEEKERS</small><h3>Find a role that fits you</h3>
            <ul><li>Register once, upload your resume</li><li>Get matched with employers</li><li>Career guidance from recruiters</li></ul>
            <Link className="btn b1" href="/find-a-job">Find a Job</Link></div></div>
      </div></section>

      <section><div className="w">
        <div className="sh rv"><small>HOW WE DELIVER</small><h2>A simple, transparent process</h2></div>
        <div className="flow">{STEPS.map(([t, d], n) => <div className="fl rv" key={t}><b>{n + 1}</b><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div></section>

      <section className="alt" id="industries"><div className="w">
        <div className="sh rv"><small>INDUSTRIES WE SERVE</small><h2>Unmatched reach across sectors</h2><p>Domain-aware recruiters for every industry we hire for.</p></div>
        <div className="sect">{SECTORS.map(([t, k, d]) => (
          <Photo key={t} src={IMG[k]} alt={t} className="sec rv"><div className="sec-t"><h3>{t}</h3><p>{d}</p></div></Photo>
        ))}</div>
        <div className="chips rv" style={{ marginTop: 22 }}>{INDUSTRIES.map((i) => <span className="chip" key={i}>{i}</span>)}</div>
      </div></section>

      <div className="statband"><div className="w">
        <h2>The power of Talent Bridge</h2>
        <div className="sgrid">{STATS.map(([n, sfx, l]) => <div key={l}><b><Counter to={n} suffix={sfx} /></b><span>{l}</span></div>)}</div>
      </div></div>

      <section><div className="w">
        <div className="sh rv"><small>WHY TALENT BRIDGE</small><h2>Delivering excellence in every hire</h2><p>We combine market insight with a disciplined process.</p></div>
        <div className="why">{PILLARS.map(([t, d], n) => <div className="sv rv" key={t}><div className="num">0{n + 1}</div><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div></section>

      <section style={{ padding: '10px 0 50px' }}><div className="w">
        <Photo src={IMG.group} alt="" className="band rv"><div className="band-in">
          <h2>Build the team that builds your success</h2>
          <div className="cta"><Link className="btn b1" href="/hire-talent">Hire Talent</Link><Link className="btn b2" href="/find-a-job">Find a Job</Link></div>
        </div></Photo>
      </div></section>

      <section id="contact" className="alt"><div className="w">
        <div className="sh rv"><small>GET STARTED</small><h2>Connect with India’s recruitment specialists</h2><p>We are better together. Drop your details and we will reach out.</p></div>
        <div className="box contact rv">
          <div className="cinfo">
            <Photo src={IMG.present} alt="" className="cimg" />
            <ul><li>✉️ <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li><li>🌐 {SITE.url.replace('https://', '')}</li></ul>
          </div>
          <ContactForm />
        </div>
      </div></section>
    </>
  );
}
