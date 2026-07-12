'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useIsMobile from '../../lib/useIsMobile';
import { Target, BarChart3, Trophy, BookOpen, RefreshCw, Briefcase, PartyPopper } from 'lucide-react';
import useIsTablet from '../../lib/useIsTablet';

const packages = [
  { name: 'Baslangic', price: '2,500 AZN', period: '/ay', color: '#7B2FFF', features: ['5 emekdasa qeder telim', 'BIM & AutoCAD kursu', 'Aylik hesabat', 'Online format', 'Sertifikat'] },
  { name: 'Korporativ', price: '5,000 AZN', period: '/ay', color: '#FF2CA8', popular: true, features: ['15 emekdasa qeder telim', '3 kurs secimi', 'Heftəlik hesabat', 'Offline + Online', 'Sertifikat + Portfolio', 'Mentor desteyi'] },
  { name: 'Enterprise', price: 'Ferdi', period: '', color: '#00D68F', features: ['Limitsiz emekdas', 'Butun kurslar', 'Gunluk hesabat', 'Offline + Online', 'Dedicated mentor', 'Ferdi sillabus'] },
];

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
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, course: 'Korporativ emekdasliq', message: 'Sirket: ' + form.company + ' | Emekdas: ' + form.employees + ' | ' + form.message }),
      });
      setSent(true);
    } catch { alert('Xeta bas verdi'); }
    setLoading(false);
  };
  return { form, update, sent, loading, handleSubmit };
}

const inp = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '14px 18px', color: '#FFFFFF', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' };

function DesktopKorporativ() {
  const { form, update, sent, loading, handleSubmit } = useForm();
  const isTablet = useIsTablet();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar />
      <section style={{ position: 'relative', padding: '80px 0 60px', overflow: 'hidden', textAlign: 'center' }}>
        
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '8px 16px', marginBottom: '24px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 500 }}>Korporativ Emekdasliq</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '60px', color: '#FFFFFF', margin: '0 0 20px 0', lineHeight: 1.1 }}>Komandanizi<br /><span style={{ color: '#FF2CA8' }}>Guclendirik</span></h1>
          <p style={{ fontSize: '18px', color: '#A0A0B0', margin: '0 auto 48px', maxWidth: '600px' }}>Sirketinizin emekdaslarina praktiki telim verin.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <a href="#forma" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px' }}>Muraciet Et</a>
            <a href="https://wa.me/994000000000" style={{ textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 600, fontSize: '15px', padding: '16px 28px', borderRadius: '10px' }}>WhatsApp</a>
          </div>
        </div>
      </section>
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {[{ v: '50+', l: 'Korporativ Musteri' }, { v: '500+', l: 'Hazirlanmis Kadr' }, { v: '10+', l: 'Sektor' }, { v: '4.9', l: 'Musteri Reytinqi' }].map((s, i) => (
            <div key={i} style={{ padding: '36px 0', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '36px', color: '#FF2CA8' }}>{s.v}</div>
              <div style={{ fontSize: '13px', color: '#A0A0B0', marginTop: '6px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}><h2 style={{ fontWeight: 700, fontSize: '44px', color: '#FFFFFF', margin: 0 }}>Korporativ Ustunlukler</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { icon: Target, title: 'Ferdi Sillabus', desc: 'Sirketinizin ehtiyaclarina uygun xususi tedris proqrami hazirlanir.' },
              { icon: BarChart3, title: 'Hesabat Sistemi', desc: 'Heftəlik emekdas tereqqisi hesabati ile neticeni izleyin.' },
              { icon: Trophy, title: 'Sertifikat', desc: 'Sektorda tanindan resmi Changers Academy sertifikati verilir.' },
              { icon: BookOpen, title: 'Dedicated Mentor', desc: 'Her korporativ musteriye ayrica mentor teyin edilir.' },
              { icon: RefreshCw, title: 'Cevik Format', desc: 'Offline, online ve ya hibrid format secimi sizin ucundur.' },
              { icon: Briefcase, title: 'HR Desteyi', desc: 'Tedris sonrasi kadr yerlesdirilmesinde komeklik edilir.' },
            ].map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px 24px' }}>
                <div style={{ marginBottom: '16px', color: '#FF2CA8' }}><f.icon size={32} /></div>
                <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0' }}>{f.title}</h3>
                <p style={{ color: '#A0A0B0', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}><h2 style={{ fontWeight: 700, fontSize: '44px', color: '#FFFFFF', margin: 0 }}>Sirketiniz ucun Plan Secin</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : 'repeat(3, 1fr)', gap: '24px', alignItems: 'start' }}>
            {packages.map((pkg, i) => (
              <div key={i} style={{ background: pkg.popular ? 'rgba(255,44,168,0.08)' : 'rgba(255,255,255,0.03)', border: '1px solid ' + (pkg.popular ? 'rgba(255,44,168,0.5)' : 'rgba(255,255,255,0.08)'), borderRadius: '20px', padding: '40px 32px', position: 'relative' }}>
                {pkg.popular && <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#FF2CA8', color: '#FFFFFF', fontSize: '12px', fontWeight: 700, padding: '5px 20px', borderRadius: '100px', whiteSpace: 'nowrap' }}>En Populyar</div>}
                <div style={{ color: pkg.color, fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>{pkg.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '32px' }}>
                  <span style={{ fontWeight: 700, fontSize: '36px', color: '#FFFFFF' }}>{pkg.price}</span>
                  <span style={{ color: '#A0A0B0', fontSize: '14px' }}>{pkg.period}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                  {pkg.features.map((f, j) => <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: pkg.color, fontWeight: 700 }}>+</span><span style={{ color: '#FFFFFF', fontSize: '14px' }}>{f}</span></div>)}
                </div>
                <a href="#forma" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', background: pkg.popular ? '#FF2CA8' : 'transparent', border: '1px solid ' + pkg.color, color: pkg.popular ? '#FFFFFF' : pkg.color, fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '10px' }}>{pkg.price === 'Ferdi' ? 'Elaqe saxla' : 'Paket sec'}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="forma" style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontWeight: 700, fontSize: '44px', color: '#FFFFFF', margin: '0 0 16px 0' }}>Emekdasliq ucun <span style={{ color: '#FF2CA8' }}>Muraciet Et</span></h2>
            <p style={{ color: '#A0A0B0', fontSize: '16px', margin: 0 }}>24 saat erzinde sizinle elaqe saxlayacagiq.</p>
          </div>
          {sent ? (
            <div style={{ background: 'rgba(0,214,143,0.08)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '20px', padding: '60px', textAlign: 'center' }}>
              <div style={{ marginBottom: '20px', color: '#00D68F', display: 'flex', justifyContent: 'center' }}><PartyPopper size={56} /></div>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '28px', margin: 0 }}>Muracietiniz Qebul Edildi!</h3>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '20px', padding: '48px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>SIRKET ADI</label><input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Sirket adiniz" required style={inp} /></div>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>ELAQE SEXSI</label><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Ad Soyadiniz" required style={inp} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>TELEFON</label><input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+994 50 XXX XX XX" required style={inp} /></div>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>EMAIL</label><input value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@shirket.az" type="email" required style={inp} /></div>
                </div>
                <div>
                  <label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>EMEKDAS SAYI</label>
                  <select value={form.employees} onChange={e => update('employees', e.target.value)} required style={{ ...inp, background: 'rgba(20,20,30,1)' }}>
                    <option value="">Secin...</option><option>1-5 nefer</option><option>6-15 nefer</option><option>16-30 nefer</option><option>31-50 nefer</option><option>50+ nefer</option>
                  </select>
                </div>
                <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>ELAVE MELUMAT</label><textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Hansi sahede telim istediginizi yazin..." rows={4} style={{ ...inp, resize: 'vertical' }} /></div>
                <button type="submit" disabled={loading} style={{ background: '#FF2CA8', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '18px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Gonderilib...' : 'Muraciet Gonder'}</button>
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
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Navbar />
      <section style={{ padding: '40px 0', textAlign: 'center' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '6px 12px', marginBottom: '16px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 500 }}>Korporativ Əməkdaşlıq</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '28px', color: '#FFFFFF', margin: '0 0 14px 0', lineHeight: 1.15 }}>Komandanızı<br /><span style={{ color: '#FF2CA8' }}>Gücləndirin</span></h1>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: '0 0 24px 0' }}>Şirkətinizin əməkdaşlarına praktiki təlim verin.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="#forma" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '10px' }}>Müraciət Et</a>
            <a href="https://wa.me/994000000000" style={{ textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 600, fontSize: '14px', padding: '14px', borderRadius: '10px' }}>WhatsApp</a>
          </div>
        </div>
      </section>
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[{ v: '50+', l: 'Korporativ Müştəri' }, { v: '500+', l: 'Hazırlanmış Kadr' }, { v: '10+', l: 'Sektor' }, { v: '4.9', l: 'Reytinq' }].map((s, i) => (
            <div key={i} style={{ padding: '18px 0', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '20px', color: '#FF2CA8' }}>{s.v}</div>
              <div style={{ fontSize: '11px', color: '#A0A0B0', marginTop: '4px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontWeight: 700, fontSize: '20px', color: '#FFFFFF', margin: '0 0 20px 0', textAlign: 'center' }}>Korporativ Üstünlüklər</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: Target, title: 'Fərdi Sillabus', desc: 'Şirkətin ehtiyaclarına uyğun xüsusi tədris.' },
              { icon: BarChart3, title: 'Hesabat Sistemi', desc: 'Həftəlik tərəqqi hesabatı.' },
              { icon: Trophy, title: 'Sertifikat', desc: 'Rəsmi Changers Academy sertifikatı.' },
              { icon: BookOpen, title: 'Dedicated Mentor', desc: 'Hər müştəriyə ayrıca mentor.' },
              { icon: RefreshCw, title: 'Çevik Format', desc: 'Offline, online və ya hibrid.' },
              { icon: Briefcase, title: 'HR Dəstəyi', desc: 'Kadr yerləşdirilməsində köməklik.' },
            ].map((f, i) => (
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
          <h2 style={{ fontWeight: 700, fontSize: '20px', color: '#FFFFFF', margin: '0 0 20px 0', textAlign: 'center' }}>Şirkətiniz üçün Plan Seçin</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {packages.map((pkg, i) => (
              <div key={i} style={{ background: pkg.popular ? 'rgba(255,44,168,0.08)' : 'rgba(255,255,255,0.03)', border: '1px solid ' + (pkg.popular ? 'rgba(255,44,168,0.5)' : 'rgba(255,255,255,0.08)'), borderRadius: '16px', padding: '24px', position: 'relative' }}>
                {pkg.popular && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#FF2CA8', color: '#FFFFFF', fontSize: '10px', fontWeight: 700, padding: '4px 16px', borderRadius: '100px', whiteSpace: 'nowrap' }}>En Populyar</div>}
                <div style={{ color: pkg.color, fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>{pkg.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '18px' }}>
                  <span style={{ fontWeight: 700, fontSize: '26px', color: '#FFFFFF' }}>{pkg.price}</span>
                  <span style={{ color: '#A0A0B0', fontSize: '13px' }}>{pkg.period}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                  {pkg.features.map((f, j) => <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: pkg.color, fontWeight: 700 }}>+</span><span style={{ color: '#FFFFFF', fontSize: '12px' }}>{f}</span></div>)}
                </div>
                <a href="#forma" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', background: pkg.popular ? '#FF2CA8' : 'transparent', border: '1px solid ' + pkg.color, color: pkg.popular ? '#FFFFFF' : pkg.color, fontWeight: 700, fontSize: '13px', padding: '12px', borderRadius: '10px' }}>{pkg.price === 'Ferdi' ? 'Əlaqə saxla' : 'Paket seç'}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="forma" style={{ padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontWeight: 700, fontSize: '20px', color: '#FFFFFF', margin: '0 0 6px 0', textAlign: 'center' }}>Əməkdaşlıq üçün <span style={{ color: '#FF2CA8' }}>Müraciət Et</span></h2>
          <p style={{ color: '#A0A0B0', fontSize: '12px', margin: '0 0 20px 0', textAlign: 'center' }}>24 saat ərzində sizinlə əlaqə saxlayacağıq.</p>
          {sent ? (
            <div style={{ background: 'rgba(0,214,143,0.08)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '16px', padding: '32px 20px', textAlign: 'center' }}>
              <div style={{ marginBottom: '14px', color: '#00D68F', display: 'flex', justifyContent: 'center' }}><PartyPopper size={42} /></div>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '18px', margin: 0 }}>Müraciətiniz Qəbul Edildi!</h3>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '16px', padding: '20px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>ŞİRKƏT ADI</label><input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Şirkət adınız" required style={inp} /></div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>ƏLAQƏ ŞƏXSİ</label><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Ad Soyadınız" required style={inp} /></div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>TELEFON</label><input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+994 50 XXX XX XX" required style={inp} /></div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>EMAIL</label><input value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@shirket.az" type="email" required style={inp} /></div>
                <div>
                  <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>ƏMƏKDAŞ SAYI</label>
                  <select value={form.employees} onChange={e => update('employees', e.target.value)} required style={{ ...inp, background: 'rgba(20,20,30,1)' }}>
                    <option value="">Seçin...</option><option>1-5 nəfər</option><option>6-15 nəfər</option><option>16-30 nəfər</option><option>31-50 nəfər</option><option>50+ nəfər</option>
                  </select>
                </div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>ƏLAVƏ MƏLUMAT</label><textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Hansı sahədə təlim istədiyinizi yazın..." rows={4} style={{ ...inp, resize: 'vertical' }} /></div>
                <button type="submit" disabled={loading} style={{ background: '#FF2CA8', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Göndərilib...' : 'Müraciət Göndər'}</button>
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
