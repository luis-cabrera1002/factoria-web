'use client';
import { useState } from 'react';
import PublicPage from '@/components/PublicPage';
import CRMApp from '@/components/CRMApp';

export default function Home() {
  const [view, setView] = useState('public');

  if (view === 'crm') {
    return <CRMApp onBack={() => setView('public')} />;
  }

  return <PublicPage onAdminClick={() => setView('crm')} />;
}
