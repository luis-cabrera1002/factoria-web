'use client';
import { useState, useEffect } from 'react';
import CRMApp from '@/components/CRMApp';

const ADMIN_PASS = 'factoria2025';
const Y = '#F5C300';
const DK = '#0C0C0E';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem('fdi_admin_auth');
    if (saved === 'true') setAuthed(true);
    setChecking(false);
  }, []);

  const tryLogin = () => {
    if (pass === ADMIN_PASS) {
      sessionStorage.setItem('fdi_admin_auth', 'true');
      setAuthed(true);
    } else {
      setError('Contraseña incorrecta');
      setPass('');
    }
  };

  if (checking) return (
    <div style={{ minHeight: '100vh', background: '#0C0C0E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 24, color: '#F5C300', letterSpacing: '.1em' }}>CARGANDO...</div>
    </div>
  );

  if (!authed) return (
    <div style={{ minHeight: '100vh', background: '#0C0C0E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: '#1A1A1F', border: '1px solid rgba(245,195,0,0.2)', borderRadius: 18, padding: 40, width: '100%', maxWidth: 380, boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/uploads/Logo oficial FDI para registrar-de13ff70.png" alt="Logo" style={{ height: 56, marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 28, color: '#F5C300', letterSpacing: '0.08em', margin: 0 }}>PANEL ADMIN</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 6 }}>Factoría de Ideas CRM</p>
        </div>
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          autoFocus
          onChange={e => { setPass(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && tryLogin()}
          style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: error ? '1.5px solid #EF4444' : '1.5px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px 16px', color: '#fff', fontSize: 15, outline: 'none', marginBottom: 12, boxSizing: 'border-box' }}
        />
        {error && <p style={{ color: '#EF4444', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>{error}</p>}
        <button
          onClick={tryLogin}
          style={{ width: '100%', background: Y, color: DK, border: 'none', borderRadius: 8, padding: 13, fontFamily: "'Bebas Neue', cursive", fontSize: 18, letterSpacing: '0.08em', cursor: 'pointer' }}
        >
          ENTRAR AL CRM
        </button>
      </div>
    </div>
  );

  return <CRMApp onBack={() => {
    sessionStorage.removeItem('fdi_admin_auth');
    window.location.href = '/';
  }} />;
}
