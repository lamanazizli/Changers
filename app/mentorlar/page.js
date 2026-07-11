'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import useIsMobile from '../../lib/useIsMobile';
import useIsTablet from '../../lib/useIsTablet';

const mentorlar = [
  {
    initials: 'EM', name: 'Elvin Məmmədov', color: '#FF2CA8',
    title: 'Senior BIM Manager', company: 'Tikinti Şirkəti', exp: '8 il təcrübə',
    courses: ['BIM & Tikinti Idareetmesi', 'AutoCAD & Revit Master'],
    bio: 'Elvin 8 ilden cox BIM texnologiyaları sahəsində çalışmışdır. Azərbaycanın ən böyük tikinti layihələrində BIM meneceri kimi işləyib.',
    skills: ['Revit', 'AutoCAD', 'BIM 360', 'Navisworks', 'Layihə menecmenti'],
    students: '120+', rating: '4.9',
  },
  {
    initials: 'NƏ', name: 'Nigar Əliyeva', color: '#7B2FFF',
    title: 'Digital Marketing Lead', company: 'Marketing Agency', exp: '6 il təcrübə',
    courses: ['Digital Marketing & SMM Pro', 'E-Commerce & Dropshipping'],
    bio: 'Nigar Azərbaycanın aparıcı marketing agentlikləri ilə iş aparmışdır. Google ve Meta sertifikatlı marketoloq kimi 50+ brend üçün uğurlu kampaniyalar həyata keçirmişdir.',
    skills: ['Meta Ads', 'Google Ads', 'SEO', 'Analytics', 'Content marketing'],
    students: '200+', rating: '4.9',
  },
  {
    initials: 'SH', name: 'Sevinc Həsənova', color: '#00D68F',
    title: 'Interior Designer & 3D Artist', company: 'Şəxsi studiyası', exp: '7 il təcrübə',
    courses: ['Interior Design & 3D Viz'],
    bio: 'Sevinc Azərbaycan və Türkiyədə 100-dən çox interior dizayn layihəsi həyata keçirmişdir.',
    skills: ['3ds Max', 'Lumion', 'V-Ray', 'AutoCAD', 'SketchUp'],
    students: '80+', rating: '4.8',
  },
  {
    initials: 'KA', name: 'Kamil Ağayev', color: '#FFB800',
    title: 'Arxitekt & BIM Spesialisti', company: 'Arxitektura bürosu', exp: '10 il təcrübə',
    courses: ['Arxitektura & BIM'],
    bio: 'Kamil Avropa və Azərbaycanda çox sayda arxitektura layihəsində iş aparıb.',
    skills: ['ArchiCAD', 'Revit Architecture', 'SketchUp', 'BIM', 'Renderinq'],
    students: '60+', rating: '4.9',
  },
];

function DesktopMentorlar() {
  const isTablet = useIsTablet();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Mentorlar" />
      <section style={{ position: 'relative', padding: '100px 0 80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(circle, rgba(123,47,255,0.15) 0%, rgba(255,44,168,0.08) 40%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>KOMANDAMIZ</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '64px', color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.05 }}>
            Sahəni <span style={{ color: '#FF2CA8' }}>peşəkarlardan</span><br />öyrən!
          </h1>
          <p style={{ fontSize: '18px', color: '#A0A0B0', margin: '0 0 48px 0', maxWidth: '600px' }}>
            Mentorlarımız real sektorda çalışan, təcrübəli mütəxəssislərdir. Nəzəriyyə deyil, praktika öyrədirik.
          </p>
          <div style={{ display: 'flex', gap: '40px' }}>
            {[{ v: '4', l: 'Ekspert mentor' }, { v: '460+', l: 'Məzun tələbə' }, { v: '4.9', l: 'Ortalama reytinq' }, { v: '15+', l: 'İl təcrübə' }].map((s, i) => (
              <div key={i}>
                <div style={{ fontWeight: 700, fontSize: '28px', color: '#FF2CA8' }}>{s.v}</div>
                <div style={{ fontSize: '13px', color: '#A0A0B0', marginTop: '4px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : 'repeat(2, 1fr)', gap: '28px' }}>
            {mentorlar.map((m, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px', display: 'flex', gap: '28px' }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${m.color}, rgba(123,47,255,0.6))`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '24px', border: `2px solid ${m.color}` }}>{m.initials}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '20px', margin: '0 0 4px 0' }}>{m.name}</h3>
                      <div style={{ color: m.color, fontSize: '13px', fontWeight: 500 }}>{m.title}</div>
                      <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{m.company} · {m.exp}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#FFB800', fontSize: '13px' }}>⭐ {m.rating}</div>
                      <div style={{ color: '#A0A0B0', fontSize: '11px', marginTop: '2px' }}>{m.students} tələbə</div>
                    </div>
                  </div>
                  <p style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.7, margin: '16px 0' }}>{m.bio}</p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {m.skills.map((s, j) => <span key={j} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', fontSize: '11px', padding: '4px 10px', borderRadius: '6px' }}>{s}</span>)}
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                    <div style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>TƏDRİS ETDİYİ KURSLAR</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {m.courses.map((c, j) => <span key={j} style={{ background: `${m.color}15`, border: `1px solid ${m.color}40`, color: m.color, fontSize: '11px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px' }}>{c}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '44px', color: '#FFFFFF', margin: '0 0 16px 0' }}>Ekspert mentorlarla <span style={{ color: '#FF2CA8' }}>birbaşa işlə!</span></h2>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 36px 0' }}>Sualların var? Ödənişsiz konsultasiya al.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px' }}>Qeydiyyatdan keç →</Link>
            <Link href="/kurslar" style={{ textDecoration: 'none', border: '1px solid rgba(255,44,168,0.4)', color: '#FF2CA8', fontWeight: 600, fontSize: '15px', padding: '16px 32px', borderRadius: '10px' }}>Kurslara bax</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function MobileMentorlar() {
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Navbar activePage="Mentorlar" />
      <section style={{ padding: '40px 0 32px' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '30px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
            <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 600, letterSpacing: '1px' }}>KOMANDAMIZ</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '28px', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.15 }}>
            Sahəni <span style={{ color: '#FF2CA8' }}>peşəkarlardan</span> öyrən!
          </h1>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: '0 0 24px 0' }}>
            Real sektorda çalışan təcrübəli mütəxəssislərdən öyrən.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[{ v: '4', l: 'Ekspert mentor' }, { v: '460+', l: 'Məzun tələbə' }, { v: '4.9', l: 'Reytinq' }, { v: '15+', l: 'İl təcrübə' }].map((s, i) => (
              <div key={i}>
                <div style={{ fontWeight: 700, fontSize: '20px', color: '#FF2CA8' }}>{s.v}</div>
                <div style={{ fontSize: '11px', color: '#A0A0B0', marginTop: '2px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '0 0 32px' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mentorlar.map((m, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
                <div style={{ width: '56px', height: '56px', flexShrink: 0, background: `linear-gradient(135deg, ${m.color}, rgba(123,47,255,0.6))`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '18px' }}>{m.initials}</div>
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px', margin: '0 0 3px 0' }}>{m.name}</h3>
                  <div style={{ color: m.color, fontSize: '12px', fontWeight: 500 }}>{m.title}</div>
                  <div style={{ color: '#A0A0B0', fontSize: '11px', marginTop: '2px' }}>⭐ {m.rating} · {m.students} tələbə</div>
                </div>
              </div>
              <p style={{ color: '#A0A0B0', fontSize: '12px', lineHeight: 1.6, margin: '0 0 12px 0' }}>{m.bio}</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {m.skills.slice(0, 3).map((s, j) => <span key={j} style={{ background: 'rgba(255,255,255,0.06)', color: '#FFFFFF', fontSize: '10px', padding: '3px 8px', borderRadius: '6px' }}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '22px', color: '#FFFFFF', margin: '0 0 12px 0' }}>Ekspert mentorlarla <span style={{ color: '#FF2CA8' }}>birbaşa işlə!</span></h2>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: '0 0 20px 0' }}>Ödənişsiz konsultasiya al.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '10px' }}>Qeydiyyatdan keç →</Link>
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
  return isMobile ? <MobileMentorlar /> : <DesktopMentorlar />;
}
