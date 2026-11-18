import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealInit from '@/components/RevealInit';

export default function SiteLayout({ children }) {
  return (<><Header /><main>{children}</main><Footer /><RevealInit /></>);
}
