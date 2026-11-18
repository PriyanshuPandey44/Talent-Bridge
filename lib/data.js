export const SITE = {
  name: 'Talent Bridge',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://talentbridgehr.online',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@talentbridgehr.online',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '',
};
export const SERVICES = [
  { icon: '💻', title: 'IT Recruitment', img: 'dev', text: 'Developers, QA, DevOps, data and cloud talent.', long: 'Software engineers, testers, DevOps, data, cloud and cybersecurity professionals for product companies, startups and IT services firms.' },
  { icon: '🏭', title: 'Non-IT Recruitment', img: 'office', text: 'Engineering, manufacturing, retail and more.', long: 'Mechanical, production, quality, supply chain, retail and healthcare hiring, from supervisors to plant heads.' },
  { icon: '🏦', title: 'BFSI Recruitment', img: 'desk', text: 'Banking, insurance, NBFC and fintech roles.', long: 'Relationship managers, credit and risk analysts, branch heads, insurance advisors and fintech operations teams.' },
  { icon: '📈', title: 'Sales & Business Development', img: 'present', text: 'Closers and growth leaders who deliver numbers.', long: 'Inside sales, field sales, key account managers and business development heads across B2B and B2C.' },
  { icon: '🗂️', title: 'HR & Administration', img: 'woman2', text: 'HR, payroll, admin and office management.', long: 'HR generalists, talent acquisition, payroll and compliance specialists, office and facility administrators.' },
  { icon: '🎧', title: 'Customer Support & Operations', img: 'laptop', text: 'Voice, non-voice, back-office and process teams.', long: 'Voice and chat support, process associates, team leaders and operations managers, including high-volume hiring.' },
];
export const INDUSTRIES = ['IT & Software', 'Banking & Finance', 'Insurance', 'Manufacturing', 'Healthcare', 'Retail & E-commerce', 'Telecom', 'Education', 'Logistics', 'Real Estate'];
export const STEPS = [
  ['Understand', 'We study your role, team and budget.'],
  ['Source & screen', 'Our database, networks and structured screening.'],
  ['Shortlist', 'Verified, relevant profiles delivered quickly.'],
  ['Close', 'Interview support, offers and onboarding.'],
];
export const ROLES = ['IT Recruitment', 'Non-IT', 'BFSI', 'Sales & Business Development', 'HR & Administration', 'Customer Support & Operations'];
export const SECTORS = [
  ['IT & Software', 'dev', 'Engineers, testers, data and cloud talent for product and services companies.'],
  ['Banking & Finance', 'desk', 'Relationship managers, credit, risk and branch teams across BFSI.'],
  ['Sales & Retail', 'present', 'Sales leaders and high-performing field and inside sales teams.'],
  ['Operations & Support', 'laptop', 'Process, back-office and customer support hiring at scale.'],
  ['Manufacturing & Engineering', 'office', 'Plant, production, quality and supply chain professionals.'],
  ['HR & Administration', 'woman2', 'HR generalists, payroll, compliance and office administrators.'],
];
export const STATS = [[6, '', 'Hiring domains'], [10, '+', 'Industries served'], [48, ' hrs', 'Target time to first profiles'], [100, '%', 'Candidates screened']];
export const PTS = [
  ['Developers, QA, DevOps and data roles', 'Product companies, startups and IT services', 'Niche and bulk tech hiring'],
  ['Engineering, production and quality', 'Retail, healthcare and logistics', 'Supervisor to plant-head roles'],
  ['Relationship managers and credit teams', 'Insurance, NBFC and fintech', 'Branch and operations leadership'],
  ['Inside, field and enterprise sales', 'Key account and BD leaders', 'Target-driven, proven performers'],
  ['HR, talent acquisition and payroll', 'Compliance and admin specialists', 'Office and facility management'],
  ['Voice, chat and non-voice support', 'Process and operations teams', 'High-volume hiring with quick ramp-up'],
];
