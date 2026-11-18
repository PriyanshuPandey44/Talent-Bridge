export const KINDS = {
  employers: {
    table: 'employer_enquiries', title: 'Company hiring enquiries', fileLabel: 'Download JD',
    statuses: ['New', 'Contacted', 'In progress', 'Closed'],
    search: ['company_name', 'contact_person', 'job_role', 'email', 'location'],
    cols: [['company_name', 'Company'], ['contact_person', 'Contact'], ['email', 'Email'], ['phone', 'Phone'], ['job_role', 'Role'], ['openings', 'Openings'], ['location', 'Location'], ['description', 'Job description']],
  },
  candidates: {
    table: 'candidates', title: 'Candidate registrations', fileLabel: 'Download resume',
    statuses: ['New', 'Shortlisted', 'Submitted to employer', 'Placed', 'Rejected'],
    search: ['full_name', 'email', 'skills', 'preferred_role', 'location'],
    extra: ['experience', ['Fresher', '0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years']],
    cols: [['full_name', 'Name'], ['email', 'Email'], ['phone', 'Phone'], ['location', 'Location'], ['experience', 'Experience'], ['preferred_role', 'Preferred role'], ['skills', 'Skills'], ['consent', 'Consent']],
  },
  contacts: {
    table: 'contact_messages', title: 'Contact enquiries',
    statuses: ['New', 'Replied', 'Closed'],
    search: ['name', 'email', 'message'],
    cols: [['name', 'Name'], ['email', 'Email'], ['phone', 'Phone'], ['message', 'Message']],
  },
};
export const fmt = (d) => new Date(d).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
