'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const PublicPage = dynamic(() => import('@/components/PublicPage'), { ssr: false });
const CRMApp = dynamic(() => import('@/components/CRMApp'), { ssr: false });

export default function Home() {
  const [view, setView] = useState('public');

  if (view === 'crm') {
    return <CRMApp onBack={() => setView('public')} />;
  }

  return <PublicPage onAdminClick={() => setView('crm')} />;
}
