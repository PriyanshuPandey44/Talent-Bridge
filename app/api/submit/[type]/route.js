import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/supabase';
import { notify } from '@/lib/mail';

export const runtime = 'nodejs';

const MAX_FILE = 4 * 1024 * 1024; // Vercel request body limit is ~4.5 MB
const CFG = {
  employer: {
    table: 'employer_enquiries', folder: 'jd', file: 'jd', subject: 'New hiring enquiry',
    fields: { company_name: 'Company Name', contact_person: 'Contact Person', email: 'Email', phone: 'Phone', job_role: 'Job Role', openings: 'Openings', location: 'Job Location' },
    optional: { description: 'Job Description' },
  },
  candidate: {
    table: 'candidates', folder: 'resumes', file: 'resume', fileRequired: true, consent: true, subject: 'New candidate registration',
    fields: { full_name: 'Full Name', email: 'Email', phone: 'Phone', location: 'Current Location', experience: 'Experience', skills: 'Skills', preferred_role: 'Preferred Role' },
    optional: {},
  },
  contact: {
    table: 'contact_messages', subject: 'New contact message',
    fields: { name: 'Name', email: 'Email', message: 'Message' },
    optional: { phone: 'Phone' },
  },
};
const hits = new Map();
const limited = (ip) => {
  const now = Date.now(), arr = (hits.get(ip) || []).filter((t) => now - t < 600000);
  arr.push(now); hits.set(ip, arr);
  return arr.length > 6;
};
const fail = (error, status = 400) => NextResponse.json({ error }, { status });

function fileKind(buf) {
  const h = buf.subarray(0, 4).toString('hex');
  if (h === '25504446') return 'pdf';
  if (h === '504b0304') return 'docx';
  if (h === 'd0cf11e0') return 'doc';
  return null;
}

export async function POST(req, { params }) {
  const cfg = CFG[params.type];
  if (!cfg) return fail('Not found', 404);
  const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (limited(ip)) return fail('Too many submissions. Please try again in a few minutes.', 429);

  let fd;
  try { fd = await req.formData(); } catch { return fail('Invalid form data.'); }
  if (fd.get('website')) return NextResponse.json({ ok: true }); // honeypot

  if (process.env.TURNSTILE_SECRET) {
    const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET, response: String(fd.get('cf-turnstile-response') || ''), remoteip: ip });
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body }).then((x) => x.json()).catch(() => ({}));
    if (!r.success) return fail('Spam check failed. Please refresh and try again.');
  }

  const row = {};
  for (const [k, label] of Object.entries(cfg.fields)) {
    const v = String(fd.get(k) || '').trim();
    if (!v) return fail(`${label} is required.`);
    if (v.length > 2000) return fail(`${label} is too long.`);
    row[k] = v;
  }
  for (const k of Object.keys(cfg.optional)) row[k] = String(fd.get(k) || '').trim().slice(0, 5000) || null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) return fail('Enter a valid email address.');
  if ('phone' in row && row.phone && !/^[+\d][\d\s-]{8,15}$/.test(row.phone)) return fail('Enter a valid phone number.');
  if (params.type === 'employer') {
    row.openings = parseInt(row.openings, 10);
    if (!(row.openings > 0 && row.openings < 100000)) return fail('Enter a valid number of openings.');
  }
  if (cfg.consent) {
    if (fd.get('consent') !== 'on') return fail('Please give consent to share your profile with employers.');
    row.consent = true;
  }

  let supabase;
  try { supabase = db(); } catch { return fail('Service is not configured yet. Please contact us by email.', 503); }
  const file = cfg.file ? fd.get(cfg.file) : null;
  if (file && file.size > 0) {
    if (file.size > MAX_FILE) return fail('File is too large. Maximum size is 4 MB.');
    const buf = Buffer.from(await file.arrayBuffer());
    const ext = fileKind(buf);
    const nameOk = /\.(pdf|docx?|DOCX?|PDF)$/.test(file.name || '');
    if (!ext || !nameOk) return fail('Only PDF, DOC or DOCX files are allowed.');
    const path = `${cfg.folder}/${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${ext}`;
    const up = await supabase.storage.from('uploads').upload(path, buf, { contentType: file.type || 'application/octet-stream' });
    if (up.error) return fail('Could not upload the file. Please try again.', 500);
    row.file_path = path;
    row.file_name = file.name.slice(0, 120);
  } else if (cfg.fileRequired) {
    return fail('Please upload your resume.');
  }

  const { error } = await supabase.from(cfg.table).insert(row);
  if (error) return fail('Could not save your details. Please try again.', 500);

  const mail = { ...row };
  delete mail.file_path;
  await notify(cfg.subject, Object.fromEntries(Object.entries(mail).map(([k, v]) => [k.replace(/_/g, ' '), v])));
  return NextResponse.json({ ok: true });
}
