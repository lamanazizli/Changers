'use client';
import { useState, useEffect } from 'react';

export default function HeroVisual() {
  const [c, setC] = useState({
    student_photo: '/student-hero.png',
    testimonial_name: 'Ayten M.',
    testimonial_text: 'BIM kursu heyatimi deyisdi!',
    stat1_value: '10+',
    stat1_label: 'Aktiv Kurs',
    stat2_value: '50+',
    stat2_label: 'Telebe her gun',
  });

  useEffect(() => {
    fetch('/api/content?page=home')
      .then(r => r.json())
      .then(data => {
        if (data.content?.hero_image) setC(prev => ({ ...prev, ...data.content.hero_image }));
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ position: 'relative', width: '560px', height: '680px', flexShrink: 0, zIndex: 2 }}>

      {/* Tund gradient - asagi hissede, qara + benov + cehrayi */}
      <div style={{
        position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)',
        width: '480px', height: '400px',
        background: 'radial-gradient(ellipse at center bottom, rgba(123,47,255,0.55) 0%, rgba(80,0,120,0.45) 30%, rgba(11,11,15,0.8) 65%, transparent 85%)',
        filter: 'blur(35px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Yuxari hissede de az gradient */}
      <div style={{
        position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
        width: '380px', height: '250px',
        background: 'radial-gradient(ellipse at center top, rgba(100,30,200,0.25) 0%, transparent 70%)',
        filter: 'blur(30px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Telebe sekli - tam gorunsun */}
      <img
        src={c.student_photo}
        alt="Telebe"
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '460px',
          height: 'auto',
          objectFit: 'contain',
          mixBlendMode: 'lighten',
          zIndex: 1,
          display: 'block',
        }}
      />

      {/* Testimonial kart - sol, asagida, telebənin yaninda */}
      <div style={{
        position: 'absolute', top: '130px', left: '-50px',
        background: 'rgba(19,19,26,0.95)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '14px', padding: '12px 14px',
        display: 'flex', alignItems: 'center', gap: '10px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
        maxWidth: '190px', zIndex: 3,
      }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #FF2CA8, #7B2FFF)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#FFFFFF', fontWeight: 700, fontSize: '13px',
        }}>
          {(c.testimonial_name || 'A').charAt(0)}
        </div>
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '11px' }}>{c.testimonial_name}</div>
          <div style={{ color: '#A0A0B0', fontSize: '10px', marginTop: '2px', lineHeight: 1.3 }}>{c.testimonial_text}</div>
        </div>
      </div>

      {/* Stat kart 1 - sag ust */}
      <div style={{
        position: 'absolute', top: '80px', right: '-20px',
        background: 'rgba(19,19,26,0.95)', border: '1px solid rgba(255,44,168,0.3)',
        borderRadius: '14px', padding: '14px 20px',
        boxShadow: '0 8px 32px rgba(255,44,168,0.2)', backdropFilter: 'blur(10px)',
        zIndex: 3, textAlign: 'center', minWidth: '110px',
      }}>
        <div style={{ fontWeight: 700, fontSize: '24px', color: '#FF2CA8' }}>{c.stat1_value}</div>
        <div style={{ fontSize: '11px', color: '#A0A0B0', marginTop: '3px' }}>{c.stat1_label}</div>
      </div>

      {/* Stat kart 2 - sekil bitdikden sonra, dipde */}
      <div style={{
        position: 'absolute', bottom: '0px', left: '50%', transform: 'translateX(-50%)', width: '280px',
        background: 'rgba(19,19,26,0.95)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '14px', padding: '12px 20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
        zIndex: 4, display: 'flex', alignItems: 'center', gap: '12px', whiteSpace: 'nowrap',
      }}>
        <div style={{ display: 'flex' }}>
          {['#FF2CA8', '#7B2FFF', '#00D68F', '#FFB800'].map((color, i) => (
            <div key={i} style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: color, border: '2px solid #13131A',
              marginLeft: i > 0 ? '-8px' : '0',
            }} />
          ))}
        </div>
        <div>
          <div style={{ color: '#FF2CA8', fontWeight: 700, fontSize: '16px' }}>+{c.stat2_value}</div>
          <div style={{ color: '#A0A0B0', fontSize: '11px' }}>{c.stat2_label}</div>
        </div>
      </div>
    </div>
  );
}
