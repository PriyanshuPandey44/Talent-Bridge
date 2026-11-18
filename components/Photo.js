'use client';
import { useEffect, useRef, useState } from 'react';

// Image with a gradient fallback so the layout never breaks if a photo fails to load.
export default function Photo({ src, alt = '', className = '', priority = false, children }) {
  const [ok, setOk] = useState(true);
  const ref = useRef(null);
  useEffect(() => { const i = ref.current; if (i && i.complete && i.naturalWidth === 0) setOk(false); }, []);
  return (
    <div className={`ph ${className}`}>
      {ok && <img ref={ref} src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" onError={() => setOk(false)} />}
      {children}
    </div>
  );
}
