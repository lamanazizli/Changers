'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, BookOpen } from 'lucide-react';
import useIsMobile from '../lib/useIsMobile';
import useIsTablet from '../lib/useIsTablet';

const GRADIENTS = [
  'linear-gradient(135deg, rgba(255,44,168,0.3), rgba(123,47,255,0.4))',
  'linear-gradient(135deg, rgba(123,47,255,0.3), rgba(0,214,143,0.2))',
  'linear-gradient(135deg, rgba(0,214,143,0.25), rgba(123,47,255,0.2))',
  'linear-gradient(135deg, rgba(255,184,0,0.2), rgba(255,44,168,0.3))',
  'linear-gradient(135deg, rgba(45,125,210,0.3), rgba(123,47,255,0.3))',
  'linear-gradient(135deg, rgba(255,44,168,0.2), rgba(0,214,143,0.3))',
  'linear-gradient(135deg, rgba(123,47,255,0.4), rgba(45,125,210,0.3))',
];

function useCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch('/api/admin/courses')
      .then(r => r.json())
      .then(data => { if (data.courses) setCourses(data.courses); })
      .catch(() => {});
  }, []);
  return courses;
}

function Card({ course }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', height: '180px', flexShrink: 0, position: 'relative', overflow: 'hidden', background: course.image ? '#000' : (GRADIENTS[course.id % GRADIENTS.length]) }}>
        {course.image && <img src={course.image} alt={course.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
        <span style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 1, background: course.color || '#FF2CA8', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '100px' }}>
          {course.icon} {course.category}
        </span>
      </div>
      <div style={{ padding: '18px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#FFFFFF', margin: '0 0 10px 0' }}>{course.title}</h3>
        <p style={{ fontSize: '12px', color: '#A0A0B0', lineHeight: 1.6, margin: '0 0 18px 0', flex: 1 }}>{course.description || course.desc}</p>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0 0 14px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{ fontSize: '12px', color: '#A0A0B0', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Clock size={13} /> {course.duration}</span>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#FF2CA8' }}>{course.price}</span>
        </div>
        <Link href="/kurslar" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '13px', padding: '12px', borderRadius: '8px' }}>
          Ətraflı bax →
        </Link>
      </div>
    </div>
  );
}

function DesktopCourses() {
  const courses = useCourses();
  const isTablet = useIsTablet();
  return (
    <section style={{ background: '#0B0B0F', padding: '80px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: '56px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '6px 14px', fontSize: '12px', color: '#FF2CA8', fontWeight: 500, marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><BookOpen size={13} /> Kurslarımız</span>
          <h2 style={{ fontWeight: 700, fontSize: '40px', color: '#FFFFFF', margin: 0 }}>Peşəni seç,<br /><span style={{ color: '#FF2CA8' }}>karyerana başla</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '24px' }}>
          {courses.map(c => <Card key={c.id} course={c} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/kurslar" style={{ textDecoration: 'none', border: '1px solid rgba(255,44,168,0.4)', color: '#FF2CA8', fontWeight: 600, fontSize: '14px', padding: '14px 40px', borderRadius: '10px', display: 'inline-block' }}>
            Bütün kursları gör →
          </Link>
        </div>
      </div>
    </section>
  );
}

function MobileCourses() {
  const courses = useCourses();
  return (
    <section style={{ background: '#0B0B0F', padding: '40px 0' }}>
      <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: '24px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '5px 12px', fontSize: '11px', color: '#FF2CA8', fontWeight: 500, marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><BookOpen size={13} /> Kurslarımız</span>
          <h2 style={{ fontWeight: 700, fontSize: '24px', color: '#FFFFFF', margin: 0 }}>Peşəni seç,<br /><span style={{ color: '#FF2CA8' }}>karyerana başla</span></h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {courses.map(c => <Card key={c.id} course={c} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <Link href="/kurslar" style={{ textDecoration: 'none', border: '1px solid rgba(255,44,168,0.4)', color: '#FF2CA8', fontWeight: 600, fontSize: '13px', padding: '12px 32px', borderRadius: '10px', display: 'inline-block' }}>
            Bütün kursları gör →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function CoursesSection() {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  return isMobile ? <MobileCourses /> : <DesktopCourses />;
}
