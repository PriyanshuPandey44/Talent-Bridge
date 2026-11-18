import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Photo from '@/components/Photo';
import { IMG } from '@/lib/images';
import { SERVICES } from '@/lib/data';
export const metadata = { title: 'Our Services', description: 'IT, Non-IT, BFSI, Sales, HR and Customer Support recruitment services across India.' };

export default function Services() {
  return (
    <>
      <PageHero title="Our Services" text="Recruitment solutions for every function in your organisation." img={IMG.meeting} />
      <section><div className="w grid3">
        {SERVICES.map((s) => (
          <div className="pc rv" key={s.title}>
            <Photo src={IMG[s.img]} alt={s.title} className="pc-img" />
            <div className="pc-b"><h3>{s.title}</h3><p>{s.long}</p>
              <Link href="/hire-talent" className="lnk">Hire for this role →</Link></div>
          </div>
        ))}
      </div></section>
    </>
  );
}
