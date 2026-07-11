'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import useIsMobile from '../../lib/useIsMobile';
import useIsTablet from '../../lib/useIsTablet';
import { Clock, BookOpen } from 'lucide-react';

const categories = ['Hamısı', 'Tikinti', 'Digital Marketing', 'Daxili Dizayn', 'Arxitektura', 'BIM & AutoCAD'];
const GRADIENTS = [
  'linear-gradient(135deg, rgba(255,44,168,0.3), rgba(123,47,255,0.4))',
  'linear-gradient(135deg, rgba(123,47,255,0.3), rgba(0,214,143,0.2))',
  'linear-gradient(135deg, rgba(0,214,143,0.25), rgba(123,47,255,0.2))',
  'linear-gradient(135deg, rgba(255,184,0,0.2), rgba(255,44,168,0.3))',
  'linear-gradient(135deg, rgba(45,125,210,0.3), rgba(123,47,255,0.3))',
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

function CourseCard({ course }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '16px', overflow: 'hidden', position: 'relative', width: '100%', boxSizing: 'border-box' }}>
      <Link href={'/kurslar/' + course.id} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
      <div style={{ height: '180px', background: course.image ? '#000' : GRADIENTS[course.id % GRADIENTS.length], position: 'relative', overflow: 'hidden' }}>
        {course.image && <img src={course.image} alt={course.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
        <span style={{ position: 'absolute', top: '16px', left: '16px', background: course.color || '#FF2CA8', color: '#FFFFFF', fontSize: '11px', fontWeight: 700, padding: '5px 12px', borderRadius: '100px' }}>
          {course.icon} {course.category}
        </span>
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontWeight: 700, fontSize: '17px', color: '#FFFFFF', margin: '0 0 10px 0' }}>{course.title}</h3>
        <p style={{ fontSize: '13px', color: '#A0A0B0', lineHeight: 1.6, margin: '0 0 20px 0' }}>{course.description || course.desc}</p>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0 0 16px 0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: '#A0A0B0', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {course.duration}</span>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#FF2CA8' }}>{course.price}</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/qeydiyyat" style={{ position: 'relative', zIndex: 2, flex: 1, textAlign: 'center', textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '13px', padding: '12px', borderRadius: '8px' }}>
            Qeydiyyat →
          </Link>
          <Link href={'/kurslar/' + course.id} style={{ position: 'relative', zIndex: 2, padding: '12px 16px', background: 'transparent', border: '1px solid rgba(255,44,168,0.4)', borderRadius: '8px', color: '#FF2CA8', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>Ətraflı</Link>
        </div>
      </div>
    </div>
  );
}

function DesktopKurslar() {
  const courses = useCourses();
  const isTablet = useIsTablet();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Kurslar" />
      <section style={{ background: 'linear-gradient(180deg, rgba(123,47,255,0.15) 0%, rgba(11,11,15,0) 100%)', padding: '80px 0 60px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '8px 16px', marginBottom: '24px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><BookOpen size={14} /> Bütün kurslar</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '56px', color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.1 }}>
            Peşəni seç,<br /><span style={{ color: '#FF2CA8' }}>Karyerana başla!</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 48px 0' }}>Real layihələr. Praktiki tədris. 4 həftədə peşəkar ol.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {categories.map((cat, i) => (
              <button key={i} style={{ background: i === 0 ? '#FF2CA8' : 'rgba(255,255,255,0.06)', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', padding: '10px 20px', color: '#FFFFFF', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>{cat}</button>
            ))}
          </div>
        </div>
      </section>
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'flex', justifyContent: 'space-around' }}>
          {[{ v: '6+', l: 'Aktiv kurs' }, { v: '500+', l: 'Məzun' }, { v: '90%', l: 'İşə düzəldi' }, { v: '4.9', l: 'Ortalama reytinq' }].map((s, i) => (
            <div key={i} style={{ padding: '28px 0', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '32px', color: '#FF2CA8' }}>{s.v}</div>
              <div style={{ fontSize: '13px', color: '#A0A0B0', marginTop: '4px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '24px' }}>
            {courses.map(c => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '40px', color: '#FFFFFF', margin: '0 0 16px 0' }}>
            Hansı kursu seçəcəyini <span style={{ color: '#FF2CA8' }}>bilmirsən?</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 32px 0' }}>Konsultasiya al, sənin üçün ən uyğun kursu birlikdə seçək.</p>
          <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px', display: 'inline-block' }}>Ödənişsiz konsultasiya al →</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function MobileKurslar() {
  const courses = useCourses();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Navbar activePage="Kurslar" />
      <section style={{ background: 'linear-gradient(180deg, rgba(123,47,255,0.15) 0%, rgba(11,11,15,0) 100%)', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '6px 12px', marginBottom: '16px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><BookOpen size={14} /> Bütün kurslar</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '30px', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.15 }}>
            Peşəni seç,<br /><span style={{ color: '#FF2CA8' }}>Karyerana başla!</span>
          </h1>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: '0 0 24px 0' }}>Real layihələr. Praktiki tədris.</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat, i) => (
              <button key={i} style={{ background: i === 0 ? '#FF2CA8' : 'rgba(255,255,255,0.06)', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', padding: '8px 14px', color: '#FFFFFF', fontSize: '11px', fontWeight: 500 }}>{cat}</button>
            ))}
          </div>
        </div>
      </section>
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[{ v: '6+', l: 'Aktiv kurs' }, { v: '500+', l: 'Məzun' }, { v: '90%', l: 'İşə düzəldi' }, { v: '4.9', l: 'Reytinq' }].map((s, i) => (
            <div key={i} style={{ padding: '16px 0', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '22px', color: '#FF2CA8' }}>{s.v}</div>
              <div style={{ fontSize: '11px', color: '#A0A0B0', marginTop: '4px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {courses.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '22px', color: '#FFFFFF', margin: '0 0 12px 0' }}>
            Hansı kursu seçəcəyini <span style={{ color: '#FF2CA8' }}>bilmirsən?</span>
          </h2>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: '0 0 20px 0' }}>Konsultasiya al, sənə uyğun kursu seçək.</p>
          <Link href="/qeydiyyat" style={{ display: 'inline-block', textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '14px', padding: '14px 28px', borderRadius: '10px' }}>Ödənişsiz konsultasiya al →</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function KurslarPage() {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  return isMobile ? <MobileKurslar /> : <DesktopKurslar />;
}
