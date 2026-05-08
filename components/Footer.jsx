'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#13131A', borderTop: '1px solid rgba(255,44,168,0.15)', padding: '60px 80px 40px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ maxWidth: '300px' }}>
            <img src="/logo.png" alt="Changers Academy" style={{ height: '40px', width: 'auto', marginBottom: '16px' }} />
            <p style={{ fontSize: '14px', color: '#A0A0B0', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              Azerbaycanin #1 praktiki tehsil platformasi. Real layiheler, real neticeler.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Instagram', 'LinkedIn', 'WhatsApp'].map((s, i) => (
                <a key={i} href="#" style={{ width: '36px', height: '36px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2CA8', fontSize: '11px', textDecoration: 'none', fontWeight: 600 }}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>Kurslar</div>
              {['BIM & Tikinti', 'Digital Marketing', 'Interior Design', 'AutoCAD & Revit', 'Arxitektura'].map((item, i) => (
                <Link key={i} href="/kurslar" style={{ display: 'block', color: '#A0A0B0', fontSize: '13px', textDecoration: 'none', marginBottom: '10px' }}>{item}</Link>
              ))}
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>Servis</div>
              {[
                { label: 'Ana Sehife', href: '/' },
                { label: 'Kurslar', href: '/kurslar' },
                { label: 'Neticeler', href: '/neticeler' },
                { label: 'Mentorlar', href: '/mentorlar' },
                { label: 'Elaqe', href: '/elaqe' },
              ].map((item, i) => (
                <Link key={i} href={item.href} style={{ display: 'block', color: '#A0A0B0', fontSize: '13px', textDecoration: 'none', marginBottom: '10px' }}>{item.label}</Link>
              ))}
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>Elaqe</div>
              <div style={{ color: '#A0A0B0', fontSize: '13px', marginBottom: '10px' }}>📍 Baki, Azerbaycan</div>
              <div style={{ color: '#A0A0B0', fontSize: '13px', marginBottom: '10px' }}>📞 +994 XX XXX XX XX</div>
              <div style={{ color: '#A0A0B0', fontSize: '13px', marginBottom: '10px' }}>✉️ info@changers.az</div>
              <Link href="/qeydiyyat" style={{ display: 'inline-block', marginTop: '8px', textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '13px', padding: '10px 20px', borderRadius: '8px', boxShadow: '0px 4px 16px rgba(255,44,168,0.35)' }}>
                Qeydiyyat →
              </Link>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: 0 }}>© 2024 Changers Academy. Butun huquqlar qorunur.</p>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: 0 }}>changers.az</p>
        </div>
      </div>
    </footer>
  );
}
