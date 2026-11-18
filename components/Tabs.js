'use client';
import { useState } from 'react';
import Link from 'next/link';
import Photo from './Photo';

export default function Tabs({ tabs }) {
  const [i, setI] = useState(0);
  const t = tabs[i];
  return (
    <div className="tabs">
      <div className="tab-list" role="tablist">
        {tabs.map((x, n) => <button key={x.label} role="tab" aria-selected={n === i} className={n === i ? 'on' : ''} onClick={() => setI(n)}>{x.label}</button>)}
      </div>
      <div className="tab-body" role="tabpanel" key={t.label}>
        <div>
          <h3>{t.title}</h3><p>{t.text}</p>
          <ul>{t.points.map((p) => <li key={p}>{p}</li>)}</ul>
          <Link href={t.href} className="btn b3">Hire for this role →</Link>
        </div>
        <Photo src={t.img} alt={t.title} className="tab-img" />
      </div>
    </div>
  );
}
