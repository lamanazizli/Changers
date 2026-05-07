'use client';
import Link from 'next/link';

const courses = [
  {
    id: 1,
    category: '🏗 Tikinti',
    categoryColor: '#FF2CA8',
    title: 'BIM & Tikinti İdarəetməsi',
    desc: 'AutoCAD, Revit, BIM 360 ilə real layihə əsaslı praktiki tədris kursu.',
    duration: '4 həftə',
    price: '299 AZN',
    gradient: 'linear-gradient(135deg, rgba(255,44,168,0.3), rgba(123,47,255,0.4))',
  },
  {
    id: 2,
    category: '📱 Digital Marketing',
    categoryColor: '#7B2FFF',
    title: 'Digital Marketing & SMM Pro',
    desc: 'Google Ads, Meta Ads, SEO, Analytics ilə kampaniya idarəetməsi kursu.',
    duration: '4 həftə',
    price: '249 AZN',
    gradient: 'linear-gradient(135deg, rgba(123,47,255,0.3), rgba(0,214,143,0.2))',
  },
  {
    id: 3,
    category: '🛋 Daxili Dizayn',
    categoryColor: '#00D68F',
    title: 'Interior Design & 3D Viz',
    desc: '3ds Max, Lumion, V-Ray ilə interior dizayn və vizualizasiya kursu.',
    duration: '5 həftə',
    price: '319 AZN',
    gradient: 'linear-gradient(135deg, rgba(0,214,143,0.25), rgba(123,47,255,0.2))',
  },
];

export default function CoursesSection() {
  return (
    <section style={{ background: '#0B0B0F', padding: '80px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
        {/* Section Header */}
        <div style={{ marginBottom: '56px' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(255,44,168,0.1)',
            border: '1px solid rgba(255,44,168,0.3)',
            borderRadius: '100px',
            padding: '6px 14px',
            fontSize: '12px',
            color: '#FF2CA8',
            fontWeight: 500,
            marginBottom: '16px',
          }}>📚 Kurslarımız</span>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '40px',
            color: '#FFFFFF',
            margin: 0,
          }}>
            Peşəni seç,<br />
            <span style={{ color: '#FF2CA8' }}>karyerana başla</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {courses.map((course) => (
            <div key={course.id} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,44,168,0.2)',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(255,44,168,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              {/* Card Image Area */}
              <div style={{
                height: '180px',
                background: course.gradient,
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                padding: '16px',
              }}>
                <span style={{
                  background: course.categoryColor,
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '5px 12px',
                  borderRadius: '100px',
                }}>
                  {course.category}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px 16px' }}>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#FFFFFF',
                  margin: '0 0 10px 0',
                }}>{course.title}</h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#A0A0B0',
                  lineHeight: 1.6,
                  margin: '0 0 20px 0',
                }}>{course.desc}</p>

                {/* Divider */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0 0 16px 0' }} />

                {/* Meta Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', color: '#A0A0B0' }}>⏱ {course.duration}</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#FF2CA8' }}>{course.price}</span>
                </div>

                {/* CTA */}
                <Link href="/kurslar" style={{
                  display: 'block',
                  textAlign: 'center',
                  textDecoration: 'none',
                  background: '#FF2CA8',
                  color: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  padding: '12px',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 16px rgba(255,44,168,0.35)',
                }}>
                  Ətraflı bax →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* All courses button */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/kurslar" style={{
            textDecoration: 'none',
            border: '1px solid rgba(255,44,168,0.4)',
            color: '#FF2CA8',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            padding: '14px 40px',
            borderRadius: '10px',
            display: 'inline-block',
          }}>
            Bütün kursları gör →
          </Link>
        </div>
      </div>
    </section>
  );
}
