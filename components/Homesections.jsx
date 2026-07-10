'use client';
import Link from 'next/link';

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

export default function HomeSections() {
  return (
    <>
      <style>{`
        .cats-row { display: flex; flex-wrap: wrap; }
        .cat-item {
          text-decoration: none; display: flex; align-items: center; gap: 12px;
          padding: 32px 24px; flex: 1; box-sizing: border-box;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .cat-item:last-child { border-right: none; }
        @media (max-width: 900px) {
          .cat-item { flex: 0 0 50%; padding: 16px 12px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
        }
        .feature-card, .testimonial-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px; padding: 28px; box-sizing: border-box;
        }
        .feature-card { text-align: center; }
        .testimonial-card { border-color: rgba(255,44,168,0.15); }
        @media (max-width: 640px) {
          .feature-card, .testimonial-card { padding: 18px; }
        }
        .cta-box {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,44,168,0.2);
          border-radius: 24px; padding: 60px; display: flex;
          justify-content: space-between; align-items: center; gap: 60px; box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .cta-box { flex-direction: column; align-items: stretch; text-align: center; padding: 32px 20px; gap: 24px; }
        }
      `}</style>

      <section style={{ background: '#0B0B0F', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container cats-row" style={{ padding: 0 }}>
          {categories.map((cat, i) => (
            <Link key={i} href="/kurslar" className="cat-item">
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,44,168,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{cat.icon}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.name}</div>
                <div style={{ color: '#A0A0B0', fontSize: '11px', marginTop: '2px' }}>{cat.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: '#0B0B0F' }}>
        <div className="container">
          <h2 className="h2" style={{ color: '#FFFFFF', marginBottom: '32px' }}>Bizim fərqimiz</h2>
          <div className="grid-4">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{f.icon}</div>
                <div style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{f.title}</div>
                <div style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.4 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#0B0B0F' }}>
        <div className="container">
          <h2 className="h2" style={{ color: '#FFFFFF', marginBottom: '32px' }}>Məzunlarımız nə deyir?</h2>
          <div className="grid-3">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <p style={{ color: '#FFFFFF', fontSize: '14px', lineHeight: 1.6, margin: '0 0 16px 0' }}>"{t.text}"</p>
                <div style={{ color: '#FF2CA8', fontSize: '13px', fontWeight: 700 }}>{t.name}</div>
                <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{t.course}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#13131A' }}>
        <div className="container">
          <h2 className="h2" style={{ color: '#FFFFFF', marginBottom: '32px' }}>4 addımda karyerana başla!</h2>
          <div className="grid-4">
            {steps.map((s, i) => (
              <div key={i}>
                <div style={{ color: '#FF2CA8', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 900, marginBottom: '8px' }}>{s.n}</div>
                <div style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{s.title}</div>
                <div style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#0B0B0F' }}>
        <div className="container">
          <div className="cta-box">
            <h2 className="h2" style={{ color: '#FFFFFF' }}>
              Karyerana bu gün<br /><span style={{ color: '#FF2CA8' }}>başla!</span>
            </h2>
            <Link href="/qeydiyyat" style={{
              textDecoration: 'none', textAlign: 'center', background: '#FF2CA8', color: '#FFFFFF',
              fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px', whiteSpace: 'nowrap',
            }}>
              Qeydiyyatdan keç →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
