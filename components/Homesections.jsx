'use client';
import Link from 'next/link';
import useIsMobile from '../lib/useIsMobile';
import useIsTablet from '../lib/useIsTablet';
import { useState, useEffect } from 'react';
import { Target, GraduationCap, Briefcase, Award, Star, Building2, MessageCircle, Play } from 'lucide-react';

const features = [
  { icon: Target, title: 'Real Layihələr', desc: 'Nəzəri deyil, real işlərlə öyrən' },
  { icon: GraduationCap, title: 'Sahə Mütəxəssisləri', desc: 'Təcrübəli mentorlardan öyrən' },
  { icon: Briefcase, title: 'Karyera Dəstəyi', desc: 'İşə düzəlməkdə köməklik' },
  { icon: Award, title: 'Sertifikat', desc: 'Rəsmi bitirmə sertifikatı' },
];
const testimonials = [
  { name: 'Aygün M.', course: 'Tikinti', text: 'Kursdan sonra dərhal işə düzəldim! Praktiki biliklər real layihədə çox işimə yaradı.', color: '#FF00B7', initials: 'AM' },
  { name: 'Rəşad Q.', course: 'BIM & AutoCAD', text: 'Praktiki biliklər çox faydalı oldu. Mentorlar hər sualıma səbrlə cavab verdi.', color: '#0077FF', initials: 'RQ' },
  { name: 'Nərmin S.', course: 'Digital Marketing', text: 'Mentorlar çox köməkçi idi. 4 həftədə real müştəri layihəsi üzərində işlədim.', color: '#25DADA', initials: 'NS' },
];
const steps = [
  { n: '01', title: 'Kurs seç', desc: 'Sənə uyğun proqramı tap' },
  { n: '02', title: 'Qeydiyyat', desc: 'Formu doldur, əlaqə saxlayaq' },
  { n: '03', title: 'Öyrən', desc: 'Praktiki layihələrlə inkişaf et' },
  { n: '04', title: 'İşə başla', desc: 'Yeni karyerana start ver' },
];

function useMentors() {
  const [mentors, setMentors] = useState([]);
  useEffect(() => {
    fetch('/api/admin/mentors')
      .then(r => r.json())
      .then(data => {
        if (data.mentors) {
          setMentors(data.mentors.filter(m => m.is_active !== false).map(m => ({
            initials: m.initials || (m.name ? m.name[0] : 'M'),
            name: m.name, color: m.color || '#FF2CA8',
            title: m.title || m.role || '',
            image: m.image || null,
          })));
        }
      })
      .catch(() => {});
  }, []);
  return mentors;
}

function MentorAvatar({ m, size }) {
  if (m.image) {
    return <img src={m.image} alt={m.name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `2px solid ${m.color}` }} />;
  }
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: `linear-gradient(135deg, ${m.color}, rgba(123,47,255,0.6))`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: size > 48 ? '18px' : '14px', flexShrink: 0 }}>{m.initials}</div>
  );
}

const stepStyle = `
  .step-circle { transition: all 0.25s ease; cursor: default; }
  .step-circle:hover { transform: scale(1.15); box-shadow: 0 0 24px rgba(255,44,168,0.6); background: #FF2CA8 !important; color: #FFFFFF !important; }
  @keyframes mentorScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .mentor-track { display: flex; width: max-content; animation: mentorScroll 45s linear infinite; }
  .mentor-track:hover { animation-play-state: paused; }
  .mentor-track-mobile { display: flex; width: max-content; animation: mentorScroll 28s linear infinite; }
`;

function DesktopSections() {
  const isTablet = useIsTablet();
  const mentors = useMentors();
  const [hoveredStep, setHoveredStep] = useState(null);
  return (
    <>
      <style>{stepStyle}</style>

      <section style={{ background: '#09090B', padding: '56px 0 72px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '6px 14px', marginBottom: '16px' }}>
                <GraduationCap size={14} color="#FF2CA8" />
                <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600 }}>Komandamız</span>
              </div>
              <h2 style={{ color: '#FFFFFF', fontSize: '40px', fontWeight: 700, margin: 0 }}>Sahəni peşəkarlardan öyrən</h2>
            </div>
            <Link href="/mentorlar" style={{ textDecoration: 'none', color: '#FF2CA8', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>Bütün müəllimlərə bax</Link>
          </div>
          {mentors.length > 0 && (
            <div style={{ overflow: 'hidden', width: '100%', maskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)' }}>
              <div className="mentor-track">
                {[...mentors, ...mentors].map((m, i) => (
                  <div key={i} className="card-lift" style={{ flex: '0 0 260px', marginRight: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
                    <div style={{ width: '100%', aspectRatio: '4/3', position: 'relative', background: m.image ? '#000' : `linear-gradient(135deg, ${m.color}, rgba(123,47,255,0.5))`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {m.image ? (
                        <img src={m.image} alt={m.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '48px' }}>{m.initials}</span>
                      )}
                    </div>
                    <div style={{ padding: '20px' }}>
                      <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700 }}>{m.name}</div>
                      <div style={{ color: m.color, fontSize: '13px', marginTop: '3px' }}>{m.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section style={{ background: '#111118', padding: '64px 0 72px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '44px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 32px 0' }}>Bizim fərqimiz</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '24px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.12)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
                <div style={{ marginBottom: '12px', color: '#FF2CA8', display: 'flex', justifyContent: 'center' }}><f.icon size={32} /></div>
                <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{f.title}</div>
                <div style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.4 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0F0F14', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '44px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Məzunlarımız nə deyir?</h2>
            <Link href="/neticeler" style={{ textDecoration: 'none', color: '#FF2CA8', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>Bütün hekayələrə bax</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '24px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ position: 'relative', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.15)', borderRadius: '16px', padding: '28px', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: `radial-gradient(circle, ${t.color}22, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'relative', display: 'flex', gap: '3px', marginBottom: '14px' }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#FFB800" style={{ color: '#FFB800' }} />)}
                </div>
                <p style={{ position: 'relative', color: '#FFFFFF', fontSize: '14px', lineHeight: 1.6, margin: '0 0 20px 0' }}>"{t.text}"</p>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 700 }}>{t.name}</div>
                    <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{t.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#13131A', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '6px 14px', marginBottom: '18px' }}>
                <Play size={13} color="#FF2CA8" fill="#FF2CA8" />
                <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600 }}>Tələbə Rəyi</span>
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.15 }}>Onların dilindən eşit</h2>
              <p style={{ color: '#A0A0B0', fontSize: '15px', lineHeight: 1.7, margin: 0, maxWidth: '440px' }}>Məzunlarımız Changers Academy təcrübəsini öz sözləri ilə danışır — real karyera dəyişikliyi haqqında qısa video.</p>
            </div>
            <div style={{ flex: 1, position: 'relative', aspectRatio: '16/9', borderRadius: '20px', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(255,44,168,0.25), rgba(123,47,255,0.25))', border: '1px solid rgba(255,44,168,0.2)', cursor: 'pointer' }}>
              <video poster="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} controls preload="none" src="/videos/telebe-reyi.mp4" />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,44,168,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(255,44,168,0.5)' }}>
                  <Play size={28} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '4px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '44px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 48px 0' }}>4 addımda karyerana başla!</h2>
          <div style={{ position: 'relative' }}>
            {!isTablet && (
              <div style={{ position: 'absolute', top: '20px', left: '10%', right: '10%', height: '2px', zIndex: 0, display: 'flex' }}>
                {[0, 1, 2].map(seg => (
                  <div key={seg} style={{ flex: 1, height: '100%', position: 'relative', background: 'rgba(255,255,255,0.1)' }}>
                    <div style={{
                      position: 'absolute', inset: 0, background: '#FF2CA8',
                      transform: hoveredStep === seg ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left', transition: 'transform 0.5s ease',
                      boxShadow: hoveredStep === seg ? '0 0 8px rgba(255,44,168,0.8)' : 'none',
                    }} />
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '24px', position: 'relative', zIndex: 1 }}>
              {steps.map((s, i) => (
                <div key={i} onMouseEnter={() => setHoveredStep(i)} onMouseLeave={() => setHoveredStep(null)} style={{ textAlign: 'center' }}>
                  <div className="step-circle" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#13131A', border: '2px solid #FF2CA8', color: '#FF2CA8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, marginBottom: '16px', margin: '0 auto 16px' }}>{s.n}</div>
                  <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{s.title}</div>
                  <div style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.4 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#111118', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(0,214,143,0.1), rgba(123,47,255,0.06))', border: '1px solid rgba(0,214,143,0.25)', borderRadius: '24px', padding: '56px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '320px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '100px', padding: '6px 14px', marginBottom: '18px' }}>
                <Building2 size={14} color="#00D68F" />
                <span style={{ color: '#00D68F', fontSize: '12px', fontWeight: 600 }}>HR & İşə Qəbul</span>
              </div>
              <h2 style={{ color: '#FFFFFF', fontSize: '36px', fontWeight: 700, margin: '0 0 14px 0', lineHeight: 1.15 }}>Kadrınızı <span style={{ color: '#00D68F' }}>Bizdə Tapın</span></h2>
              <p style={{ color: '#A0A0B0', fontSize: '15px', margin: '0 0 20px 0', lineHeight: 1.6, maxWidth: '480px' }}>500+ sertifikatlı məzunumuz arasından şirkətiniz üçün doğru namizədi tapırıq — tamamilə pulsuz.</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['500+ Sertifikatlı Məzun', '6 Sahə', 'Pulsuz'].map((t, i) => (
                  <span key={i} style={{ background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.2)', color: '#00D68F', fontSize: '12px', fontWeight: 600, padding: '5px 12px', borderRadius: '100px' }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
              <Link href="/hr" className="btn-lift" style={{ textDecoration: 'none', background: '#00D68F', color: '#0B0B0F', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px', textAlign: 'center' }}>Namizəd Tap</Link>
              <a href="https://wa.me/994102557555" style={{ textDecoration: 'none', border: '1px solid rgba(0,214,143,0.3)', color: '#00D68F', fontWeight: 600, fontSize: '14px', padding: '14px 32px', borderRadius: '10px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><MessageCircle size={16} /> WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#13131A', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '24px', padding: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '60px' }}>
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.1 }}>Karyerana bu gün<br /><span style={{ color: '#FF2CA8' }}>başla!</span></h2>
              <p style={{ color: '#A0A0B0', fontSize: '15px', margin: 0 }}>500+ məzun artıq yeni karyerasına başladı — sən də qoşul.</p>
            </div>
            <Link href="/qeydiyyat" className="btn-lift" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px', whiteSpace: 'nowrap' }}>Qeydiyyatdan keç</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function MobileSections() {
  const mentors = useMentors();
  return (
    <>
      <style>{stepStyle}</style>

      <section style={{ background: '#09090B', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '5px 12px', marginBottom: '14px' }}>
            <GraduationCap size={12} color="#FF2CA8" />
            <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 600 }}>Komandamız</span>
          </div>
          <h2 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700, margin: '0 0 16px 0' }}>Sahəni peşəkarlardan öyrən</h2>
          {mentors.length > 0 && (
            <div style={{ overflow: 'hidden', width: '100%', marginBottom: '16px', maskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)' }}>
              <div className="mentor-track-mobile">
                {[...mentors, ...mentors].map((m, i) => (
                  <div key={i} style={{ flex: '0 0 160px', marginRight: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden' }}>
                    <div style={{ width: '100%', aspectRatio: '4/3', position: 'relative', background: m.image ? '#000' : `linear-gradient(135deg, ${m.color}, rgba(123,47,255,0.5))`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {m.image ? (
                        <img src={m.image} alt={m.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '28px' }}>{m.initials}</span>
                      )}
                    </div>
                    <div style={{ padding: '12px' }}>
                      <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 700 }}>{m.name}</div>
                      <div style={{ color: m.color, fontSize: '11px', marginTop: '2px' }}>{m.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Link href="/mentorlar" style={{ textDecoration: 'none', color: '#FF2CA8', fontWeight: 600, fontSize: '13px' }}>Bütün müəllimlərə bax</Link>
        </div>
      </section>

      <section style={{ background: '#111118', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 20px 0' }}>Bizim fərqimiz</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.12)', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ flexShrink: 0, color: '#FF2CA8' }}><f.icon size={24} /></div>
                <div>
                  <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700, marginBottom: '3px' }}>{f.title}</div>
                  <div style={{ color: '#A0A0B0', fontSize: '12px', lineHeight: 1.4 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0F0F14', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Məzunlarımız nə deyir?</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ position: 'relative', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.15)', borderRadius: '14px', padding: '18px', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '90px', height: '90px', borderRadius: '50%', background: `radial-gradient(circle, ${t.color}22, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'relative', display: 'flex', gap: '3px', marginBottom: '10px' }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={11} fill="#FFB800" style={{ color: '#FFB800' }} />)}
                </div>
                <p style={{ position: 'relative', color: '#FFFFFF', fontSize: '13px', lineHeight: 1.6, margin: '0 0 14px 0' }}>"{t.text}"</p>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '11px', flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 700 }}>{t.name}</div>
                    <div style={{ color: '#A0A0B0', fontSize: '11px', marginTop: '2px' }}>{t.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Link href="/neticeler" style={{ textDecoration: 'none', color: '#FF2CA8', fontSize: '13px', fontWeight: 600 }}>Bütün hekayələrə bax</Link>
          </div>
        </div>
      </section>

      <section style={{ background: '#13131A', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '5px 12px', marginBottom: '14px' }}>
            <Play size={12} color="#FF2CA8" fill="#FF2CA8" />
            <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 600 }}>Tələbə Rəyi</span>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px 0' }}>Onların dilindən eşit</h2>
          <p style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.6, margin: '0 0 18px 0' }}>Məzunlarımızın öz sözləri ilə qısa video.</p>
          <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(255,44,168,0.25), rgba(123,47,255,0.25))', border: '1px solid rgba(255,44,168,0.2)' }}>
            <video style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} controls preload="none" src="/videos/telebe-reyi.mp4" />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,44,168,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(255,44,168,0.5)' }}>
                <Play size={22} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '3px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 20px 0' }}>4 addımda karyerana başla!</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {steps.map((s, i) => (
              <div key={i}>
                <div className="step-circle" style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#13131A', border: '2px solid #FF2CA8', color: '#FF2CA8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900, marginBottom: '10px' }}>{s.n}</div>
                <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{s.title}</div>
                <div style={{ color: '#A0A0B0', fontSize: '11px', lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#111118', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(0,214,143,0.1), rgba(123,47,255,0.06))', border: '1px solid rgba(0,214,143,0.25)', borderRadius: '18px', padding: '24px 20px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '100px', padding: '5px 12px', marginBottom: '14px' }}>
              <Building2 size={12} color="#00D68F" />
              <span style={{ color: '#00D68F', fontSize: '11px', fontWeight: 600 }}>HR & İşə Qəbul</span>
            </div>
            <h2 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700, margin: '0 0 10px 0', lineHeight: 1.2 }}>Kadrınızı <span style={{ color: '#00D68F' }}>Bizdə Tapın</span></h2>
            <p style={{ color: '#A0A0B0', fontSize: '13px', margin: '0 0 16px 0', lineHeight: 1.6 }}>500+ sertifikatlı məzun arasından doğru namizədi tapırıq — pulsuz.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/hr" className="btn-lift" style={{ textDecoration: 'none', background: '#00D68F', color: '#0B0B0F', fontWeight: 700, fontSize: '13px', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>Namizəd Tap</Link>
              <a href="https://wa.me/994102557555" style={{ textDecoration: 'none', border: '1px solid rgba(0,214,143,0.3)', color: '#00D68F', fontWeight: 600, fontSize: '13px', padding: '12px', borderRadius: '10px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><MessageCircle size={14} /> WhatsApp ilə yaz</a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#13131A', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '18px', padding: '28px 20px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 10px 0', lineHeight: 1.2 }}>Karyerana bu gün<br /><span style={{ color: '#FF2CA8' }}>başla!</span></h2>
            <p style={{ color: '#A0A0B0', fontSize: '13px', margin: '0 0 20px 0' }}>500+ məzun artıq yeni karyerasına başladı.</p>
            <Link href="/qeydiyyat" className="btn-lift" style={{ display: 'inline-block', textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '14px', padding: '14px 32px', borderRadius: '10px' }}>Qeydiyyatdan keç</Link>
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
