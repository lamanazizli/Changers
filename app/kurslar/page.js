'use client';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import Footer from '../../components/Footer';

const courses = [
  {
    id: 1,
    category: 'Tikinti',
    icon: '🏗',
    color: '#FF2CA8',
    title: 'BIM & Tikinti idarəetməsi',
    desc: 'AutoCAD, Revit, BIM 360 ile real layihə əsaslı praktiki tədris kursu.',
    duration: '4 həftə',
    price: '299 AZN',
    gradient: 'linear-gradient(135deg, rgba(255,44,168,0.3), rgba(123,47,255,0.4))',
    topics: ['AutoCAD', 'Revit', 'BIM 360', 'Layihə idarəetməsi'],
  },
  {
    id: 2,
    category: 'Digital Marketing',
    icon: '📱',
    color: '#7B2FFF',
    title: 'Digital Marketing & SMM Pro',
    desc: 'Google Ads, Meta Ads, SEO, Analytics ilə kampaniya idarəetmesi.',
    duration: '4 həftə',
    price: '249 AZN',
    gradient: 'linear-gradient(135deg, rgba(123,47,255,0.3), rgba(0,214,143,0.2))',
    topics: ['Google Ads', 'Meta Ads', 'SEO', 'Analytics'],
  },
  {
    id: 3,
    category: 'Daxili Dizayn',
    icon: '🛋',
    color: '#00D68F',
    title: 'Interior Design & 3D Viz',
    desc: '3ds Max, Lumion, V-Ray ilə interior dizayn ve vizualizasiya.',
    duration: '5 həftə',
    price: '319 AZN',
    gradient: 'linear-gradient(135deg, rgba(0,214,143,0.25), rgba(123,47,255,0.2))',
    topics: ['3ds Max', 'Lumion', 'V-Ray', 'AutoCAD'],
  },
  {
    id: 4,
    category: 'Arxitektura',
    icon: '🏛',
    color: '#FFB800',
    title: 'Arxitektura & BIM',
    desc: 'Revit Architecture, ArchiCAD ve müasir layihə metodologiyaları.',
    duration: '6 hefte',
    price: '349 AZN',
    gradient: 'linear-gradient(135deg, rgba(255,184,0,0.25), rgba(255,44,168,0.2))',
    topics: ['Revit', 'ArchiCAD', 'SketchUp', 'BIM'],
  },
  {
    id: 5,
    category: 'BIM & AutoCAD',
    icon: '📐',
    color: '#FF2CA8',
    title: 'AutoCAD & Revit Master',
    desc: '2D ve 3D layihə çizimi, BIM texnologiyaları ve konstruksiya.',
    duration: '4 həftə',
    price: '279 AZN',
    gradient: 'linear-gradient(135deg, rgba(255,44,168,0.25), rgba(123,47,255,0.3))',
    topics: ['AutoCAD 2D', 'AutoCAD 3D', 'Revit MEP', 'BIM'],
  },
  {
    id: 6,
    category: 'Digital Marketing',
    icon: '📊',
    color: '#7B2FFF',
    title: 'E-Commerce & Dropshipping',
    desc: 'Online mağaza qurma, məhsul seçimi ve satış strategiyaları.',
    duration: '4 hefte',
    price: '229 AZN',
    gradient: 'linear-gradient(135deg, rgba(123,47,255,0.3), rgba(255,44,168,0.2))',
    topics: ['Shopify', 'WooCommerce', 'Facebook Ads', 'Email Marketing'],
  },
];

const categories = ['Hamısı', 'Tikinti', 'Digital Marketing', 'Daxili Dizayn', 'Arxitektura', 'BIM & AutoCAD'];

export default function KurslarPage() {
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Kurslar" />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(180deg, rgba(123,47,255,0.15) 0%, rgba(11,11,15,0) 100%)', padding: '80px 0 60px', textAlign: 'left', position: 'relative' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '8px 16px', marginBottom: '24px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 500 }}>📚 Bütün kurslar</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '56px', color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.1 }}>
            Peşəni seç,<br /><span style={{ color: '#FF2CA8' }}>Karyerana başla!</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 48px 0' }}>
            Real layihələr. Praktiki tədris. 4 həftədə peşəkar ol.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map((cat, i) => (
              <button key={i} style={{ background: i === 0 ? '#FF2CA8' : 'rgba(255,255,255,0.06)', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', padding: '10px 20px', color: '#FFFFFF', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'flex', justifyContent: 'space-around' }}>
          {[
            { v: '6+', l: 'Aktiv kurs' },
            { v: '500+', l: 'Məzun' },
            { v: '90%', l: 'İşə düzəldi' },
            { v: '4.9', l: 'Ortalama reytinq' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '28px 0', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '32px', color: '#FF2CA8' }}>{s.v}</div>
              <div style={{ fontSize: '13px', color: '#A0A0B0', marginTop: '4px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Grid */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {courses.map((course) => (
              <div key={course.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
              <Link href={'/kurslar/' + course.id} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
                <div style={{ height: '180px', background: course.gradient, position: 'relative', display: 'flex', alignItems: 'flex-start', padding: '16px' }}>
                  <span style={{ background: course.color, color: '#FFFFFF', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '100px' }}>
                    {course.icon} {course.category}
                  </span>
                  <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', gap: '6px' }}>
                    {course.topics.map((t, i) => (
                      <span key={i} style={{ background: 'rgba(0,0,0,0.4)', color: '#FFFFFF', fontSize: '10px', padding: '4px 8px', borderRadius: '4px' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '17px', color: '#FFFFFF', margin: '0 0 10px 0' }}>{course.title}</h3>
                  <p style={{ fontSize: '13px', color: '#A0A0B0', lineHeight: 1.6, margin: '0 0 20px 0' }}>{course.desc}</p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0 0 16px 0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#A0A0B0' }}>⏱ {course.duration}</span>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: '#FF2CA8' }}>{course.price}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link href="/qeydiyyat" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '13px', padding: '12px', borderRadius: '8px', boxShadow: '0px 4px 16px rgba(255,44,168,0.35)' }}>
                      Qeydiyyat →
                    </Link>
                    <Link href={'/kurslar/' + course.id} style={{ padding: '12px 16px', background: 'transparent', border: '1px solid rgba(255,44,168,0.4)', borderRadius: '8px', color: '#FF2CA8', fontSize: '13px', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>Ətraflı</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#13131A', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '40px', color: '#FFFFFF', margin: '0 0 16px 0' }}>
            Hansı kursu seçəcəyini <span style={{ color: '#FF2CA8' }}>bilmirsən?</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 32px 0' }}> Konsultasiya al, sənin üçün ən uyğun kursu birlikdə seçək.</p>
          <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px', boxShadow: '0px 8px 28px rgba(255,44,168,0.45)', display: 'inline-block' }}>
            Ödənişsiz konsultasiya al →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
