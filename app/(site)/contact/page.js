import PageHero from '@/components/PageHero';
import { IMG } from '@/lib/images';
import { ContactForm } from '@/components/forms';
import { SITE } from '@/lib/data';
export const metadata = { title: 'Contact Us', description: 'Contact Talent Bridge for hiring and recruitment enquiries.' };

export default function Contact() {
  const wa = SITE.whatsapp.replace(/\D/g, '');
  return (
    <>
      <PageHero title="Contact Us" text="We usually reply within one working day." img={IMG.present} />
      <section><div className="w box contact rv">
        <div><h2 style={{ marginTop: 0 }}>Get in touch</h2>
          <ul><li>✉️ <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            {wa && <li>💬 <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener">Chat on WhatsApp</a></li>}
            <li>🌐 {SITE.url.replace('https://', '')}</li></ul></div>
        <ContactForm />
      </div></section>
    </>
  );
}
