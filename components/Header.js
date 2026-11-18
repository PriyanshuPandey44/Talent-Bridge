'use client';
import Link from 'next/link';
import { useState } from 'react';
import { SERVICES, INDUSTRIES } from '@/lib/data';

export default function Header() {
  const [open, setOpen] = useState(false);
  const c = () => setOpen(false);
  return (
    <header>
      <div className="w nav">
        <Link className="logo" href="/" onClick={c}><i>⌁</i>Talent Bridge</Link>
        <nav aria-label="Main">
          <ul className={open ? 'open' : ''}>
            <li className="dd"><Link href="/services" onClick={c}>Services ▾</Link>
              <div className="menu">{SERVICES.map((s) => <Link key={s.title} href="/services" onClick={c}><span>{s.icon}</span>{s.title}</Link>)}</div></li>
            <li className="dd"><Link href="/#industries" onClick={c}>Industries ▾</Link>
              <div className="menu">{INDUSTRIES.slice(0, 6).map((x) => <Link key={x} href="/#industries" onClick={c}>{x}</Link>)}</div></li>
            <li><Link href="/hire-talent" onClick={c}>For Employers</Link></li>
            <li><Link href="/find-a-job" onClick={c}>For Job Seekers</Link></li>
            <li><Link href="/jobs" onClick={c}>Jobs</Link></li>
            <li><Link href="/about" onClick={c}>About</Link></li>
            <li><Link href="/contact" onClick={c}>Contact</Link></li>
          </ul>
        </nav>
        <Link className="btn b1 hide-m" href="/hire-talent">Hire Talent</Link>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
      </div>
    </header>
  );
}
