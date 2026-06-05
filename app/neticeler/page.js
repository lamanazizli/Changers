'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const telebeler = [
  {
    initials: 'AM', name: 'Ayten M.', color: '#FF2CA8',
    course: 'Digital Marketing', rating: 5,
    evvel: 'SMM bilgisi yox idi', indi: 'Freelance musteri tapdi',
    quote: '4 heftede SMM mutexessisi oldum. Changers menim karyeramı tamamilə deyisdi!',
    company: 'Freelance', salary: '+800 AZN/ay',
  },
  {
    initials: 'RE', name: 'Rauf E.', color: '#7B2FFF',
    course: 'BIM & Tikinti', rating: 5,
    evvel: 'Insaat fehilesi idi', indi: 'BIM menecer oldu',
    quote: 'Revit oyrendim, 2 ay sonra BIM menecer kimi ise dusdum.',
    company: 'Tikinti Sirketi', salary: '+1200 AZN/ay',
  },
  {
    initials: 'NH', name: 'Nermin H.', color: '#00D68F',
    course: 'Daxili Dizayn', rating: 5,
    evvel: 'Evdar xanim idi', indi: '3D dizayner oldu',
    quote: 'Portfolio-m ilk hefteden musteri celb etdi. Artiq oz studiyam var!',
    company: 'Oz Studiyasi', salary: '+1500 AZN/ay',
  },
  {
    initials: 'KM', name: 'Kamran M.', color: '#FFB800',
    course: 'Digital Marketing', rating: 5,
    evvel: 'Satici idi', indi: 'Marketing manager oldu',
    quote: 'Google Ads ve Meta Ads oyrendim. Ilk ayda 3 musteri tapdim.',
    company: 'Marketing Agency', salary: '+900 AZN/ay',
  },
  {
    initials: 'LH', name: 'Leyla H.', color: '#FF2CA8',
    course: 'Arxitektura & BIM', rating: 5,
    evvel: 'Teze mezun idi', indi: 'Arxitekt kimi isleyir',
    quote: 'Kurs bitenden 2 hefte sonra muesseseye qebul olundum.',
    company: 'Arxitektura Burosu', salary: '+1000 AZN/ay',
  },
  {
    initials: 'TA', name: 'Tural A.', color: '#7B2FFF',
    course: 'AutoCAD & Revit', rating: 5,
    evvel: 'Texniki ressam idi', indi: 'BIM spesialisti oldu',
    quote: 'AutoCAD-dan Revit-e kecidim ve karyeramda boyuk ireli addim atdim.',
    company: 'Muhendislik Sirketi', salary: '+1100 AZN/ay',
  },
];

export default function TelebelerPage() {
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Telebeler" />

      {/* Hero */}
      <section style={{ position: 'relative', padding: '100px 0 80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(circle, rgba(255,44,168,0.15) 0%, rgba(123,47,255,0.1) 40%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>MEZUNLARIMIZIN HEKAYELER</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '72px', color: '#FFFFFF', margin: '0 0 8px 0', lineHeight: 1.05 }}>Real Insanlar.</h1>
          <h1 style={{ fontWeight: 700, fontSize: '72px', color: '#FF2CA8', margin: '0 0 24px 0', lineHeight: 1.05 }}>Real Neticeler.</h1>
          <p style={{ fontSize: '18px', color: '#A0A0B0', margin: 0, maxWidth: '600px' }}>Her kes oz hekayesini yazdi — sifirdan mutexessise.</p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {[{ icon: '🏆', value: '500+', label: 'Mezun Sayi' }, { icon: '⭐', value: '4.9', label: 'Ortalama Reytinq' }, { icon: '💼', value: '90%', label: 'Ise Duzaldi' }, { icon: '⏱', value: '4 Hefte', label: 'Ortalama Kurs' }].map((s, i) => (
            <div key={i} style={{ padding: '36px 0', textAlign: 'center' }}>
              <span style={{ fontSize: '24px' }}>{s.icon}</span>
              <div style={{ fontWeight: 700, fontSize: '32px', color: '#FF2CA8', marginTop: '8px' }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: '#A0A0B0', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HR CTA - gozecarpan yerde */}
      <section style={{ padding: '60px 0', background: '#0B0B0F' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(0,214,143,0.1), rgba(123,47,255,0.08))', border: '1px solid rgba(0,214,143,0.25)', borderRadius: '24px', padding: '48px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '100px', padding: '6px 14px', marginBottom: '16px' }}>
                <span style={{ color: '#00D68F', fontSize: '12px', fontWeight: 600 }}>🏢 HR & Ise Qebul</span>
              </div>
              <h2 style={{ fontWeight: 700, fontSize: '32px', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.2 }}>
                Kadrınızı <span style={{ color: '#00D68F' }}>Bizdə Tapın</span>
              </h2>
              <p style={{ color: '#A0A0B0', fontSize: '15px', margin: '0 0 20px 0', lineHeight: 1.6 }}>
                500+ sertifikatlı məzunumuz arasından şirkətiniz üçün doğru namizədi tapırıq. İlk yerləşdirmə pulsuzdur.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['500+ Sertifikatlı Məzun', '6 Sahə', 'Pulsuz'].map((t, i) => (
                  <span key={i} style={{ background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.2)', color: '#00D68F', fontSize: '12px', fontWeight: 600, padding: '5px 12px', borderRadius: '100px' }}>✓ {t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
              <Link href="/hr" style={{ textDecoration: 'none', background: '#00D68F', color: '#0B0B0F', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px', boxShadow: '0px 8px 28px rgba(0,214,143,0.4)', textAlign: 'center', display: 'block' }}>
                Namizəd Tap →
              </Link>
              <a href="https://wa.me/994000000000" style={{ textDecoration: 'none', background: 'transparent', border: '1px solid rgba(0,214,143,0.3)', color: '#00D68F', fontWeight: 600, fontSize: '14px', padding: '14px 32px', borderRadius: '10px', textAlign: 'center' }}>
                💬 WhatsApp ile Yaz
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Telebeler Grid */}
      <section style={{ padding: '60px 0 100px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
              <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>ONE CIXAN HEKAYELER</span>
            </div>
            <h2 style={{ fontWeight: 700, fontSize: '44px', color: '#FFFFFF', margin: 0 }}>Zirvəyə Cıxan Mezunlar</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {telebeler.map((m, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                  <div style={{ width: '52px', height: '52px', background: m.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>{m.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '16px' }}>{m.name}</div>
                    <div style={{ background: m.color, color: '#FFFFFF', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', display: 'inline-block', marginTop: '4px' }}>{m.course}</div>
                  </div>
                  <div style={{ color: '#FFB800', fontSize: '13px' }}>{'★'.repeat(m.rating)}</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 14px' }}>
                    <div style={{ color: '#A0A0B0', fontSize: '10px', fontWeight: 600, marginBottom: '4px', letterSpacing: '1px' }}>EVVEL</div>
                    <div style={{ color: '#FFFFFF', fontSize: '13px' }}>{m.evvel}</div>
                  </div>
                  <div style={{ color: '#FF2CA8', fontSize: '20px' }}>→</div>
                  <div style={{ flex: 1, background: 'rgba(0,214,143,0.06)', border: '1px solid rgba(0,214,143,0.2)', borderRadius: '10px', padding: '10px 14px' }}>
                    <div style={{ color: '#00D68F', fontSize: '10px', fontWeight: 600, marginBottom: '4px', letterSpacing: '1px' }}>INDI</div>
                    <div style={{ color: '#FFFFFF', fontSize: '13px' }}>{m.indi}</div>
                  </div>
                </div>
                <p style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.7, margin: '0 0 20px 0', fontStyle: 'italic' }}>"{m.quote}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#A0A0B0', fontSize: '12px' }}>🏢 {m.company}</span>
                  <span style={{ color: '#00D68F', fontSize: '13px', fontWeight: 700 }}>{m.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#13131A', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '48px', color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.1 }}>
            Siradaki <span style={{ color: '#FF2CA8' }}>Ugur Hekayesi</span><br />Senin Olsun
          </h2>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 40px 0' }}>500+ mezunun yanina qos. Karyerani bu gun basla.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px', boxShadow: '0px 8px 28px rgba(255,44,168,0.45)' }}>Indi Baslat →</Link>
            <Link href="/kurslar" style={{ textDecoration: 'none', border: '1px solid rgba(255,44,168,0.4)', color: '#FF2CA8', fontWeight: 600, fontSize: '15px', padding: '16px 32px', borderRadius: '10px' }}>Kurslara Bax</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
