'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const mezunlar = [
  {
    initials: 'AM', name: 'Aytən M.', color: '#FF2CA8',
    course: 'Digital Marketing', rating: 5,
    evvel: 'SMM bilgisi yox idi', indi: 'Freelance müştəri tapdı',
    quote: '4 həftədə SMM mütəxəssisi oldum. Changers mənim karyeramı tamamilə dəyişdi!',
    company: 'Freelance', salary: '+800 AZN/ay',
  },
  {
    initials: 'RE', name: 'Rauf Ə.', color: '#7B2FFF',
    course: 'BIM & Tikinti', rating: 5,
    evvel: 'İnşaat ustası idi', indi: 'BIM menecer oldu',
    quote: 'Revit öyrəndim, 2 ay sonra BIM menecer kimi işə başladım. İndi 2x maaş alıram.',
    company: 'Tikinti şirkəti', salary: '+1200 AZN/ay',
  },
  {
    initials: 'NH', name: 'Nərmin H.', color: '#00D68F',
    course: 'Daxili Dizayn', rating: 5,
    evvel: 'Evdar xanım idi', indi: '3D dizayner oldu',
    quote: 'Portfolio-m ilk həftədən müştəri cəlb etdi. Artiq öz studiyam var!',
    company: 'Öz studiyası', salary: '+1500 AZN/ay',
  },
  {
    initials: 'KM', name: 'Kamran M.', color: '#FFB800',
    course: 'Digital Marketing', rating: 5,
    evvel: 'Satıcı idi', indi: 'Marketing manager oldu',
    quote: 'Google Ads ve Meta Ads öyrəndim. İlk ayda 3 müştəri tapdım.',
    company: 'Marketing Agency', salary: '+900 AZN/ay',
  },
  {
    initials: 'LH', name: 'Leyla H.', color: '#FF2CA8',
    course: 'Arxitektura & BIM', rating: 5,
    evvel: 'Təzə məzun idi', indi: 'Arxitekt kimi işləyir',
    quote: 'Kurs bitəndən 2 həftə sonra müəssisəyə qəbul olundum. Changers olmasa bunu bazarmazdım.',
    company: 'Arxitektura bürosu', salary: '+1000 AZN/ay',
  },
  {
    initials: 'TA', name: 'Tural A.', color: '#7B2FFF',
    course: 'AutoCAD & Revit', rating: 5,
    evvel: 'Texnik rəssam idi', indi: 'BIM spesialisti oldu',
    quote: 'AutoCAD-dan Revit-ə keçdim ve karyeramda irəli addım atdım.',
    company: 'Muhendislik şirkəti', salary: '+1100 AZN/ay',
  },
];

export default function NeticelerPage() {
  const [c, setC] = useState({});
  useEffect(() => {
    fetch('/api/content?page=neticeler').then(r=>r.json()).then(d=>{if(d.content)setC(d.content);}).catch(()=>{});
  }, []);

  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Nəticələr" />

      {/* Hero */}
      <section style={{ position: 'relative', padding: '100px 0 80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: '0', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(circle, rgba(255,44,168,0.15) 0%, rgba(123,47,255,0.1) 40%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>MƏZUNLARIMIZIN HEKAYƏLƏRİ</span>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ color: '#A0A0B0', fontSize: '13px' }}>Ana Sehife / </span>
            <span style={{ color: '#FFFFFF', fontSize: '13px' }}>Neticeler</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '72px', color: '#FFFFFF', margin: '0 0 8px 0', lineHeight: 1.05 }}>Real insanlar.</h1>
          <h1 style={{ fontWeight: 700, fontSize: '72px', color: '#FF2CA8', margin: '0 0 24px 0', lineHeight: 1.05 }}>Real nəticələr.</h1>
          <p style={{ fontSize: '18px', color: '#A0A0B0', margin: 0 }}>Hər kəs öz hekayəsini yazdı — sıfırdan mütəxəssisə.</p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'flex', justifyContent: 'space-around' }}>
          {[
            { icon: '🏆', value: '500+', label: 'Məzun sayı' },
            { icon: '⭐', value: '4.9★', label: 'Ortalama reytinq' },
            { icon: '💼', value: '90%', label: 'İşə düzəldi' },
            { icon: '⏱', value: '4 həftə', label: 'Ortalama kurs' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '36px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>{s.icon}</span>
              <div style={{ fontWeight: 700, fontSize: '32px', color: '#FF2CA8' }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: '#A0A0B0' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mezunlar */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ marginBottom: '56px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
              <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>ÖNƏ ÇIXAN HEKAYƏLƏR</span>
            </div>
            <h2 style={{ fontWeight: 700, fontSize: '44px', color: '#FFFFFF', margin: 0 }}>Zirvəyə çıxan məzunlar</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {mezunlar.map((m, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px', transition: 'border-color 0.2s' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                  <div style={{ width: '52px', height: '52px', background: m.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>{m.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '16px' }}>{m.name}</div>
                    <div style={{ background: m.color, color: '#FFFFFF', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', display: 'inline-block', marginTop: '4px' }}>{m.course}</div>
                  </div>
                  <div style={{ color: '#FFB800', fontSize: '13px' }}>{'★'.repeat(m.rating)}</div>
                </div>

                {/* Evvel / Indi */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 14px' }}>
                    <div style={{ color: '#A0A0B0', fontSize: '10px', fontWeight: 600, marginBottom: '4px', letterSpacing: '1px' }}>ƏVVƏL</div>
                    <div style={{ color: '#FFFFFF', fontSize: '13px' }}>{m.evvel}</div>
                  </div>
                  <div style={{ color: '#FF2CA8', fontSize: '20px' }}>→</div>
                  <div style={{ flex: 1, background: 'rgba(0,214,143,0.06)', border: '1px solid rgba(0,214,143,0.2)', borderRadius: '10px', padding: '10px 14px' }}>
                    <div style={{ color: '#00D68F', fontSize: '10px', fontWeight: 600, marginBottom: '4px', letterSpacing: '1px' }}>İNDİ</div>
                    <div style={{ color: '#FFFFFF', fontSize: '13px' }}>{m.indi}</div>
                  </div>
                </div>

                {/* Quote */}
                <p style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.7, margin: '0 0 20px 0', fontStyle: 'italic' }}>"{m.quote}"</p>

                {/* Footer */}
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
            Sıradakı <span style={{ color: '#FF2CA8' }}>uğur hekayəsi</span><br />sənin olsun!
          </h2>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 40px 0' }}>500+ məzuna qoşul, karyeranı bu gün başla!.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px', boxShadow: '0px 8px 28px rgba(255,44,168,0.45)' }}>
              İndi başla →
            </Link>
            <Link href="/kurslar" style={{ textDecoration: 'none', border: '1px solid rgba(255,44,168,0.4)', color: '#FF2CA8', fontWeight: 600, fontSize: '15px', padding: '16px 32px', borderRadius: '10px' }}>
              Kurslara bax
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
