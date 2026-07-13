'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useIsMobile from '../../lib/useIsMobile';
import useIsTablet from '../../lib/useIsTablet';
import { Target, BarChart3, Trophy, BookOpen, RefreshCw, Briefcase, PartyPopper, Building2 } from 'lucide-react';

const DEFAULT_BENEFITS = [
  { icon: Target, title: 'Fərdi Sillabus', desc: 'Şirkətinizin ehtiyaclarına uyğun xüsusi tədris proqramı hazırlanır.' },
  { icon: BarChart3, title: 'Hesabat Sistemi', desc: 'Həftəlik əməkdaş tərəqqisi hesabatı ilə nəticəni izləyin.' },
  { icon: Trophy, title: 'Sertifikat', desc: 'Sektorda tanınan rəsmi Changers Academy sertifikatı verilir.' },
  { icon: BookOpen, title: 'Ayrıca Mentor', desc: 'Hər korporativ müştəriyə ayrıca mentor təyin edilir.' },
  { icon: RefreshCw, title: 'Çevik Format', desc: 'Offline, online və ya hibrid format seçimi sizin üçündür.' },
  { icon: Briefcase, title: 'HR Dəstəyi', desc: 'Tədris sonrası kadr yerləşdirilməsində köməklik edilir.' },
];

const BENEFIT_ICONS = [Target, BarChart3, Trophy, BookOpen, RefreshCw, Briefcase];

const DEFAULT_PACKAGES = [
  { name: 'Başlanğıc', color: '#7B2FFF', features: ['5 əməkdaşa qədər təlim', 'BIM & AutoCAD kursu', 'Aylıq hesabat', 'Online format', 'Sertifikat'] },
  { name: 'Korporativ', color: '#FF2CA8', popular: true, features: ['15 əməkdaşa qədər təlim', '3 kurs seçimi', 'Həftəlik hesabat', 'Offline + Online', 'Sertifikat + Portfolio', 'Mentor dəstəyi'] },
  { name: 'Enterprise', color: '#00D68F', features: ['Limitsiz əməkdaş', 'Bütün kurslar', 'Günlük hesabat', 'Offline + Online', 'Ayrıca mentor', 'Fərdi sillabus'] },
];

const PACKAGE_COLORS = ['#7B2FFF', '#FF2CA8', '#00D68F', '#FFB800', '#2D7DD2'];

function parseBenefits(raw) {
  if (!raw || !raw.trim()) return DEFAULT_BENEFITS;
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  return lines.map((line, i) => {
    const [title, desc] = line.split('|').map(s => (s || '').trim());
    return { icon: BENEFIT_ICONS[i % BENEFIT_ICONS.length], title: title || '', desc: desc || '' };
  });
}

function parsePackages(raw) {
  if (!raw || !raw.trim()) return DEFAULT_PACKAGES;
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  return lines.map((line, i) => {
    const [name, featuresStr] = line.split('|').map(s => (s || '').trim());
    return {
      name: name || '',
      color: PACKAGE_COLORS[i % PACKAGE_COLORS.length],
      popular: i === 1,
      features: (featuresStr || '').split(',').map(f => f.trim()).filter(Boolean),
    };
  });
}

function usePageContent() {
  const [c, setC] = useState({
    hero: { title: 'Gücləndirin', subtitle: 'Şirkətinizin əməkdaşlarına praktiki təlim verin. Real layihələr, sertifikat, nəticə.' },
    stats: { stat1_value: '50+', stat1_label: 'Korporativ Müştəri', stat2_value: '500+', stat2_label: 'Hazırlanmış Kadr', stat3_value: '10+', stat3_label: 'Sektor', stat4_value: '4.9', stat4_label: 'Müştəri Reytinqi' },
    content: { benefits: '', packages: '' },
  });
  useEffect(() => {
    fetch('/api/content?page=korporativ')
      .then(r => r.json())
      .then(data => { if (data.content) setC(prev => ({
        hero: { ...prev.hero, ...data.content.hero },
        stats: { ...prev.stats, ...data.content.stats },
        content: { ...prev.content, ...data.content.content },
      })); })
      .catch(() => {});
  }, []);

  const benefits = parseBenefits(c.content.benefits);
  const packages = parsePackages(c.content.packages);

  return { ...c, benefits, packages };
}

function useForm() {
  const [form, setForm] = useState({ company: '', name: '', phone: '', email: '', employees: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, course: 'Korporativ əməkdaşlıq', message: 'Şirkət: ' + form.company + ' | Əməkdaş: ' + form.employees + ' | ' + form.message }),
      });
      setSent(true);
    } catch { alert('Xəta baş verdi'); }
    setLoading(false);
  };
  return { form, update, sent, loading, handleSubmit };
}

const inp = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '14px 18px', color: '#FFFFFF', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' };

function PackageCard({ pkg, compact }) {
  return (
    <div style={{
      background: pkg.popular ? 'rgba(255,44,168,0.08)' : 'rgba(255,255,255,0.03)',
      border: '1px solid ' + (pkg.popular ? 'rgba(255,44,168,0.5)' : 'rgba(255,255,255,0.08)'),
      borderRadius: compact ? '16px' : '20px', padding: compact ? '24px' : '40px 32px', position: 'relative',
    }}>
      {pkg.popular && (
        <div style={{ position: 'absolute', top: compact ? '-12px' : '-14px', left: '50%', transform: 'translateX(-50%)', background: '#FF2CA8', color: '#FFFFFF', fontSize: compact ? '10px' : '12px', fontWeight: 700, padding: compact ? '4px 16px' : '5px 20px', borderRadius: '100px', whiteSpace: 'nowrap' }}>Ən Populyar</div>
      )}
      <div style={{ color: pkg.color, fontSize: compact ? '15px' : '18px', fontWeight: 700, marginBottom: compact ? '16px' : '24px' }}>{pkg.name}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? '10px' : '14px', marginBottom: compact ? '18px' : '32px' }}>
        {pkg.features.map((f, j) => (
          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: pkg.color, fontWeight: 700 }}>+</span>
            <span style={{ color: '#FFFFFF', fontSize: compact ? '12px' : '14px' }}>{f}</span>
          </div>
        ))}
      </div>
      <a href="#forma" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', background: pkg.popular ? '#FF2CA8' : 'transparent', border: '1px solid ' + pkg.color, color: pkg.popular ? '#FFFFFF' : pkg.color, fontWeight: 700, fontSize: compact ? '13px' : '14px', padding: compact ? '12px' : '14px', borderRadius: '10px' }}>Əlaqə saxla</a>
    </div>
  );
}

function DesktopKorporativ() {
  const { form, update, sent, loading, handleSubmit } = useForm();
  const isTablet = useIsTablet();
  const c = usePageContent();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Korporativ" />
      <section style={{ background: '#0B0B0F', padding: '80px 0 60px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '8px 16px', marginBottom: '24px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Building2 size={14} /> Korporativ Əməkdaşlıq</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '56px', color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.1 }}>{c.hero.title}</h1>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 32px 0', maxWidth: '600px' }}>{c.hero.subtitle}</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#forma" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px' }}>Müraciət Et</a>
            <a href="https://wa.me/994102557555" style={{ textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 600, fontSize: '15px', padding: '16px 28px', borderRadius: '10px' }}>WhatsApp</a>
          </div>
        </div>
      </section>
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {[{ v: c.stats.stat1_value, l: c.stats.stat1_label }, { v: c.stats.stat2_value, l: c.stats.stat2_label }, { v: c.stats.stat3_value, l: c.stats.stat3_label }, { v: c.stats.stat4_value, l: c.stats.stat4_label }].map((s, i) => (
            <div key={i} style={{ padding: '36px 0', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '36px', color: '#FF2CA8' }}>{s.v}</div>
              <div style={{ fontSize: '13px', color: '#A0A0B0', marginTop: '6px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}><h2 style={{ fontWeight: 700, fontSize: '40px', color: '#FFFFFF', margin: 0 }}>Korporativ üstünlüklər</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '24px' }}>
            {c.benefits.map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px 24px' }}>
                <div style={{ marginBottom: '16px', color: '#FF2CA8' }}><f.icon size={32} /></div>
                <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0' }}>{f.title}</h3>
                <p style={{ color: '#A0A0B0', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontWeight: 700, fontSize: '40px', color: '#FFFFFF', margin: '0 0 12px 0' }}>Şirkətiniz üçün paket seçin</h2>
            <p style={{ color: '#A0A0B0', fontSize: '15px', margin: 0 }}>Qiymət təklifi ehtiyaclarınıza uyğun hazırlanır — bizimlə əlaqə saxlayın.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : 'repeat(3, 1fr)', gap: '24px', alignItems: 'start' }}>
            {c.packages.map((pkg, i) => <PackageCard key={i} pkg={pkg} compact={false} />)}
          </div>
        </div>
      </section>
      <section id="forma" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontWeight: 700, fontSize: '40px', color: '#FFFFFF', margin: '0 0 16px 0' }}>Əməkdaşlıq üçün <span style={{ color: '#FF2CA8' }}>müraciət et</span></h2>
            <p style={{ color: '#A0A0B0', fontSize: '16px', margin: 0 }}>24 saat ərzində sizinlə əlaqə saxlayacağıq.</p>
          </div>
          {sent ? (
            <div style={{ background: 'rgba(0,214,143,0.08)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '20px', padding: '60px', textAlign: 'center' }}>
              <div style={{ marginBottom: '20px', color: '#00D68F', display: 'flex', justifyContent: 'center' }}><PartyPopper size={56} /></div>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '28px', margin: 0 }}>Müraciətiniz qəbul edildi!</h3>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '20px', padding: '48px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>ŞİRKƏT ADI</label><input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Şirkət adınız" required style={inp} /></div>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>ƏLAQƏLƏNDİRİCİ ŞƏXS</label><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Ad Soyadınız" required style={inp} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>TELEFON</label><input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+994 50 XXX XX XX" required style={inp} /></div>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>EMAIL</label><input value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@shirket.az" type="email" required style={inp} /></div>
                </div>
                <div>
                  <label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>ƏMƏKDAŞ SAYI</label>
                  <select value={form.employees} onChange={e => update('employees', e.target.value)} required style={{ ...inp, background: 'rgba(20,20,30,1)' }}>
                    <option value="">Seçin...</option><option>1-5 nəfər</option><option>6-15 nəfər</option><option>16-30 nəfər</option><option>31-50 nəfər</option><option>50+ nəfər</option>
                  </select>
                </div>
                <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>ƏLAVƏ MƏLUMAT</label><textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Hansı sahədə təlim istədiyinizi yazın..." rows={4} style={{ ...inp, resize: 'vertical' }} /></div>
                <button type="submit" disabled={loading} style={{ background: '#FF2CA8', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '18px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Göndərilir...' : 'Müraciət Göndər'}</button>
              </form>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

function MobileKorporativ() {
  const { form, update, sent, loading, handleSubmit } = useForm();
  const c = usePageContent();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh', width: '100%', overflowX: 'clip' }}>
      <Navbar activePage="Korporativ" />
      <section style={{ background: '#0B0B0F', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '6px 12px', marginBottom: '16px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Building2 size={13} /> Korporativ əməkdaşlıq</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '30px', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.15 }}>{c.hero.title}</h1>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: '0 0 24px 0' }}>{c.hero.subtitle}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="#forma" style={{ textDecoration: 'none', textAlign: 'center', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '10px' }}>Müraciət et</a>
            <a href="https://wa.me/994102557555" style={{ textDecoration: 'none', textAlign: 'center', background: '#25D366', color: '#FFFFFF', fontWeight: 600, fontSize: '14px', padding: '14px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>WhatsApp</a>
          </div>
        </div>
      </section>
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[{ v: c.stats.stat1_value, l: c.stats.stat1_label }, { v: c.stats.stat2_value, l: c.stats.stat2_label }, { v: c.stats.stat3_value, l: c.stats.stat3_label }, { v: c.stats.stat4_value, l: c.stats.stat4_label }].map((s, i) => (
            <div key={i} style={{ padding: '18px 0', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '20px', color: '#FF2CA8' }}>{s.v}</div>
              <div style={{ fontSize: '11px', color: '#A0A0B0', marginTop: '4px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontWeight: 700, fontSize: '20px', color: '#FFFFFF', margin: '0 0 20px 0', textAlign: 'center' }}>Korporativ üstünlüklər</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {c.benefits.map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ flexShrink: 0, color: '#FF2CA8' }}><f.icon size={24} /></div>
                <div><h3 style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700, margin: '0 0 3px 0' }}>{f.title}</h3><p style={{ color: '#A0A0B0', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>{f.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontWeight: 700, fontSize: '20px', color: '#FFFFFF', margin: '0 0 6px 0', textAlign: 'center' }}>Şirkətiniz üçün paket seçin</h2>
          <p style={{ color: '#A0A0B0', fontSize: '12px', margin: '0 0 20px 0', textAlign: 'center' }}>Qiymət təklifi ehtiyaclarınıza uyğun hazırlanır.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {c.packages.map((pkg, i) => <PackageCard key={i} pkg={pkg} compact={true} />)}
          </div>
        </div>
      </section>
      <section id="forma" style={{ padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontWeight: 700, fontSize: '20px', color: '#FFFFFF', margin: '0 0 6px 0', textAlign: 'center' }}>Əməkdaşlıq üçün <span style={{ color: '#FF2CA8' }}>müraciət et</span></h2>
          <p style={{ color: '#A0A0B0', fontSize: '12px', margin: '0 0 20px 0', textAlign: 'center' }}>24 saat ərzində sizinlə əlaqə saxlayacağıq.</p>
          {sent ? (
            <div style={{ background: 'rgba(0,214,143,0.08)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '16px', padding: '32px 20px', textAlign: 'center' }}>
              <div style={{ marginBottom: '14px', color: '#00D68F', display: 'flex', justifyContent: 'center' }}><PartyPopper size={42} /></div>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '18px', margin: 0 }}>Müraciətiniz qəbul edildi!</h3>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '16px', padding: '20px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>ŞİRKƏT ADI</label><input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Şirkət adınız" required style={inp} /></div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>ƏLAQƏLƏNDİRİCİ ŞƏXS</label><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Ad Soyadınız" required style={inp} /></div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>TELEFON</label><input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+994 50 XXX XX XX" required style={inp} /></div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>EMAIL</label><input value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@shirket.az" type="email" required style={inp} /></div>
                <div>
                  <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>ƏMƏKDAŞ SAYI</label>
                  <select value={form.employees} onChange={e => update('employees', e.target.value)} required style={{ ...inp, background: 'rgba(20,20,30,1)' }}>
                    <option value="">Seçin...</option><option>1-5 nəfər</option><option>6-15 nəfər</option><option>16-30 nəfər</option><option>31-50 nəfər</option><option>50+ nəfər</option>
                  </select>
                </div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>ƏLAVƏ MƏLUMAT</label><textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Hansı sahədə təlim istədiyinizi yazın..." rows={4} style={{ ...inp, resize: 'vertical' }} /></div>
                <button type="submit" disabled={loading} style={{ background: '#FF2CA8', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Göndərilir...' : 'Müraciət Göndər'}</button>
              </form>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function KorporativPage() {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  return isMobile ? <MobileKorporativ /> : <DesktopKorporativ />;
}
