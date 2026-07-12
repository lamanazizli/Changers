'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import useIsMobile from '../../lib/useIsMobile';
import useIsTablet from '../../lib/useIsTablet';
import { useState, useEffect } from 'react';
import { Trophy, Star, Briefcase, Clock, Building2, MessageCircle } from 'lucide-react';

function usePageContent() {
  const [c, setC] = useState({
    hero: { title1: 'Real Insanlar.', title2: 'Real Neticeler.', subtitle: 'Her kes oz hekayesini yazdi — sifirdan mutexessise.' },
  });
  useEffect(() => {
    fetch('/api/content?page=neticeler')
      .then(r => r.json())
      .then(data => { if (data.content) setC(prev => ({ hero: { ...prev.hero, ...data.content.hero } })); })
      .catch(() => {});
  }, []);
  return c;
}

function useStudents() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetch('/api/admin/students')
      .then(r => r.json())
      .then(data => {
        if (data.students) {
          setStudents(data.students.filter(s => s.is_active !== false).map(s => ({
            initials: s.initials, name: s.name, color: s.color || '#FF2CA8',
            course: s.course, rating: s.rating || 5,
            evvel: s.before_text, indi: s.after_text, quote: s.quote,
            company: s.company, salary: s.salary,
          })));
        }
      })
      .catch(() => {});
  }, []);
  return students;
}

function DesktopTelebeler() {
  const isTablet = useIsTablet();
  const telebeler = useStudents();
  const c = usePageContent();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Tələbələr" />
      <section style={{ background: '#0B0B0F', padding: '80px 0 60px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '8px 16px', marginBottom: '24px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Trophy size={14} /> Məzunlarımızın hekayələri</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '56px', color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.1 }}>
            {c.hero.title1}<br /><span style={{ color: '#FF2CA8' }}>{c.hero.title2}</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: 0, maxWidth: '600px' }}>{c.hero.subtitle}</p>
        </div>
      </section>
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {[{ icon: Trophy, value: '500+', label: 'Mezun Sayi' }, { icon: Star, value: '4.9', label: 'Ortalama Reytinq' }, { icon: Briefcase, value: '90%', label: 'Ise Duzaldi' }, { icon: Clock, value: '4 Hefte', label: 'Ortalama Kurs' }].map((s, i) => (
            <div key={i} style={{ padding: '36px 0', textAlign: 'center' }}>
              <s.icon size={22} style={{ color: '#FF2CA8' }} />
              <div style={{ fontWeight: 700, fontSize: '32px', color: '#FF2CA8', marginTop: '8px' }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: '#A0A0B0', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '60px 0', background: '#0B0B0F' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(0,214,143,0.1), rgba(123,47,255,0.08))', border: '1px solid rgba(0,214,143,0.25)', borderRadius: '24px', padding: '48px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '100px', padding: '6px 14px', marginBottom: '16px' }}>
                <span style={{ color: '#00D68F', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Building2 size={13} /> HR & Ise Qebul</span>
              </div>
              <h2 style={{ fontWeight: 700, fontSize: '32px', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.2 }}>Kadrınızı <span style={{ color: '#00D68F' }}>Bizdə Tapın</span></h2>
              <p style={{ color: '#A0A0B0', fontSize: '15px', margin: '0 0 20px 0', lineHeight: 1.6 }}>500+ sertifikatlı məzunumuz arasından şirkətiniz üçün doğru namizədi tapırıq.</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['500+ Sertifikatlı Məzun', '6 Sahə', 'Pulsuz'].map((t, i) => <span key={i} style={{ background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.2)', color: '#00D68F', fontSize: '12px', fontWeight: 600, padding: '5px 12px', borderRadius: '100px' }}>✓ {t}</span>)}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
              <Link href="/hr" style={{ textDecoration: 'none', background: '#00D68F', color: '#0B0B0F', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px', textAlign: 'center', display: 'block' }}>Namizəd Tap →</Link>
              <a href="https://wa.me/994102557555" style={{ textDecoration: 'none', background: 'transparent', border: '1px solid rgba(0,214,143,0.3)', color: '#00D68F', fontWeight: 600, fontSize: '14px', padding: '14px 32px', borderRadius: '10px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><MessageCircle size={16} /> WhatsApp ile Yaz</a>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: '60px 0 100px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
              <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>ONE CIXAN HEKAYELER</span>
            </div>
            <h2 style={{ fontWeight: 700, fontSize: '44px', color: '#FFFFFF', margin: 0 }}>Zirvəyə Cıxan Mezunlar</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '24px' }}>
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
                    <div style={{ color: '#A0A0B0', fontSize: '10px', fontWeight: 600, marginBottom: '4px' }}>EVVEL</div>
                    <div style={{ color: '#FFFFFF', fontSize: '13px' }}>{m.evvel}</div>
                  </div>
                  <div style={{ color: '#FF2CA8', fontSize: '20px' }}>→</div>
                  <div style={{ flex: 1, background: 'rgba(0,214,143,0.06)', border: '1px solid rgba(0,214,143,0.2)', borderRadius: '10px', padding: '10px 14px' }}>
                    <div style={{ color: '#00D68F', fontSize: '10px', fontWeight: 600, marginBottom: '4px' }}>INDI</div>
                    <div style={{ color: '#FFFFFF', fontSize: '13px' }}>{m.indi}</div>
                  </div>
                </div>
                <p style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.7, margin: '0 0 20px 0', fontStyle: 'italic' }}>"{m.quote}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#A0A0B0', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Building2 size={12} /> {m.company}</span>
                  <span style={{ color: '#00D68F', fontSize: '13px', fontWeight: 700 }}>{m.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '48px', color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.1 }}>Siradaki <span style={{ color: '#FF2CA8' }}>Ugur Hekayesi</span><br />Senin Olsun</h2>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 40px 0' }}>500+ mezunun yanina qos. Karyerani bu gun basla.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px' }}>Indi Baslat →</Link>
            <Link href="/kurslar" style={{ textDecoration: 'none', border: '1px solid rgba(255,44,168,0.4)', color: '#FF2CA8', fontWeight: 600, fontSize: '15px', padding: '16px 32px', borderRadius: '10px' }}>Kurslara Bax</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function MobileTelebeler() {
  const telebeler = useStudents();
  const c = usePageContent();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Navbar activePage="Tələbələr" />
      <section style={{ background: '#0B0B0F', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '6px 12px', marginBottom: '16px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Trophy size={13} /> Məzunlarımızın hekayələri</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '30px', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.15 }}>
            {c.hero.title1}<br /><span style={{ color: '#FF2CA8' }}>{c.hero.title2}</span>
          </h1>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: 0 }}>{c.hero.subtitle}</p>
        </div>
      </section>
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[{ icon: Trophy, value: '500+', label: 'Məzun Sayı' }, { icon: Star, value: '4.9', label: 'Reytinq' }, { icon: Briefcase, value: '90%', label: 'İşə düzəldi' }, { icon: Clock, value: '4 Həftə', label: 'Kurs müddəti' }].map((s, i) => (
            <div key={i} style={{ padding: '18px 0', textAlign: 'center' }}>
              <s.icon size={18} style={{ color: '#FF2CA8' }} />
              <div style={{ fontWeight: 700, fontSize: '20px', color: '#FF2CA8', marginTop: '4px' }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: '#A0A0B0', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '32px 0', background: '#0B0B0F' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(0,214,143,0.1), rgba(123,47,255,0.08))', border: '1px solid rgba(0,214,143,0.25)', borderRadius: '18px', padding: '24px 20px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '100px', padding: '5px 12px', marginBottom: '14px' }}>
              <span style={{ color: '#00D68F', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Building2 size={12} /> HR & İşə Qəbul</span>
            </div>
            <h2 style={{ fontWeight: 700, fontSize: '20px', color: '#FFFFFF', margin: '0 0 10px 0', lineHeight: 1.25 }}>Kadrınızı <span style={{ color: '#00D68F' }}>Bizdə Tapın</span></h2>
            <p style={{ color: '#A0A0B0', fontSize: '13px', margin: '0 0 16px 0', lineHeight: 1.6 }}>500+ sertifikatlı məzun arasından doğru namizədi tapırıq.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/hr" style={{ textDecoration: 'none', background: '#00D68F', color: '#0B0B0F', fontWeight: 700, fontSize: '13px', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>Namizəd Tap →</Link>
              <a href="https://wa.me/994102557555" style={{ textDecoration: 'none', border: '1px solid rgba(0,214,143,0.3)', color: '#00D68F', fontWeight: 600, fontSize: '13px', padding: '12px', borderRadius: '10px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><MessageCircle size={14} /> WhatsApp ilə yaz</a>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontWeight: 700, fontSize: '20px', color: '#FFFFFF', margin: '0 0 16px 0' }}>Zirvəyə Çıxan Məzunlar</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {telebeler.map((m, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '42px', height: '42px', background: m.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>{m.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '14px' }}>{m.name}</div>
                    <div style={{ background: m.color, color: '#FFFFFF', fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '100px', display: 'inline-block', marginTop: '3px' }}>{m.course}</div>
                  </div>
                  <div style={{ color: '#FFB800', fontSize: '11px' }}>{'★'.repeat(m.rating)}</div>
                </div>
                <p style={{ color: '#A0A0B0', fontSize: '12px', lineHeight: 1.6, margin: '0 0 12px 0', fontStyle: 'italic' }}>"{m.quote}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#A0A0B0', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Building2 size={11} /> {m.company}</span>
                  <span style={{ color: '#00D68F', fontSize: '12px', fontWeight: 700 }}>{m.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '22px', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.2 }}>Sıradakı <span style={{ color: '#FF2CA8' }}>Uğur Hekayəsi</span> Sənin Olsun</h2>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: '0 0 20px 0' }}>500+ məzunun yanına qoş.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '10px' }}>İndi Başlat →</Link>
            <Link href="/kurslar" style={{ textDecoration: 'none', border: '1px solid rgba(255,44,168,0.4)', color: '#FF2CA8', fontWeight: 600, fontSize: '14px', padding: '14px', borderRadius: '10px' }}>Kurslara Bax</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function TelebelerPage() {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  return isMobile ? <MobileTelebeler /> : <DesktopTelebeler />;
}
