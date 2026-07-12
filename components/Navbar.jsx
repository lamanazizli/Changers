'use client';
import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Ana Səhifə' },
  { href: '/kurslar', label: 'Kurslar' },
  { href: '/neticeler', label: 'Tələbələr' },
  { href: '/mentorlar', label: 'Müəllimlər' },
  { href: '/elaqe', label: 'Əlaqə' },
  { href: '/korporativ', label: 'Korporativ' },
];

export default function Navbar({ activePage = 'Ana Səhifə' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{ background: '#0B0B0F', position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>
      <style>{`
        .nav-inner { padding: 20px 40px 0; }
        .nav-card { padding: 0 32px; }
        .desktop-nav { display: flex; }
        .mobile-nav-btn { display: none; }
        @media (max-width: 900px) {
          .nav-inner { padding: 12px 16px 0; }
          .nav-card { padding: 0 16px; height: 64px !important; }
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
          .nav-logo { height: 34px !important; width: auto !important; }
        }
      `}</style>
      <div className="nav-inner">
        <div className="nav-card" style={{ maxWidth: '1440px', margin: '0 auto', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', boxSizing: 'border-box' }}>
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <img className="nav-logo" src="/logo.png" alt="Changers Academy" style={{ height: '44px', width: '135px', objectFit: 'contain' }} />
          </Link>
          <div className="desktop-nav" style={{ alignItems: 'center', gap: '0' }}>
            {navLinks.map((link) => {
              const isActive = link.label === activePage;
              return (
                <div key={link.href} style={{ position: 'relative' }}>
                  <Link href={link.href} style={{ textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', color: isActive ? '#FF2CA8' : '#FFFFFF', padding: '0 18px', display: 'block', height: '76px', lineHeight: '76px', whiteSpace: 'nowrap' }}>
                    {link.label}
                  </Link>
                  {isActive && <div style={{ position: 'absolute', bottom: '18px', left: '18px', right: '18px', height: '2px', background: '#FF2CA8', borderRadius: '2px' }} />}
                </div>
              );
            })}
          </div>
          <Link href="/qeydiyyat" className="desktop-nav" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '13px', padding: '0 24px', borderRadius: '8px', height: '40px', lineHeight: '40px', whiteSpace: 'nowrap', alignItems: 'center' }}>
            Qeydiyyat →
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-nav-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '22px', height: '2px', background: '#FFFFFF' }} />
            <div style={{ width: '22px', height: '2px', background: '#FFFFFF' }} />
            <div style={{ width: '22px', height: '2px', background: '#FFFFFF' }} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div style={{ background: '#13131A', margin: '8px 16px 0', borderRadius: '16px', border: '1px solid rgba(255,44,168,0.15)', padding: '20px', boxSizing: 'border-box' }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{ display: 'block', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '16px', color: link.label === activePage ? '#FF2CA8' : '#FFFFFF', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {link.label}
            </Link>
          ))}
          <Link href="/qeydiyyat" onClick={() => setMenuOpen(false)} style={{ display: 'block', textAlign: 'center', textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '8px', marginTop: '16px' }}>
            Qeydiyyat →
          </Link>
        </div>
      )}
    </nav>
  );
}
