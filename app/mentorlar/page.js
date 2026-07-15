'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import useIsMobile from '../../lib/useIsMobile';
import useIsTablet from '../../lib/useIsTablet';
import { Star } from 'lucide-react';

function useMentors() {
  const [mentors, setMentors] = useState([]);
  useEffect(() => {
    fetch('/api/admin/mentors')
      .then(r => r.json())
      .then(data => {
        if (data.mentors) {
          setMentors(data.mentors.filter(m => m.is_active !== false).map(m => ({
            initials: m.initials || (m.name ? m.name[0] : 'M'),
            name: m.name,
            color: m.color || '#FF2CA8',
            title: m.title || m.role || '',
            company: m.company || '',
            exp: m.experience || '',
            bio: m.bio || '',
            skills: m.skills ? m.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
            courses: m.courses ? m.courses.split(',').map(c => c.trim()).filter(Boolean) : [],
            students: m.students || '',
            rating: m.rating || '',
          })));
        }
      })
      .catch(() => {});
  }, []);
  return mentors;
}

function DesktopMuellimler() {
  const isTablet = useIsTablet();
  const muellimler = useMentors();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Müəllimlər" />
      <section style={{ background: '#0B0B0F', padding: '80px 0 60px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '8px 16px', marginBottom: '24px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 500 }}>Komandamız</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '56px', color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.1 }}>
            Sahəni <span style={{ color: '#FF2CA8' }}>peşəkarlardan</span> öyrən!
          </h1>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 48px 0', maxWidth: '600px' }}>
            Müəllimlərimiz real sektorda çalışan, təcrübəli mütəxəssislərdir. Nəzəriyyə deyil, praktika öyrədirik.
          </p>
        </div>
      </section>
      <section style={{ padding: '0 0 80px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          {muellimler.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#A0A0B0', padding: '60px 0' }}>Müəllim məlumatları hazırlanır</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : 'repeat(2, 1fr)', gap: '28px' }}>
              {muellimler.map((m, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px', display: 'flex', gap: '28px' }}>
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${m.color}, rgba(123,47,255,0.6))`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '24px', border: `2px solid ${m.color}` }}>{m.initials}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '20px', margin: '0 0 4px 0' }}>{m.name}</h3>
                        <div style={{ color: m.color, fontSize: '13px', fontWeight: 500 }}>{m.title}</div>
                        <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{m.company}{m.company && m.exp ? ' · ' : ''}{m.exp}</div>
                      </div>
                      {(m.rating || m.students) && (
                        <div style={{ textAlign: 'right' }}>
                          {m.rating && <div style={{ color: '#FFB800', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}><Star size={13} fill="#FFB800" /> {m.rating}</div>}
                          {m.students && <div style={{ color: '#A0A0B0', fontSize: '11px', marginTop: '2px' }}>{m.students} tələbə</div>}
                        </div>
                      )}
                    </div>
                    {m.bio && <p style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.7, margin: '16px 0' }}>{m.bio}</p>}
                    {m.skills.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {m.skills.map((s, j) => <span key={j} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', fontSize: '11px', padding: '4px 10px', borderRadius: '6px' }}>{s}</span>)}
                      </div>
                    )}
                    {m.courses.length > 0 && (
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                        <div style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>TƏDRİS ETDİYİ KURSLAR</div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {m.courses.map((c, j) => <span key={j} style={{ background: `${m.color}15`, border: `1px solid ${m.color}40`, color: m.color, fontSize: '11px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px' }}>{c}</span>)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '44px', color: '#FFFFFF', margin: '0 0 16px 0' }}>Ekspert müəllimlərlə <span style={{ color: '#FF2CA8' }}>birbaşa işlə!</span></h2>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 36px 0' }}>Sualların var? Ödənişsiz konsultasiya al.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px' }}>Qeydiyyatdan keç</Link>
            <Link href="/kurslar" style={{ textDecoration: 'none', border: '1px solid rgba(255,44,168,0.4)', color: '#FF2CA8', fontWeight: 600, fontSize: '15px', padding: '16px 32px', borderRadius: '10px' }}>Kurslara bax</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function MobileMuellimler() {
  const muellimler = useMentors();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh', width: '100%', overflowX: 'clip' }}>
      <Navbar activePage="Müəllimlər" />
      <section style={{ background: '#0B0B0F', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '6px 12px', marginBottom: '16px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 500 }}>Komandamız</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '30px', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.15 }}>
            Sahəni <span style={{ color: '#FF2CA8' }}>peşəkarlardan</span> öyrən!
          </h1>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: 0 }}>
            Real sektorda çalışan təcrübəli mütəxəssislərdən öyrən.
          </p>
        </div>
      </section>
      <section style={{ padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          {muellimler.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#A0A0B0', padding: '40px 0' }}>Müəllim məlumatları hazırlanır</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {muellimler.map((m, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
                    <div style={{ width: '56px', height: '56px', flexShrink: 0, background: `linear-gradient(135deg, ${m.color}, rgba(123,47,255,0.6))`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '18px' }}>{m.initials}</div>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px', margin: '0 0 3px 0' }}>{m.name}</h3>
                      <div style={{ color: m.color, fontSize: '12px', fontWeight: 500 }}>{m.title}</div>
                      {(m.rating || m.students) && (
                        <div style={{ color: '#A0A0B0', fontSize: '11px', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {m.rating && <><Star size={11} fill="#FFB800" style={{ color: '#FFB800' }} /> {m.rating}</>}
                          {m.rating && m.students ? ' · ' : ''}
                          {m.students && `${m.students} tələbə`}
                        </div>
                      )}
                    </div>
                  </div>
                  {m.bio && <p style={{ color: '#A0A0B0', fontSize: '12px', lineHeight: 1.6, margin: '0 0 12px 0' }}>{m.bio}</p>}
                  {m.skills.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {m.skills.slice(0, 3).map((s, j) => <span key={j} style={{ background: 'rgba(255,255,255,0.06)', color: '#FFFFFF', fontSize: '10px', padding: '3px 8px', borderRadius: '6px' }}>{s}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '22px', color: '#FFFFFF', margin: '0 0 12px 0' }}>Ekspert müəllimlərlə <span style={{ color: '#FF2CA8' }}>birbaşa işlə!</span></h2>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: '0 0 20px 0' }}>Ödənişsiz konsultasiya al.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '10px' }}>Qeydiyyatdan keç</Link>
            <Link href="/kurslar" style={{ textDecoration: 'none', border: '1px solid rgba(255,44,168,0.4)', color: '#FF2CA8', fontWeight: 600, fontSize: '14px', padding: '14px', borderRadius: '10px' }}>Kurslara bax</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function MentorlarPage() {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  return isMobile ? <MobileMuellimler /> : <DesktopMuellimler />;
}
