'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

function useCourseNames() {
  const [names, setNames] = useState([]);
  useEffect(() => {
    fetch('/api/admin/courses')
      .then(r => r.json())
      .then(data => {
        if (data.courses) {
          setNames(data.courses.filter(c => c.is_active !== false).slice(0, 5).map(c => ({ title: c.title, id: c.id })));
        }
      })
      .catch(() => {});
  }, []);
  return names;
}

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const courses = useCourseNames();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const pages = [
    { label: 'Ana Səhifə', href: '/' },
    { label: 'Kurslar', href: '/kurslar' },
    { label: 'Tələbələr', href: '/neticeler' },
    { label: 'Mentorlar', href: '/mentorlar' },
    { label: 'Əlaqə', href: '/elaqe' },
    { label: 'Korporativ', href: '/korporativ' },
  ];

  return (
    <footer style={{ background: '#13131A', borderTop: '1px solid rgba(255,44,168,0.15)', padding: isMobile ? '40px 16px 24px' : '60px 80px 40px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isMobile ? '32px' : '48px', flexWrap: 'wrap', gap: isMobile ? '28px' : '40px' }}>
          <div style={{ maxWidth: '300px' }}>
            <img src="/logo.png" alt="Changers Academy" style={{ height: '36px', width: 'auto', marginBottom: '16px' }} />
            <p style={{ fontSize: '13px', color: '#A0A0B0', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              Praktiki tədris mərkəzi.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://www.instagram.com/changers.az/" target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2CA8', textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/changers-academy-1/" target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2CA8', textDecoration: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
              </a>
              <a href="https://wa.me/994102557555" target="_blank" rel="noopener noreferrer" style={{ width: '36px', height: '36px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2CA8', textDecoration: 'none' }}>
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', gap: isMobile ? '32px' : '60px', flexWrap: 'wrap', width: isMobile ? '100%' : 'auto' }}>
            <div style={{ flex: isMobile ? '1 1 40%' : 'none' }}>
              <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>Kurslar</div>
              {courses.length > 0 ? courses.map((c) => (
                <Link key={c.id} href={'/kurslar/' + c.id} style={{ display: 'block', color: '#A0A0B0', fontSize: '13px', textDecoration: 'none', marginBottom: '10px' }}>{c.title}</Link>
              )) : (
                <Link href="/kurslar" style={{ display: 'block', color: '#A0A0B0', fontSize: '13px', textDecoration: 'none', marginBottom: '10px' }}>Bütün kurslar</Link>
              )}
            </div>
            <div style={{ flex: isMobile ? '1 1 40%' : 'none' }}>
              <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>Səhifələr</div>
              {pages.map((item, i) => (
                <Link key={i} href={item.href} style={{ display: 'block', color: '#A0A0B0', fontSize: '13px', textDecoration: 'none', marginBottom: '10px' }}>{item.label}</Link>
              ))}
            </div>
            <div style={{ flex: isMobile ? '1 1 100%' : 'none' }}>
              <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>Əlaqə</div>
              <div style={{ color: '#A0A0B0', fontSize: '13px', marginBottom: '10px', display: 'flex', alignItems: 'flex-start', gap: '6px', maxWidth: '280px' }}><MapPin size={14} style={{ flexShrink: 0, marginTop: '2px' }} /> İnşaatçılar metrostansiyasının yaxınlığı, Abbas Mirzə Şərifzadə küçəsi 110, Bakı</div>
              <div style={{ color: '#A0A0B0', fontSize: '13px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> +994 10 255 75 55</div>
              <div style={{ color: '#A0A0B0', fontSize: '13px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> info@changers.az</div>
              <Link href="/qeydiyyat" style={{ display: 'inline-block', marginTop: '8px', textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '13px', padding: '10px 20px', borderRadius: '8px' }}>
                Qeydiyyat →
              </Link>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '8px' }}>
          <p style={{ fontSize: '12px', color: '#A0A0B0', margin: 0 }}>© 2024 Changers Academy. Bütün hüquqlar qorunur.</p>
          <p style={{ fontSize: '12px', color: '#A0A0B0', margin: 0 }}>changers.az</p>
        </div>
      </div>
    </footer>
  );
}
