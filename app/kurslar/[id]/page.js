'use client';
import { useState, useEffect, use } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import useIsMobile from '../../../lib/useIsMobile';
import { Clock, Users, Star, Lock, GraduationCap, MessageCircle } from 'lucide-react';
import { getCategoryIcon } from '../../../lib/categoryIcon';

const GRADIENTS = [
  'linear-gradient(135deg, rgba(255,44,168,0.4), rgba(123,47,255,0.5))',
  'linear-gradient(135deg, rgba(123,47,255,0.4), rgba(0,214,143,0.3))',
  'linear-gradient(135deg, rgba(0,214,143,0.4), rgba(123,47,255,0.3))',
  'linear-gradient(135deg, rgba(255,184,0,0.3), rgba(255,44,168,0.4))',
  'linear-gradient(135deg, rgba(45,125,210,0.4), rgba(123,47,255,0.4))',
];

function useCourse(params) {
  const resolvedParams = typeof params?.then === 'function' ? use(params) : params;
  const id = resolvedParams?.id;
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch('/api/admin/courses')
      .then(r => r.json())
      .then(data => {
        const found = (data.courses || []).find(c => String(c.id) === String(id));
        if (!found) { setCourse(null); return; }

        setCourse({
          category: found.category || '',
          color: found.color || '#FF2CA8',
          title: found.title || '',
          subtitle: found.subtitle || found.description || '',
          duration: found.duration || '',
          students: found.students || '',
          rating: found.rating || '',
          gradient: GRADIENTS[found.id % GRADIENTS.length],
          about: found.about || found.description || '',
          curriculum: Array.isArray(found.curriculum) ? found.curriculum : [],
          skills: found.skills ? found.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
          mentor: {
            name: found.mentor_name || 'Changers Academy',
            title: found.mentor_title || '',
            exp: found.mentor_exp || '',
            initials: found.mentor_initials || (found.title ? found.title[0] : 'C'),
          },
        });
      })
      .catch(() => setCourse(null));
  }, [id]);

  return course;
}

function DesktopCourseDetail({ course }) {
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Kurslar" />
      <section style={{ position: 'relative', overflow: 'hidden', padding: '48px 0 40px' }}>
        <div style={{ position: 'absolute', inset: 0, background: course.gradient, opacity: 0.15 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,11,15,0.5) 0%, rgba(11,11,15,0.95) 100%)' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', position: 'relative', zIndex: 1 }}>
          <span style={{ background: course.color, color: '#fff', fontSize: '11px', fontWeight: 700, padding: '5px 14px', borderRadius: '100px', marginBottom: '20px', display: 'inline-flex', alignItems: 'center' }}>
            {(() => { const Icon = getCategoryIcon(course.category); return <Icon size={13} style={{ marginRight: '4px' }} />; })()}{course.category}
          </span>
          <h1 style={{ fontWeight: 700, fontSize: '44px', color: '#FFFFFF', margin: '0 0 14px 0', lineHeight: 1.1 }}>{course.title}</h1>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 28px 0', lineHeight: 1.6, maxWidth: '600px' }}>{course.subtitle}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 32px', borderRadius: '10px' }}>İndi Qeydiyyatdan keç →</Link>
            <a href="https://wa.me/994102557555" style={{ textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 600, fontSize: '15px', padding: '16px 24px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}><MessageCircle size={16} /> WhatsApp</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {[
              course.duration && { value: course.duration, label: 'Kurs müddəti' },
              course.curriculum.length > 0 && { value: course.curriculum.length + '+', label: 'Tədris bloku' },
              course.skills.length > 0 && { value: course.skills.length + '+', label: 'Bacarıq' },
              course.rating && { value: course.rating, label: 'Reytinq' },
            ].filter(Boolean).slice(0, 4).map((stat, i) => (
              <div key={i}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#FF2CA8' }}>{stat.value}</span>
                <span style={{ fontSize: '13px', color: '#A0A0B0', marginLeft: '8px' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '60px' }}>
          <div>
            <div style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
                <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>KURS HAQQINDA</span>
              </div>
              <p style={{ fontSize: '16px', color: '#A0A0B0', lineHeight: 1.8 }}>{course.about}</p>
            </div>
            {course.curriculum.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ width: '40px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
                  <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>Tədris planı</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {course.curriculum.map((week, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                        <span style={{ background: 'rgba(255,44,168,0.15)', border: '1px solid rgba(255,44,168,0.3)', color: '#FF2CA8', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', flexShrink: 0 }}>{week.week}</span>
                        <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '15px' }}>{week.title}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {(week.topics || []).map((t, j) => <span key={j} style={{ background: 'rgba(255,255,255,0.06)', color: '#A0A0B0', fontSize: '12px', padding: '5px 12px', borderRadius: '6px' }}>{t}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {course.skills.length > 0 && (
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px', margin: '0 0 20px 0' }}>Öyrənəcəklərin</h3>
                {course.skills.map((skill, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <div style={{ width: '20px', height: '20px', background: 'rgba(255,44,168,0.15)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2CA8', fontSize: '9px', flexShrink: 0 }}>✓</div>
                    <span style={{ color: '#FFFFFF', fontSize: '14px' }}>{skill}</span>
                  </div>
                ))}
              </div>
            )}
            {course.mentor.name && course.mentor.name !== 'Changers Academy' && (
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px', margin: '0 0 20px 0' }}>Müəllim</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, rgba(255,44,168,0.3), rgba(123,47,255,0.3))', border: '2px solid rgba(255,44,168,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '18px', flexShrink: 0 }}>{course.mentor.initials}</div>
                  <div>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '16px' }}>{course.mentor.name}</div>
                    <div style={{ color: '#FF2CA8', fontSize: '12px', marginTop: '4px' }}>{course.mentor.title}</div>
                    <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{course.mentor.exp}</div>
                  </div>
                </div>
              </div>
            )}
            <div style={{ background: 'rgba(255,44,168,0.08)', border: '1px solid rgba(255,44,168,0.25)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <div style={{ marginBottom: '12px', color: '#FF2CA8', display: 'flex', justifyContent: 'center' }}><GraduationCap size={22} /></div>
              <p style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600, margin: '0 0 8px 0' }}>Hələ də sualın var?</p>
              <p style={{ color: '#A0A0B0', fontSize: '12px', margin: '0 0 16px 0' }}>Ödənişsiz konsultasiyaya gəl</p>
              <a href="https://wa.me/994102557555" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 700, fontSize: '13px', padding: '12px', borderRadius: '8px' }}><MessageCircle size={14} /> WhatsApp ilə əlaqə</a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function MobileCourseDetail({ course }) {
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Navbar activePage="Kurslar" />
      <section style={{ position: 'relative', overflow: 'hidden', padding: '20px 0 32px' }}>
        <div style={{ position: 'absolute', inset: 0, background: course.gradient, opacity: 0.15 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,11,15,0.5) 0%, rgba(11,11,15,0.95) 100%)' }} />
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', position: 'relative', zIndex: 1 }}>
          <span style={{ background: course.color, color: '#fff', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', marginBottom: '14px', display: 'inline-flex', alignItems: 'center' }}>
            {(() => { const Icon = getCategoryIcon(course.category); return <Icon size={13} style={{ marginRight: '4px' }} />; })()}{course.category}
          </span>
          <h1 style={{ fontWeight: 700, fontSize: '22px', color: '#FFFFFF', margin: '0 0 10px 0', lineHeight: 1.2 }}>{course.title}</h1>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: '0 0 20px 0', lineHeight: 1.6 }}>{course.subtitle}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <Link href="/qeydiyyat" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '10px' }}>İndi Qeydiyyatdan keç →</Link>
            <a href="https://wa.me/994102557555" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 600, fontSize: '14px', padding: '14px', borderRadius: '10px' }}><MessageCircle size={16} /> WhatsApp</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {[
              course.duration && { value: course.duration, label: 'Kurs müddəti' },
              course.curriculum.length > 0 && { value: course.curriculum.length + '+', label: 'Tədris bloku' },
              course.skills.length > 0 && { value: course.skills.length + '+', label: 'Bacarıq' },
              course.rating && { value: course.rating, label: 'Reytinq' },
            ].filter(Boolean).slice(0, 4).map((stat, i) => (
              <div key={i}>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#FF2CA8' }}>{stat.value}</span>
                <span style={{ fontSize: '11px', color: '#A0A0B0', marginLeft: '6px' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '30px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
              <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 600 }}>KURS HAQQINDA</span>
            </div>
            <p style={{ fontSize: '13px', color: '#A0A0B0', lineHeight: 1.7 }}>{course.about}</p>
          </div>
          {course.curriculum.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '30px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
                <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 600 }}>Tədris planı</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {course.curriculum.map((week, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      <span style={{ background: 'rgba(255,44,168,0.15)', border: '1px solid rgba(255,44,168,0.3)', color: '#FF2CA8', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px' }}>{week.week}</span>
                      <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '13px' }}>{week.title}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {(week.topics || []).map((t, j) => <span key={j} style={{ background: 'rgba(255,255,255,0.06)', color: '#A0A0B0', fontSize: '11px', padding: '4px 10px', borderRadius: '6px' }}>{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {course.skills.length > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '18px', marginBottom: '16px' }}>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '14px', margin: '0 0 14px 0' }}>Öyrənəcəklərin</h3>
              {course.skills.map((skill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <div style={{ width: '18px', height: '18px', background: 'rgba(255,44,168,0.15)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2CA8', fontSize: '8px', flexShrink: 0 }}>✓</div>
                  <span style={{ color: '#FFFFFF', fontSize: '13px' }}>{skill}</span>
                </div>
              ))}
            </div>
          )}
          {course.mentor.name && course.mentor.name !== 'Changers Academy' && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '18px', marginBottom: '16px' }}>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '14px', margin: '0 0 14px 0' }}>Müəllim</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, rgba(255,44,168,0.3), rgba(123,47,255,0.3))', border: '2px solid rgba(255,44,168,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', flexShrink: 0 }}>{course.mentor.initials}</div>
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '14px' }}>{course.mentor.name}</div>
                  <div style={{ color: '#FF2CA8', fontSize: '11px', marginTop: '2px' }}>{course.mentor.title}</div>
                  <div style={{ color: '#A0A0B0', fontSize: '11px', marginTop: '2px' }}>{course.mentor.exp}</div>
                </div>
              </div>
            </div>
          )}
          <div style={{ background: 'rgba(255,44,168,0.08)', border: '1px solid rgba(255,44,168,0.25)', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
            <div style={{ marginBottom: '10px', color: '#FF2CA8', display: 'flex', justifyContent: 'center' }}><GraduationCap size={20} /></div>
            <p style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600, margin: '0 0 6px 0' }}>Hələ də sualın var?</p>
            <p style={{ color: '#A0A0B0', fontSize: '11px', margin: '0 0 14px 0' }}>Ödənişsiz konsultasiyaya gəl</p>
            <a href="https://wa.me/994102557555" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 700, fontSize: '12px', padding: '12px', borderRadius: '8px' }}><MessageCircle size={14} /> WhatsApp ilə əlaqə</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function CourseDetail({ params }) {
  const isMobile = useIsMobile();
  const course = useCourse(params);
  if (isMobile === null || course === null) return <div style={{ background: '#0B0B0F', minHeight: '100vh' }} />;
  return isMobile ? <MobileCourseDetail course={course} /> : <DesktopCourseDetail course={course} />;
}
