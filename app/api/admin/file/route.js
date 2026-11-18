import { NextResponse } from 'next/server';
import { db } from '@/lib/supabase';
import { isAdmin } from '@/lib/auth';

export async function GET(req) {
  if (!isAdmin()) return new NextResponse('Unauthorized', { status: 401 });
  const sp = new URL(req.url).searchParams;
  const path = sp.get('path') || '';
  if (!/^(jd|resumes)\/[\w.-]+$/.test(path)) return new NextResponse('Bad request', { status: 400 });
  const name = (sp.get('name') || 'file').replace(/[^\w. -]/g, '_');
  const { data, error } = await db().storage.from('uploads').createSignedUrl(path, 60, { download: name });
  if (error || !data) return new NextResponse('Not found', { status: 404 });
  return NextResponse.redirect(data.signedUrl);
}
