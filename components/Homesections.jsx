'use client';
import React from 'react';
import Link from 'next/link';


export default function HomeSections() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .home-section { padding: 60px 20px !important; }
          .home-grid-4 { grid-template-columns: 1fr 1fr !important; }
          .home-grid-3 { grid-template-columns: 1fr !important; }
          .home-steps { grid-template-columns: 1fr 1fr !important; }
          .home-cta { flex-direction: column !important; padding: 32px 20px !important; }
          .home-cta-form { max-width: 100% !important; }
          .home-cats { flex-wrap: wrap !important; padding: 0 20px !important; }
          .home-cat-item { flex: 0 0 calc(50% - 6px) !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; padding: 20px 12px !important; }
          .home-stats-row { flex-wrap: wrap !important; gap: 24px !important; }
          .home-h2 { font-size: 28px !important; }
        }
        @media (max-width: 480px) {
          .home-grid-4 { grid-template-columns: 1fr !important; }
          .home-steps { grid-template-columns: 1fr !important; }
          .home-cat-item { flex: 0 0 100% !important; }
        }
      `}</style>
      <section style={{ background: '#0B0B0F', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 80px', display: 'flex', justifyContent: 'space-between', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
          {[
            { icon: '🏗', name: 'Tikinti', sub: 'İnşaat & Layihə' },
            { icon: '🏛', name: 'Arxitektura', sub: 'Dizayn & BIM' },
            { icon: '📱', name: 'Digital Marketing', sub: 'SMM & Ads' },
            { icon: '🛋', name: 'Daxili Dizayn', sub: 'Interior & 3D' },
            { icon: '📐', name: 'BIM & AutoCAD', sub: 'Revit & CAD' },
          ].map((cat, i) => (
            <Link key={i} href="/kurslar" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: isMobile ? '16px 12px' : '32px 24px', flex: isMobile ? '0 0 calc(50% - 6px)' : 1, borderRight: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ width: '44px', height: '44px', background: 'rgba(255,44,168,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{cat.icon}</div>
              <div>
                <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>{cat.name}</div>
                <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{cat.sub}</div>
              </div>
              <span style={{ color: '#FF2CA8', marginLeft: 'auto' }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: isMobile ? '60px 0' : '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 80px' }}>
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
              <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>NİYƏ CHANGERS?</span>
            </div>
            <h2 style={{ fontSize: isMobile ? '28px' : '44px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Bizim fərqimiz</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { icon: '🎯', title: 'Real layihələr', desc: 'Hər kurs real sektoral layihələr üzərindən keçir.' },
              { icon: '🧑‍💼', title: 'Mentorluq dəstəyi', desc: 'Sahə mütəxəssisləri ilə birəbir mentorluq seansları.' },
              { icon: '💼', title: 'Karyera dəstəyi', desc: 'CV hazırlığı, müsahibə simulyasiyası ve iş bağlantıları.' },
              { icon: '📜', title: 'Sertifikat', desc: 'Sektorda tanınan rəsmi sertifikat verilir.' },
            ].map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px 24px' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(255,44,168,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px' }}>{f.icon}</div>
                <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0' }}>{f.title}</h3>
                <p style={{ color: '#A0A0B0', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: isMobile ? '60px 0' : '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 80px' }}>
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
              <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>NƏTİCƏLƏR</span>
            </div>
            <h2 style={{ fontSize: isMobile ? '28px' : '44px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 32px 0' }}>Məzunlarımız nə deyir?</h2>
            <div style={{ display: 'flex', gap: '48px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {[{ v: '500+', l: 'Məzun sayı' }, { v: '4 həftə', l: 'Ortalama kurs' }, { v: '90%', l: 'İşə düzəldi' }, { v: '4.9', l: 'Ortalama reytinq' }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#FF2CA8' }}>{s.v}</div>
                  <div style={{ fontSize: '13px', color: '#A0A0B0', marginTop: '4px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { q: '4 həftədə SMM mütəxəssisi oldum. İlk ayda freelance iş tapdım!', name: 'Aytən Məmmədova', course: 'Digital Marketing', initials: 'AM', color: '#FF2CA8' },
              { q: 'Revit öyrəndim, layihəm ilə müsabiqədə 1-ci yerə gəldim.', name: 'Rauf Əliyev', course: 'BIM & Tikinti', initials: 'RE', color: '#7B2FFF' },
              { q: 'Portfolio-m ilk həftədən müştəri cəlb etdi. Changers möcüzədir!', name: 'Nərmin Hüseynova', course: 'Daxili Dizayn', initials: 'NH', color: '#00D68F' },
            ].map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px 24px' }}>
                <div style={{ color: '#FF2CA8', fontSize: '48px', lineHeight: 0.8, marginBottom: '16px' }}>"</div>
                <div style={{ color: '#FFB800', fontSize: '14px', marginBottom: '12px' }}>★★★★★</div>
                <p style={{ color: '#FFFFFF', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px 0' }}>{t.q}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', background: t.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '13px' }}>{t.initials}</div>
                  <div>
                    <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>{t.name}</div>
                    <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{t.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#13131A', padding: isMobile ? '60px 0' : '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 80px' }}>
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
              <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>NECƏ İŞLƏYİR?</span>
            </div>
            <h2 style={{ fontSize: isMobile ? '28px' : '44px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>4 addımda karyerana başla!</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { num: '01', icon: '📋', title: 'Qeydiyyatdan keç', desc: 'Formu doldur, kurs seç, konsultasiya al.' },
              { num: '02', icon: '📚', title: 'Tədrisə başla', desc: 'Canlı dərslər + video dəstək + mentor.' },
              { num: '03', icon: '🛠', title: 'Layihə hazırla', desc: 'Real sektoral layihəni tamamla.' },
              { num: '04', icon: '🎓', title: 'Sertifikat al', desc: 'İşə düzəl, portfelin hazır olsun.' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(255,44,168,0.15)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2CA8', fontSize: '13px', fontWeight: 700 }}>{s.num}</div>
                  <span style={{ fontSize: '28px' }}>{s.icon}</span>
                </div>
                <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0' }}>{s.title}</h3>
                <p style={{ color: '#A0A0B0', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: isMobile ? '60px 0' : '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 80px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '24px', padding: '60px', display: 'flex', justifyContent: 'space-between', flexWrap: isMobile ? 'wrap' : 'nowrap', alignItems: 'center', gap: '60px' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.1 }}>Karyerana bu gün<br /><span style={{ color: '#FF2CA8' }}>başla!</span></h2>
              <p style={{ color: '#A0A0B0', fontSize: '16px', margin: '0 0 24px 0' }}>Qeydiyyatdan keç, ödənişsiz konsultasiya al.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Öhdəliksiz', 'Ödənişsiz məsləhət', 'Dərhal cavab'].map((t, i) => (
                  <span key={i} style={{ color: '#A0A0B0', fontSize: '14px' }}>✓ {t}</span>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, maxWidth: isMobile ? '100%' : '420px' }}>
              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input placeholder="Ad, Soyadınız" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '16px 20px', color: '#FFFFFF', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                <input placeholder="Telefon nömrəsi" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '16px 20px', color: '#FFFFFF', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                <select style={{ background: 'rgba(20,20,30,1)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '16px 20px', color: '#A0A0B0', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box' }}>
                  <option value="">Kurs seçin</option>
                  <option>BIM & Tikinti idarəetməsi</option>
                  <option>Digital Marketing & SMM Pro</option>
                  <option>Interior Design & 3D Viz</option>
                  <option>AutoCAD & Revit Master</option>
                </select>
                <button type="submit" style={{ background: '#FF2CA8', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '0px 8px 28px rgba(255,44,168,0.45)' }}>Qeydiyyatdan keç →</button>
                <div style={{ textAlign: 'center', color: '#A0A0B0', fontSize: '13px' }}>🔒 Bütün məlumatlar qorunur</div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
