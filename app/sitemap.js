import { SITE } from '@/lib/data';
export default function sitemap() {
  return ['', '/about', '/services', '/hire-talent', '/find-a-job', '/jobs', '/contact', '/privacy-policy'].map((p) => ({ url: SITE.url + p, lastModified: new Date() }));
}
