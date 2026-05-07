'use client';
import Navbar from '../components/Navbar';
import CoursesSection from '../components/CourseCard';
import HomeSections from '../components/Homesections';
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Ana Sehife" />
      <section style={{ maxWidth: '1440px', margin: '0 auto', padding: '100px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '60px', position: 'relative', minHeight: '680px' }}>
        <div style={{ position: 'absolute', left: '-100px', top: '-80px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(123,47,255,0.3) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: '50px', top: '80px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,44,168,0.25) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '8px 16px', marginBottom: '32px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 500 }}>Azerbaycanin #1 Praktiki Akademiyasi</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '72px', lineHeight: 1.05, color: '#FFFFFF', margin: '0 0 24px 0' }}>
            Geleceyin<br /><span style={{ color: '#FF2CA8' }}>Pesosini</span><br />4 Hefteve Oyre
          </h1>
          <p style={{ fontSize: '16px', color: '#A0A0B0', marginBottom: '8px' }}>Real layiheler. Praktiki tedris. Karyera desteyi.</p>
          <p style={{ fontSize: '14px', color: '#A0A0B0', marginBottom: '48px' }}>Tikinti - Arxitektura - Daxili Dizayn - Digital Marketing - BIM</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/kurslar" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 32px', borderRadius: '10px', boxShadow: '0px 8px 28px rgba(255,44,168,0.45)' }}>Kurslara bax</Link>
            <Link href="/elaqe" style={{ textDecoration: 'none', color: '#FF2CA8', fontWeight: 600, fontSize: '15px', padding: '16px 32px', borderRadius: '10px', border: '1px solid rgba(255,44,168,0.4)' }}>Pulsuz Konsultasiya</Link>
          </div>
        </div>
        <div style={{ position: 'relative', width: '540px', height: '600px', flexShrink: 0, zIndex: 2 }}>
          <div style={{ position: 'absolute', top: '20px', left: '-20px', width: '580px', height: '580px', background: 'radial-gradient(circle at 50% 45%, rgba(255,44,168,0.25) 0%, rgba(123,47,255,0.2) 35%, rgba(67,29,135,0.1) 55%, rgba(11,11,15,0) 75%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '140px', left: '130px', width: '240px', height: '240px' }}>
            <div style={{ position: 'absolute', top: '0', left: '0', width: '162px', height: '162px', border: '1.5px solid rgba(255,44,168,0.7)', borderRadius: '8px', transform: 'rotate(-10deg)' }} />
            <div style={{ position: 'absolute', top: '14px', left: '14px', width: '134px', height: '134px', border: '1.5px solid rgba(255,44,168,0.55)', borderRadius: '8px', transform: 'rotate(-28deg)' }} />
            <div style={{ position: 'absolute', top: '28px', left: '28px', width: '106px', height: '106px', border: '1.5px solid rgba(255,44,168,0.4)', borderRadius: '8px', transform: 'rotate(-46deg)' }} />
            <div style={{ position: 'absolute', top: '42px', left: '42px', width: '78px', height: '78px', border: '1.5px solid rgba(255,44,168,0.25)', borderRadius: '8px', transform: 'rotate(-64deg)' }} />
            <div style={{ position: 'absolute', top: '30px', left: '28px', fontSize: '80px', lineHeight: 1 }}>🏗</div>
          </div>
          <div style={{ position: 'absolute', top: '80px', left: '0', background: '#13131A', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '16px', padding: '10px 16px', boxShadow: '0 8px 24px rgba(255,44,168,0.15)', width: '148px' }}>
            <div style={{ fontWeight: 700, fontSize: '26px', color: '#FF2CA8' }}>500+</div>
            <div style={{ fontSize: '12px', color: '#A0A0B0', marginTop: '4px' }}>Mezun</div>
          </div>
          <div style={{ position: 'absolute', top: '106px', right: '0', background: '#13131A', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '16px', padding: '10px 16px', boxShadow: '0 8px 24px rgba(255,44,168,0.15)', width: '148px' }}>
            <div style={{ fontWeight: 700, fontSize: '26px', color: '#FF2CA8' }}>4.9★</div>
            <div style={{ fontSize: '12px', color: '#A0A0B0', marginTop: '4px' }}>Reytinq</div>
          </div>
          <div style={{ position: 'absolute', top: '320px', left: '-20px', background: '#13131A', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '16px', padding: '10px 16px', boxShadow: '0 8px 24px rgba(255,44,168,0.15)', width: '148px' }}>
            <div style={{ fontWeight: 700, fontSize: '26px', color: '#FF2CA8' }}>90%</div>
            <div style={{ fontSize: '12px', color: '#A0A0B0', marginTop: '4px' }}>Ise Duzaldi</div>
          </div>
          <div style={{ position: 'absolute', top: '380px', left: '180px', background: '#13131A', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '16px', padding: '10px 16px', boxShadow: '0 8px 24px rgba(255,44,168,0.15)', width: '148px' }}>
            <div style={{ fontWeight: 700, fontSize: '26px', color: '#FF2CA8' }}>4 hefte</div>
            <div style={{ fontSize: '12px', color: '#A0A0B0', marginTop: '4px' }}>Kurs Muddeti</div>
          </div>
        </div>
      </section>
      <CoursesSection />
      <HomeSections />
      <footer style={{ background: '#13131A', borderTop: '1px solid rgba(255,44,168,0.15)', padding: '48px 80px', textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: '20px', color: '#FFFFFF', marginBottom: '8px' }}>CHANGERS <span style={{ color: '#FF2CA8' }}>ACADEMY</span></div>
        <p style={{ fontSize: '13px', color: '#A0A0B0' }}>2024 Changers Academy. Butun huquqlar qorunur.</p>
      </footer>
    </main>
  );
}
