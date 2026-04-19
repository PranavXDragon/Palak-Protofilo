'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';
import '@/styles/style.css';

export default function Home() {
  const [activePage, setActivePage] = useState('about');

  return (
    <main className="main">
      <Sidebar />
      <MainContent activePage={activePage} setActivePage={setActivePage} />
    </main>
  );
}
