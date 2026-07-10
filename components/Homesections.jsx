'use client';
import Link from 'next/link';
import useIsMobile from '../lib/useIsMobile';

const categories = [
  { icon: '🏗', name: 'Tikinti', sub: 'İnşaat & Layihə' },
  { icon: '🏛', name: 'Arxitektura', sub: 'Dizayn & BIM' },
  { icon: '📱', name: 'Digital Marketing', sub: 'SMM & Ads' },
  { icon: '🛋', name: 'Daxili Dizayn', sub: 'Interior & 3D' },
  { icon: '📐', name: 'BIM & AutoCAD', sub: 'Revit & CAD' },
];
const features = [
  { icon: '🎯', title: 'Real Layihələr', desc: 'Nəzəri deyil, real işlərlə öyrən' },
  { icon: '👨‍🏫', title: 'Sahə Mütəxəssisləri', desc: 'Təcrübəli mentorlardan öyrən' },
  { icon: '💼', title: 'Karyera Dəstəyi', desc: 'İşə düzəlməkdə köməklik' },
  { icon: '🏆', title: 'Sertifikat', desc: 'Rəsmi bitirmə sertifikatı' },
];
const testimonials = [
  { name: 'Aygün M.', course: 'Tikinti', text: 'Kursdan sonra dərhal işə düzəldim!' },
  { name: 'Rəşad Q.', course: 'BIM & AutoCAD', text: 'Praktiki biliklər çox faydalı oldu.' },
  { name: 'Nərmin S.', course: 'Digital Marketing', text: 'Mentorlar çox köməkçi idi.' },
];
const steps = [
  { n: '01', title: 'Kurs seç', desc: 'Sənə uyğun proqramı tap' },
  { n: '02', title: 'Qeydiyyat', desc: 'Formu doldur, əlaqə saxlayaq' },
  { n: '03', title: 'Öyrən', desc: 'Praktiki layihələrlə inkişaf et' },
  { n: '04', title: 'İşə başla', desc: 'Yeni karyerana start ver' },
];

function DesktopSections() {
  return (
    <>
      <section style={{ background: '#0B0B0F', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'flex', boxSizing: 'border-box' }}>
          {categories.map((cat, i) => (
            <Link key={i} href="/kurslar" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: '32px 24px', flex: 1, borderRight: i < categories.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ width: '44px', height: '44px', background: 'rgba(255,44,168,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{cat.icon}</div>
              <div>
                <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>{cat.name}</div>
                <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{cat.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '44px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 32px 0' }}>Bizim fərqimiz</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{f.icon}</div>
                <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{f.title}</div>
                <div style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.4 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '44px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 32px 0' }}>Məzunlarımız nə deyir?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.15)', borderRadius: '16px', padding: '28px' }}>
                <p style={{ color: '#FFFFFF', fontSize: '14px', lineHeight: 1.6, margin: '0 0 16px 0' }}>"{t.text}"</p>
                <div style={{ color: '#FF2CA8', fontSize: '13px', fontWeight: 700 }}>{t.name}</div>
                <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{t.course}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#13131A', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '44px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 32px 0' }}>4 addımda karyerana başla!</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {steps.map((s, i) => (
              <div key={i}>
                <div style={{ color: '#FF2CA8', fontSize: '32px', fontWeight: 900, marginBottom: '8px' }}>{s.n}</div>
                <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{s.title}</div>
                <div style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '24px', padding: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '60px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#FFFFFF', margin: 0, lineHeight: 1.1 }}>Karyerana bu gün<br /><span style={{ color: '#FF2CA8' }}>başla!</span></h2>
            <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px', whiteSpace: 'nowrap' }}>Qeydiyyatdan keç →</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function MobileSections() {
  return (
    <>
      <section style={{ background: '#0B0B0F', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', boxSizing: 'border-box' }}>
          {categories.map((cat, i) => (
            <Link key={i} href="/kurslar" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 10px', width: '50%', boxSizing: 'border-box', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: '36px', height: '36px', background: 'rgba(255,44,168,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{cat.icon}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.name}</div>
                <div style={{ color: '#A0A0B0', fontSize: '10px', marginTop: '2px' }}>{cat.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: '40px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 20px 0' }}>Bizim fərqimiz</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ fontSize: '26px', flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700, marginBottom: '3px' }}>{f.title}</div>
                  <div style={{ color: '#A0A0B0', fontSize: '12px', lineHeight: 1.4 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: '40px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 20px 0' }}>Məzunlarımız nə deyir?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.15)', borderRadius: '14px', padding: '18px' }}>
                <p style={{ color: '#FFFFFF', fontSize: '13px', lineHeight: 1.6, margin: '0 0 12px 0' }}>"{t.text}"</p>
                <div style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 700 }}>{t.name}</div>
                <div style={{ color: '#A0A0B0', fontSize: '11px', marginTop: '2px' }}>{t.course}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#13131A', padding: '40px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 20px 0' }}>4 addımda karyerana başla!</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {steps.map((s, i) => (
              <div key={i}>
                <div style={{ color: '#FF2CA8', fontSize: '22px', fontWeight: 900, marginBottom: '6px' }}>{s.n}</div>
                <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{s.title}</div>
                <div style={{ color: '#A0A0B0', fontSize: '11px', lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: '40px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '18px', padding: '28px 20px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 20px 0', lineHeight: 1.2 }}>Karyerana bu gün<br /><span style={{ color: '#FF2CA8' }}>başla!</span></h2>
            <Link href="/qeydiyyat" style={{ display: 'inline-block', textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '14px', padding: '14px 32px', borderRadius: '10px' }}>Qeydiyyatdan keç →</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function HomeSections() {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  return isMobile ? <MobileSections /> : <DesktopSections />;
}
