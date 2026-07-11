'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import useIsMobile from '../lib/useIsMobile';
import useIsTablet from '../lib/useIsTablet';

function useHeroData() {
  const [left, setLeft] = useState('');
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);

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
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % banners.length), 3000);
    return () => clearInterval(timer);
  }, [banners]);

  return { left, banners, current, setCurrent };
}

function DesktopHero() {
  const { left, banners, current, setCurrent } = useHeroData();
  const isTablet = useIsTablet();
  return (
    <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '1440px', margin: '0 auto', padding: isTablet ? '20px 24px' : '24px 40px', boxSizing: 'border-box', height: isTablet ? '420px' : '620px' }}>
      <div style={{ flex: '1.6', height: '100%', borderRadius: '20px', overflow: 'hidden', background: '#111116', border: '1px solid rgba(255,255,255,0.06)' }}>
        {left ? <img src={left} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> :
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontSize: '13px' }}>Sol banner</div>}
      </div>
      <div style={{ flex: '1', height: '100%', borderRadius: '20px', overflow: 'hidden', position: 'relative', background: '#111116', border: '1px solid rgba(255,255,255,0.06)' }}>
        {banners.length > 0 ? banners.map((banner, i) => (
          <Link key={banner.id} href={banner.link || '/kurslar'} style={{ display: 'block', position: 'absolute', inset: 0, transform: `translateX(${(i - current) * 100}%)`, transition: 'transform 0.6s ease' }}>
            <img src={banner.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </Link>
        )) : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontSize: '13px' }}>Banner yoxdur</div>}
        {banners.length > 1 && (
          <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 2 }}>
            {banners.map((_, i) => (
              <span key={i} onClick={(e) => { e.preventDefault(); setCurrent(i); }} style={{ width: i === current ? '18px' : '6px', height: '6px', borderRadius: '100px', background: i === current ? '#FF2CA8' : 'rgba(255,255,255,0.4)', cursor: 'pointer' }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MobileHero() {
  const { left, banners, current, setCurrent } = useHeroData();
  return (
    <div style={{ width: '100%', padding: '12px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ width: '100%', height: '280px', borderRadius: '16px', overflow: 'hidden', background: '#111116', border: '1px solid rgba(255,255,255,0.06)' }}>
        {left ? <img src={left} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> :
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontSize: '12px' }}>Sol banner</div>}
      </div>
      <div style={{ width: '100%', height: '180px', borderRadius: '16px', overflow: 'hidden', position: 'relative', background: '#111116', border: '1px solid rgba(255,255,255,0.06)' }}>
        {banners.length > 0 ? banners.map((banner, i) => (
          <Link key={banner.id} href={banner.link || '/kurslar'} style={{ display: 'block', position: 'absolute', inset: 0, transform: `translateX(${(i - current) * 100}%)`, transition: 'transform 0.6s ease' }}>
            <img src={banner.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </Link>
        )) : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontSize: '12px' }}>Banner yoxdur</div>}
        {banners.length > 1 && (
          <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px', zIndex: 2 }}>
            {banners.map((_, i) => (
              <span key={i} onClick={(e) => { e.preventDefault(); setCurrent(i); }} style={{ width: i === current ? '16px' : '5px', height: '5px', borderRadius: '100px', background: i === current ? '#FF2CA8' : 'rgba(255,255,255,0.4)' }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HeroVisual() {
  const isMobile = useIsMobile();
  if (isMobile === null) return <div style={{ height: '400px' }} />; // ilkin yuklenme
  return isMobile ? <MobileHero /> : <DesktopHero />;
}
