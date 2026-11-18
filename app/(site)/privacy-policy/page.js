import PageHero from '@/components/PageHero';
import { IMG } from '@/lib/images';
import { SITE } from '@/lib/data';
export const metadata = { title: 'Privacy Policy', description: 'How Talent Bridge collects, uses and protects your personal information.' };

export default function Privacy() {
  return (
    <>
      <PageHero title="Privacy Policy" text="Last updated: November 2026" img={IMG.meeting} />
      <section><div className="w legal">
        <h2>What we collect</h2>
        <p>Employers: company name, contact person, email, phone, hiring details and uploaded job descriptions. Candidates: name, email, phone, location, experience, skills, preferred role and uploaded resume. Contact form: name, email, phone and message.</p>
        <h2>How we use it</h2>
        <p>To respond to enquiries, match candidates with roles and manage recruitment. With your consent, candidate profiles may be shared with relevant employers. We do not sell your data.</p>
        <h2>Storage and security</h2>
        <p>Data is stored in a secured database. Uploaded files are kept in private storage and are accessible only to authorised Talent Bridge staff.</p>
        <h2>Your rights</h2>
        <p>You can ask us to access, correct or delete your data, or withdraw consent for profile sharing, by writing to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
        <p style={{ fontSize: 13 }}>This is a standard template. Please have it reviewed by your legal advisor against the Digital Personal Data Protection Act, 2023 before launch.</p>
      </div></section>
    </>
  );
}
