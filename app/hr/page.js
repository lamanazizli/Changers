'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useIsMobile from '../../lib/useIsMobile';
import { HardHat, Ruler, Sofa, Smartphone, ShoppingCart, Monitor, CheckCircle, Zap, Target, Handshake, ClipboardList, Search, PartyPopper, MessageCircle, Briefcase } from 'lucide-react';
import useIsTablet from '../../lib/useIsTablet';

const fields = [
  { id: 1, icon: HardHat, name: 'Tikinti & BIM', desc: 'BIM meneceri, Revit mütəxəssisi, tikinti mühəndisi' },
  { id: 2, icon: Ruler, name: 'Arxitektura', desc: 'Arxitekt, ArchiCAD, layihə mühəndisi' },
  { id: 3, icon: Sofa, name: 'Daxili Dizayn', desc: 'İnterior dizayner, 3D vizualizator' },
  { id: 4, icon: Smartphone, name: 'Digital Marketing', desc: 'SMM mütəxəssisi, Meta/Google Ads, content manager' },
  { id: 5, icon: ShoppingCart, name: 'E-Commerce', desc: 'Onlayn mağaza meneceri, dropshipping mütəxəssisi' },
  { id: 6, icon: Monitor, name: 'IT & QA', desc: 'QA mühəndisi, test mütəxəssisi, texniki dəstək' },
];

const benefits = [
  { icon: CheckCircle, title: 'Yoxlanılmış Namizədlər', desc: 'Bütün məzunlar praktiki layihə ilə sertifikatlaşdırılıb.' },
  { icon: Zap, title: 'Sürətli Uyğunlaşma', desc: 'Real layihə təcrübəsi olan məzunlar dərhal işə başlaya bilər.' },
  { icon: Target, title: 'Sahə üzrə Seçim', desc: 'Tikinti, dizayn, marketinq — hansı sahə lazımdırsa, bizdə var.' },
  { icon: Handshake, title: 'Pulsuz Xidmət', desc: 'İlk namizəd yerləşdirməsi tamamilə ödənişsizdir.' },
];

const processSteps = [
  { num: '01', icon: ClipboardList, title: 'Müraciət Et', desc: 'Formu doldurun, hansı mütəxəssisə ehtiyacınız olduğunu yazın.' },
  { num: '02', icon: Search, title: 'Namizəd Seçimi', desc: '24 saat ərzində uyğun namizədləri sizə göndəririk.' },
  { num: '03', icon: Handshake, title: 'Müsahibə', desc: 'Namizədlərlə birbaşa əlaqə saxlayıb müsahibə aparırsınız.' },
  { num: '04', icon: CheckCircle, title: 'İşə Qəbul', desc: 'Seçdiyiniz namizədi işə götürürsünüz. Pulsuz!' },
];

const inp = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '14px 18px', color: '#FFFFFF', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' };

function useHRForm() {
  const [form, setForm] = useState({ company: '', name: '', phone: '', email: '', field: '', count: '', requirements: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, phone: form.phone, email: form.email,
          course: 'HR - Kadrınızı bizdə tapın',
          message: 'Şirkət: ' + form.company + ' | Sahə: ' + form.field + ' | Say: ' + form.count + ' | ' + form.requirements
        }),
      });
      setSent(true);
    } catch { alert('Xəta baş verdi'); }
    setLoading(false);
  };
  return { form, update, sent, loading, handleSubmit, selectedField, setSelectedField };
}

function DesktopHR() {
  const { form, update, sent, loading, handleSubmit, selectedField, setSelectedField } = useHRForm();
  const isTablet = useIsTablet();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar />
      <section style={{ background: '#0B0B0F', padding: '80px 0 60px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '100px', padding: '8px 16px', marginBottom: '24px' }}>
            <span style={{ color: '#00D68F', fontSize: '12px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Briefcase size={14} /> HR & İşə Qəbul</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '56px', color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.1 }}>
            Kadrınızı<br /><span style={{ color: '#00D68F' }}>Bizdə Tapın</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 32px 0', maxWidth: '600px' }}>Changers Academy məzunları praktiki hazırlıqlı, sertifikatlı mütəxəssislərdir.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#forma" style={{ textDecoration: 'none', background: '#00D68F', color: '#0B0B0F', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px' }}>Namizəd Tap →</a>
            <a href="https://wa.me/994102557555" style={{ textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 600, fontSize: '15px', padding: '16px 28px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}><MessageCircle size={16} /> WhatsApp</a>
          </div>
        </div>
      </section>
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {[{ v: '500+', l: 'Sertifikatlı Məzun' }, { v: '90%', l: 'İşə Düzəldi' }, { v: '6', l: 'Sahə' }, { v: '4.9', l: 'Şirkət Reytinqi' }].map((s, i) => (
            <div key={i} style={{ padding: '36px 0', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '36px', color: '#00D68F' }}>{s.v}</div>
              <div style={{ fontSize: '13px', color: '#A0A0B0', marginTop: '6px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}><h2 style={{ fontWeight: 700, fontSize: '40px', color: '#FFFFFF', margin: 0 }}>Niyə Changers Məzunları?</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '24px' }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px 24px', textAlign: 'center' }}>
                <div style={{ marginBottom: '16px', color: '#00D68F', display: 'flex', justifyContent: 'center' }}><b.icon size={32} /></div>
                <h3 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, margin: '0 0 12px 0' }}>{b.title}</h3>
                <p style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontWeight: 700, fontSize: '40px', color: '#FFFFFF', margin: '0 0 12px 0' }}>Hansı Sahələrdə Namizəd Var?</h2>
            <p style={{ color: '#A0A0B0', fontSize: '15px', margin: 0 }}>Aşağıdakı sahələrdə sertifikatlı məzunlarımız mövcuddur.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '20px' }}>
            {fields.map((f) => (
              <div key={f.id} onClick={() => { setSelectedField(f.id); update('field', f.name); }} style={{ background: selectedField === f.id ? 'rgba(0,214,143,0.08)' : 'rgba(255,255,255,0.03)', border: '1px solid ' + (selectedField === f.id ? 'rgba(0,214,143,0.4)' : 'rgba(255,255,255,0.08)'), borderRadius: '16px', padding: '28px 24px', cursor: 'pointer' }}>
                <div style={{ marginBottom: '12px', color: '#00D68F' }}><f.icon size={32} /></div>
                <h3 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, margin: '0 0 8px 0' }}>{f.name}</h3>
                <p style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                {selectedField === f.id && <div style={{ color: '#00D68F', fontSize: '12px', fontWeight: 600, marginTop: '12px' }}>Seçildi</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}><h2 style={{ fontWeight: 700, fontSize: '40px', color: '#FFFFFF', margin: 0 }}>Proses Necə İşləyir?</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '24px' }}>
            {processSteps.map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px 24px' }}>
                <div style={{ width: '40px', height: '40px', background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00D68F', fontSize: '12px', fontWeight: 700, marginBottom: '16px' }}>{s.num}</div>
                <div style={{ marginBottom: '12px', color: '#00D68F' }}><s.icon size={26} /></div>
                <h3 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, margin: '0 0 10px 0' }}>{s.title}</h3>
                <p style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="forma" style={{ background: '#13131A', padding: '80px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontWeight: 700, fontSize: '40px', color: '#FFFFFF', margin: '0 0 16px 0' }}>Namizəd <span style={{ color: '#00D68F' }}>Müraciəti</span></h2>
            <p style={{ color: '#A0A0B0', fontSize: '16px', margin: 0 }}>24 saat ərzində sizə uyğun namizədləri göndərəcəyik.</p>
          </div>
          {sent ? (
            <div style={{ background: 'rgba(0,214,143,0.08)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '20px', padding: '60px', textAlign: 'center' }}>
              <div style={{ marginBottom: '20px', color: '#00D68F', display: 'flex', justifyContent: 'center' }}><PartyPopper size={56} /></div>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '28px', margin: '0 0 12px 0' }}>Müraciətiniz Qəbul Edildi!</h3>
              <p style={{ color: '#A0A0B0', fontSize: '16px', margin: 0 }}>24 saat ərzində sizə uyğun namizədlər göndəriləcək.</p>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,214,143,0.2)', borderRadius: '20px', padding: '48px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>ŞİRKƏT ADI *</label><input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Şirkət adınız" required style={inp} /></div>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>ƏLAQƏ ŞƏXSİ *</label><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Ad Soyadınız" required style={inp} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>TELEFON *</label><input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+994 50 XXX XX XX" required style={inp} /></div>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>EMAIL *</label><input value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@shirket.az" type="email" required style={inp} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>SAHƏ *</label>
                    <select value={form.field} onChange={e => update('field', e.target.value)} required style={{ ...inp, background: 'rgba(20,20,30,1)' }}>
                      <option value="">Sahə seçin...</option>
                      {fields.map(f => <option key={f.id}>{f.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>NAMİZƏD SAYI *</label>
                    <select value={form.count} onChange={e => update('count', e.target.value)} required style={{ ...inp, background: 'rgba(20,20,30,1)' }}>
                      <option value="">Seçin...</option><option>1 nəfər</option><option>2-3 nəfər</option><option>4-5 nəfər</option><option>5+ nəfər</option>
                    </select>
                  </div>
                </div>
                <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>TƏLƏBLƏR</label><textarea value={form.requirements} onChange={e => update('requirements', e.target.value)} placeholder="Namizəddən gözlədiklərinizi yazın..." rows={4} style={{ ...inp, resize: 'vertical' }} /></div>
                <button type="submit" disabled={loading} style={{ background: '#00D68F', color: '#0B0B0F', border: 'none', borderRadius: '10px', padding: '18px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Göndərilir...' : 'Namizəd Tap →'}</button>
                <div style={{ textAlign: 'center', color: '#00D68F', fontSize: '13px' }}>İlk namizəd yerləşdirməsi tamamilə ödənişsizdir</div>
              </form>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

function MobileHR() {
  const { form, update, sent, loading, handleSubmit, selectedField, setSelectedField } = useHRForm();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh', width: '100%', overflowX: 'clip' }}>
      <Navbar />
      <section style={{ background: '#0B0B0F', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '100px', padding: '6px 12px', marginBottom: '16px' }}>
            <span style={{ color: '#00D68F', fontSize: '11px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Briefcase size={13} /> HR & İşə Qəbul</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '30px', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.15 }}>
            Kadrınızı<br /><span style={{ color: '#00D68F' }}>Bizdə Tapın</span>
          </h1>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: '0 0 24px 0' }}>Changers məzunları praktiki hazırlıqlı, sertifikatlıdır.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="#forma" style={{ textDecoration: 'none', background: '#00D68F', color: '#0B0B0F', fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '10px' }}>Namizəd Tap →</a>
            <a href="https://wa.me/994102557555" style={{ textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 600, fontSize: '14px', padding: '14px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><MessageCircle size={16} /> WhatsApp</a>
          </div>
        </div>
      </section>
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[{ v: '500+', l: 'Sertifikatlı Məzun' }, { v: '90%', l: 'İşə Düzəldi' }, { v: '6', l: 'Sahə' }, { v: '4.9', l: 'Reytinq' }].map((s, i) => (
            <div key={i} style={{ padding: '18px 0', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '20px', color: '#00D68F' }}>{s.v}</div>
              <div style={{ fontSize: '11px', color: '#A0A0B0', marginTop: '4px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontWeight: 700, fontSize: '20px', color: '#FFFFFF', margin: '0 0 20px 0', textAlign: 'center' }}>Niyə Changers Məzunları?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {benefits.map((b, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ flexShrink: 0, color: '#00D68F' }}><b.icon size={26} /></div>
                <div><h3 style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700, margin: '0 0 3px 0' }}>{b.title}</h3><p style={{ color: '#A0A0B0', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>{b.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontWeight: 700, fontSize: '20px', color: '#FFFFFF', margin: '0 0 6px 0', textAlign: 'center' }}>Hansı Sahələrdə Namizəd Var?</h2>
          <p style={{ color: '#A0A0B0', fontSize: '12px', margin: '0 0 20px 0', textAlign: 'center' }}>Aşağıdakı sahələrdə sertifikatlı məzunlarımız var.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {fields.map((f) => (
              <div key={f.id} onClick={() => { setSelectedField(f.id); update('field', f.name); }} style={{ background: selectedField === f.id ? 'rgba(0,214,143,0.08)' : 'rgba(255,255,255,0.03)', border: '1px solid ' + (selectedField === f.id ? 'rgba(0,214,143,0.4)' : 'rgba(255,255,255,0.08)'), borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ flexShrink: 0, color: '#00D68F' }}><f.icon size={24} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700, margin: '0 0 3px 0' }}>{f.name}</h3>
                  <p style={{ color: '#A0A0B0', fontSize: '11px', lineHeight: 1.4, margin: 0 }}>{f.desc}</p>
                </div>
                {selectedField === f.id && <CheckCircle size={16} style={{ color: '#00D68F', flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontWeight: 700, fontSize: '20px', color: '#FFFFFF', margin: '0 0 20px 0', textAlign: 'center' }}>Proses Necə İşləyir?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {processSteps.map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px' }}>
                <div style={{ width: '30px', height: '30px', background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00D68F', fontSize: '10px', fontWeight: 700, marginBottom: '10px' }}>{s.num}</div>
                <div style={{ marginBottom: '8px', color: '#00D68F' }}><s.icon size={20} /></div>
                <h3 style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 700, margin: '0 0 6px 0' }}>{s.title}</h3>
                <p style={{ color: '#A0A0B0', fontSize: '11px', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="forma" style={{ background: '#13131A', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontWeight: 700, fontSize: '20px', color: '#FFFFFF', margin: '0 0 6px 0', textAlign: 'center' }}>Namizəd <span style={{ color: '#00D68F' }}>Müraciəti</span></h2>
          <p style={{ color: '#A0A0B0', fontSize: '12px', margin: '0 0 20px 0', textAlign: 'center' }}>24 saat ərzində uyğun namizədləri göndərəcəyik.</p>
          {sent ? (
            <div style={{ background: 'rgba(0,214,143,0.08)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '16px', padding: '32px 20px', textAlign: 'center' }}>
              <div style={{ marginBottom: '14px', color: '#00D68F', display: 'flex', justifyContent: 'center' }}><PartyPopper size={42} /></div>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '18px', margin: '0 0 8px 0' }}>Müraciətiniz Qəbul Edildi!</h3>
              <p style={{ color: '#A0A0B0', fontSize: '13px', margin: 0 }}>24 saat ərzində namizədlər göndəriləcək.</p>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,214,143,0.2)', borderRadius: '16px', padding: '20px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>ŞİRKƏT ADI *</label><input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Şirkət adınız" required style={inp} /></div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>ƏLAQƏ ŞƏXSİ *</label><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Ad Soyadınız" required style={inp} /></div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>TELEFON *</label><input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+994 50 XXX XX XX" required style={inp} /></div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>EMAIL *</label><input value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@shirket.az" type="email" required style={inp} /></div>
                <div>
                  <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>SAHƏ *</label>
                  <select value={form.field} onChange={e => update('field', e.target.value)} required style={{ ...inp, background: 'rgba(20,20,30,1)' }}>
                    <option value="">Sahə seçin...</option>
                    {fields.map(f => <option key={f.id}>{f.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>NAMİZƏD SAYI *</label>
                  <select value={form.count} onChange={e => update('count', e.target.value)} required style={{ ...inp, background: 'rgba(20,20,30,1)' }}>
                    <option value="">Seçin...</option><option>1 nəfər</option><option>2-3 nəfər</option><option>4-5 nəfər</option><option>5+ nəfər</option>
                  </select>
                </div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>TƏLƏBLƏR</label><textarea value={form.requirements} onChange={e => update('requirements', e.target.value)} placeholder="Namizəddən gözlədiklərinizi yazın..." rows={4} style={{ ...inp, resize: 'vertical' }} /></div>
                <button type="submit" disabled={loading} style={{ background: '#00D68F', color: '#0B0B0F', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Göndərilir...' : 'Namizəd Tap →'}</button>
                <div style={{ textAlign: 'center', color: '#00D68F', fontSize: '12px' }}>İlk namizəd yerləşdirməsi pulsuzdur</div>
              </form>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function HRPage() {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  return isMobile ? <MobileHR /> : <DesktopHR />;
}
