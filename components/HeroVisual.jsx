'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroVisual() {
  const [isMobile, setIsMobile] = useState(false);
  const [left, setLeft] = useState('');
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    fetch('/api/content?page=home')
      .then(r => r.json())
      .then(data => { if (data.content?.hero_visual?.left_image) setLeft(data.content.hero_visual.left_image); })
      .catch(() => {});
    fetch('/api/admin/banners')
      .then(r => r.json())
      .then(data => { if (data.banners) setBanners(data.banners.filter(b => b.is_active)); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % banners.length), 2000);
    return () => clearInterval(timer);
  }, [banners]);

  return (
    <div style={{
      display: 'flex', gap: isMobile ? '12px' : '20px', width: '100%',
      maxWidth: '1440px', margin: '0 auto',
      padding: isMobile ? '12px 16px' : '24px 40px', boxSizing: 'border-box',
      alignItems: 'stretch', height: isMobile ? 'auto' : '620px',
      flexDirection: isMobile ? 'column' : 'row',
    }}>
      <div style={{ flex: isMobile ? 'none' : '1.6', width: '100%', height: isMobile ? '300px' : '100%', borderRadius: '20px', overflow: 'hidden', background: '#111116', border: '1px solid rgba(255,255,255,0.06)', boxSizing: 'border-box' }}>
        {left
          ? <img src={left} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#444', fontSize: '13px' }}>
              <span style={{ fontSize: '40px' }}>🖼</span><span>Sol banner</span>
            </div>
        }
      </div>

      <div style={{ flex: isMobile ? 'none' : '1', width: '100%', height: isMobile ? '200px' : '100%', borderRadius: '20px', overflow: 'hidden', position: 'relative', background: '#111116', border: '1px solid rgba(255,255,255,0.06)', boxSizing: 'border-box' }}>
        {banners.length > 0 ? (
          banners.map((banner, i) => (
            <Link key={banner.id} href={banner.link || '/kurslar'} style={{
              display: 'block', position: 'absolute', inset: 0,
              transform: `translateX(${(i - current) * 100}%)`,
              transition: 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
            }}>
              <img src={banner.image} alt={banner.title || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </Link>
          ))
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#444', fontSize: '13px' }}>
            <span style={{ fontSize: '40px' }}>🖼</span><span>Banner yoxdur</span>
          </div>
        )}
        {banners.length > 1 && (
          <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 2 }}>
            {banners.map((_, i) => (
              <span key={i} onClick={(e) => { e.preventDefault(); setCurrent(i); }} style={{
                width: i === current ? '18px' : '6px', height: '6px', borderRadius: '100px',
                background: i === current ? '#FF2CA8' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.3s', cursor: 'pointer',
              }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
