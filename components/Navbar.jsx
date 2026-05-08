'use client';
import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Ana Səhifə' },
  { href: '/kurslar', label: 'Kurslar' },
  { href: '/neticeler', label: 'Nəticələr' },
  { href: '/mentorlar', label: 'Mentorlar' },
  { href: '/elaqe', label: 'Əlaqə' },
];

export default function Navbar({ activePage = 'Ana Səhifə' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{ background: '#0B0B0F', borderBottom: '1px solid rgba(255,44,168,0.15)', position: 'sticky', top: 0, zIndex: 100, width: '100%', height: '80px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <img src="/logo.png" alt="Changers Academy" style={{ height: '44px', width: '135px', objectFit: 'contain' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = link.label === activePage;
            return (
              <div key={link.href} style={{ position: 'relative' }}>
                <Link href={link.href} style={{ textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', color: isActive ? '#FF2CA8' : '#FFFFFF', padding: '0 20px', display: 'block', height: '80px', lineHeight: '80px', whiteSpace: 'nowrap' }}>
                  {link.label}
                </Link>
                {isActive && <div style={{ position: 'absolute', bottom: 0, left: '20px', right: '20px', height: '2px', background: '#FF2CA8', borderRadius: '2px' }} />}
              </div>
            );
          })}
        </div>
        <Link href="/qeydiyyat" className="desktop-nav" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '13px', padding: '0 24px', borderRadius: '8px', boxShadow: '0px 4px 16px rgba(255,44,168,0.45)', height: '40px', lineHeight: '40px', whiteSpace: 'nowrap' }}>
          Qeydiyyat →
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-nav" style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
          <div style={{ width: '24px', height: '2px', background: '#FFFFFF', margin: '4px 0' }} />
          <div style={{ width: '24px', height: '2px', background: '#FFFFFF', margin: '4px 0' }} />
          <div style={{ width: '24px', height: '2px', background: '#FFFFFF', margin: '4px 0' }} />
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: '#13131A', borderTop: '1px solid rgba(255,44,168,0.15)', padding: '20px 24px' }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{ display: 'block', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '16px', color: link.label === activePage ? '#FF2CA8' : '#FFFFFF', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {link.label}
            </Link>
          ))}
          <Link href="/qeydiyyat" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '8px', marginTop: '16px' }}>
            Qeydiyyat →
          </Link>
        </div>
      )}
      <style>{`@media(max-width:768px){.desktop-nav{display:none!important}.mobile-nav{display:block!important}}`}</style>
    </nav>
  );
}
