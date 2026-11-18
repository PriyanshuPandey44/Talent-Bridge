import PageHero from '@/components/PageHero';
import { IMG } from '@/lib/images';
import { EmployerForm } from '@/components/forms';
export const metadata = { title: 'Hire Talent', description: 'Share your hiring requirement with Talent Bridge and receive screened candidate profiles quickly.' };

export default function Hire() {
  return (
    <>
      <PageHero title="Hire Talent" text="Tell us about your opening. Our team will respond within one working day." img={IMG.office} />
      <section><div className="w narrow"><div className="box rv"><EmployerForm /></div></div></section>
    </>
  );
}
