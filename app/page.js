'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CoursesSection from '../components/CourseCard';
import HomeSections from '../components/Homesections';
import Footer from '../components/Footer';
import Link from 'next/link';
import HeroVisual from '../components/HeroVisual';

export default function Home() {
  const [c, setC] = useState({
    hero: {
      badge: 'Azerbaycanin #1 Praktiki Akademiyasi',
      title1: 'Geleceyin',
      title2: 'Pesosini',
      title3: '4 Hefteve Oyre',
      subtitle: 'Real layiheler. Praktiki tedris. Karyera desteyi.',
      tags: 'Tikinti - Arxitektura - Daxili Dizayn - Digital Marketing - BIM',
      btn1: 'Kurslara bax',
      btn2: 'Pulsuz Konsultasiya',
    },
    stats: {
      stat1_value: '500+', stat1_label: 'Mezun',
      stat2_value: '90%', stat2_label: 'Ise Duzaldi',
      stat3_value: '4.9', stat3_label: 'Reytinq',
      stat4_value: '4 hefte', stat4_label: 'Kurs Muddeti',
    }
  });

  useEffect(() => {
    fetch('/api/content?page=home')
      .then(r => r.json())
      .then(data => { if (data.content && Object.keys(data.content).length > 0) setC(data.content); })
      .catch(() => {});
  }, []);

  const stats = [
    { value: c.stats?.stat1_value, label: c.stats?.stat1_label, color: '#FF2CA8' },
    { value: c.stats?.stat2_value, label: c.stats?.stat2_label, color: '#00D68F' },
    { value: c.stats?.stat3_value, label: c.stats?.stat3_label, color: '#FFB800' },
    { value: c.stats?.stat4_value, label: c.stats?.stat4_label, color: '#7B2FFF' },
  ];

  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Ana Sehife" />
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '-40px', gap: '60px', position: 'relative', minHeight: 'calc(100vh - 80px)' }}>
        <div style={{ position: 'absolute', left: '-100px', top: '-80px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(123,47,255,0.2) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: '50px', top: '80px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,44,168,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '8px 16px', marginBottom: '32px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 500 }}>{c.hero?.badge}</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '72px', lineHeight: 1.05, color: '#FFFFFF', margin: '0 0 24px 0' }}>
            {c.hero?.title1}<br /><span style={{ color: '#FF2CA8' }}>{c.hero?.title2}</span><br />{c.hero?.title3}
          </h1>
          <p style={{ fontSize: '16px', color: '#A0A0B0', marginBottom: '8px' }}>{c.hero?.subtitle}</p>
          <p style={{ fontSize: '14px', color: '#A0A0B0', marginBottom: '48px' }}>{c.hero?.tags}</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/kurslar" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 32px', borderRadius: '10px', boxShadow: '0px 8px 28px rgba(255,44,168,0.45)' }}>{c.hero?.btn1} →</Link>
            <Link href="/elaqe" style={{ textDecoration: 'none', color: '#FF2CA8', fontWeight: 600, fontSize: '15px', padding: '16px 32px', borderRadius: '10px', border: '1px solid rgba(255,44,168,0.4)' }}>{c.hero?.btn2}</Link>
          </div>
        </div>
        <HeroVisual />
      </section>
      <CoursesSection />
      <HomeSections />
      <Footer />
    </main>
  );
}
