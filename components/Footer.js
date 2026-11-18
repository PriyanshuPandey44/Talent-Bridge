import Link from 'next/link';
import { SITE, SERVICES } from '@/lib/data';

export default function Footer() {
  const wa = SITE.whatsapp.replace(/\D/g, '');
  return (
    <>
      <footer>
        <div className="w foot">
          <div><b className="flogo">Talent Bridge</b><p>Recruitment & placement partner for Indian businesses and professionals.</p>
            <Link className="btn b1" href="/hire-talent" style={{ marginTop: 10 }}>Hire Talent</Link></div>
          <div><b>Company</b><Link href="/about">About</Link><Link href="/jobs">Jobs</Link><Link href="/contact">Contact</Link><Link href="/privacy-policy">Privacy Policy</Link></div>
          <div><b>Services</b>{SERVICES.map((s) => <Link key={s.title} href="/services">{s.title}</Link>)}</div>
          <div><b>Get in touch</b><a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            {wa && <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener">WhatsApp</a>}
            <Link href="/find-a-job">Register as candidate</Link></div>
        </div>
        <div className="w fbot"><span>© {new Date().getFullYear()} Talent Bridge. All rights reserved.</span><span>Photos: <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a></span></div>
      </footer>
      {wa && <a className="wa" href={`https://wa.me/${wa}`} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">💬 WhatsApp</a>}
    </>
  );
}
