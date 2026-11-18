'use client';
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function Form({ type, fields, fileName, fileLabel, fileRequired, consent, submit, success }) {
  const [st, setSt] = useState('idle');
  const [msg, setMsg] = useState('');
  const ts = useRef(null);
  const draw = () => {
    if (KEY && window.turnstile && ts.current && !ts.current.childElementCount) window.turnstile.render(ts.current, { sitekey: KEY });
  };
  useEffect(draw, []);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setSt('loading'); setMsg('');
    try {
      const r = await fetch(`/api/submit/${type}`, { method: 'POST', body: new FormData(form) });
      const j = await r.json().catch(() => ({}));
      if (r.ok) setSt('done');
      else { setSt('error'); setMsg(j.error || 'Something went wrong. Please try again.'); }
    } catch { setSt('error'); setMsg('Network error. Please check your connection and try again.'); }
  }

  if (st === 'done') return <div className="ok" role="status"><h3>Thank you!</h3><p>{success}</p></div>;

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="fgrid">
        {fields.map((f) => (
          <label key={f.name} className={f.wide ? 'wide' : ''}>
            <span>{f.label}{f.required !== false && ' *'}</span>
            {f.type === 'textarea' ? (
              <textarea name={f.name} rows={4} required={f.required !== false} maxLength={2000} defaultValue={f.value || ''} />
            ) : f.type === 'select' ? (
              <select name={f.name} required={f.required !== false} defaultValue={f.value || ''}>
                <option value="" disabled>Select</option>
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <input name={f.name} type={f.type || 'text'} min={f.type === 'number' ? 1 : undefined} required={f.required !== false} maxLength={200} defaultValue={f.value || ''} autoComplete={f.auto} />
            )}
          </label>
        ))}
        {fileName && (
          <label className="wide">
            <span>{fileLabel}{fileRequired ? ' *' : ' (optional)'}</span>
            <input name={fileName} type="file" accept=".pdf,.doc,.docx" required={fileRequired} />
            <small>PDF, DOC or DOCX, up to 4 MB.</small>
          </label>
        )}
      </div>
      {/* honeypot: real people never see this */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
      {consent && (
        <label className="check">
          <input type="checkbox" name="consent" required />
          <span>I agree that Talent Bridge may share my profile with relevant employers, as described in the <a href="/privacy-policy" target="_blank" style={{ textDecoration: 'underline' }}>Privacy Policy</a>.</span>
        </label>
      )}
      {KEY && (<><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onLoad={draw} /><div ref={ts} /></>)}
      {st === 'error' && <p className="err" role="alert">{msg}</p>}
      <button className="btn b3" disabled={st === 'loading'}>{st === 'loading' ? 'Sending…' : submit}</button>
    </form>
  );
}
