import Form from './Form';
import { ROLES } from '@/lib/data';

export const EmployerForm = () => (
  <Form type="employer" submit="Submit hiring requirement" fileName="jd" fileLabel="Upload JD" success="We have received your requirement. Our team will contact you within one working day."
    fields={[
      { name: 'company_name', label: 'Company name' }, { name: 'contact_person', label: 'Contact person', auto: 'name' },
      { name: 'email', label: 'Email', type: 'email', auto: 'email' }, { name: 'phone', label: 'Phone', type: 'tel', auto: 'tel' },
      { name: 'job_role', label: 'Job role' }, { name: 'openings', label: 'Number of openings', type: 'number' },
      { name: 'location', label: 'Job location', wide: true },
      { name: 'description', label: 'Job description', type: 'textarea', required: false, wide: true },
    ]} />
);
export const CandidateForm = ({ role = '' }) => (
  <Form type="candidate" submit="Register" fileName="resume" fileLabel="Upload resume" fileRequired consent success="You are registered. We will contact you when a role matches your profile."
    fields={[
      { name: 'full_name', label: 'Full name', auto: 'name' }, { name: 'email', label: 'Email', type: 'email', auto: 'email' },
      { name: 'phone', label: 'Phone', type: 'tel', auto: 'tel' }, { name: 'location', label: 'Current location' },
      { name: 'experience', label: 'Experience', type: 'select', options: ['Fresher', '0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years'] },
      { name: 'preferred_role', label: 'Preferred job role', value: role },
      { name: 'skills', label: 'Skills', type: 'textarea', wide: true },
    ]} />
);
export const ContactForm = () => (
  <Form type="contact" submit="Send message" success="Message sent. We will get back to you shortly."
    fields={[
      { name: 'name', label: 'Name', auto: 'name' }, { name: 'email', label: 'Email', type: 'email', auto: 'email' },
      { name: 'phone', label: 'Phone', type: 'tel', required: false, wide: true },
      { name: 'message', label: 'How can we help?', type: 'textarea', wide: true },
    ]} />
);
export { ROLES };
