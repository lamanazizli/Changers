'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import useIsMobile from '../../lib/useIsMobile';

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '10px',
  padding: '14px 18px',
  color: '#FFFFFF',
  fontSize: '15px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif',
};

const contactItems = [
  { icon: '📍', label: 'Ünvan', value: 'Bakı, Azərbaycan', sub: 'İnşaatçılar metrostansiyasının yaxınlığı, Abbas Mirzə Şərifzadə küçəsi 110' },
  { icon: '📞', label: 'Telefon', value: '+994 10 255 75 55', sub: 'Bazar ertəsi - Cümə, 09:00 - 18:00' },
  { icon: '✉️', label: 'Email', value: 'info@changers.az', sub: '24 saat ərzində cavab' },
  { icon: '💬', label: 'WhatsApp', value: '+994 10 255 75 55', sub: 'Sürətli cavab üçün WhatsAppda yaz.' },
];

const faqItems = [
  { q: 'Kurslar nə vaxt başlayır?', a: 'Kurslar hər ay yeni qrup ilə başlayır. Qeydiyyatdan sonra sizə ən yaxın başlanğıc tarixi bildiriləcək.' },
  { q: 'Tədris onlayn yoxsa offline keçilir?', a: 'Həm onlayn həm offline format mövcuddur. Siz özünüzə uyğun formatı seçə bilərsiniz.' },
  { q: 'Heç bir bilik olmadan qeydiyyatdan keçə bilərəmmi?', a: 'Bəli, kurslarımız sıfırdan başlayır. Heç bir ön bilik tələb olunmur.' },
  { q: 'Sertifikat verilirmi?', a: 'Kursu bitirən hər tələbəyə rəsmi Changers Academy sertifikatı verilir.' },
];

function useContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
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
        body: JSON.stringify({ ...form, course: 'Elaqe formu' }),
      });
      setSent(true);
    } catch { alert('Xəta baş verdi, yenidən cəhd edin'); }
    setLoading(false);
  };
  return { form, update, sent, loading, handleSubmit };
}

function DesktopElaqe() {
  const { form, update, sent, loading, handleSubmit } = useContactForm();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Əlaqə" />
      <section style={{ position: 'relative', padding: '80px 0 60px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(circle, rgba(255,44,168,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>BİZİMLƏ ƏLAQƏ</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '60px', color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.05 }}>Sualın var?<br /><span style={{ color: '#FF2CA8' }}>Bizə yaz!</span></h1>
          <p style={{ fontSize: '18px', color: '#A0A0B0', margin: 0, maxWidth: '500px' }}>24 saat ərzində cavab veririk.</p>
        </div>
      </section>
      <section style={{ padding: '60px 0 100px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: '28px', color: '#FFFFFF', margin: '0 0 32px 0' }}>Əlaqə məlumatları</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              {contactItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ width: '44px', height: '44px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>{item.label.toUpperCase()}</div>
                    <div style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 600 }}>{item.value}</div>
                    <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="https://wa.me/994102557555" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#25D366', borderRadius: '14px', padding: '20px 24px', textDecoration: 'none' }}>
              <span style={{ fontSize: '28px' }}>💬</span>
              <div><div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px' }}>WhatsApp ilə yaz</div><div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', marginTop: '2px' }}>Sürətli cavab al</div></div>
              <span style={{ color: '#FFFFFF', marginLeft: 'auto', fontSize: '20px' }}>→</span>
            </a>
          </div>
          <div>
            {sent ? (
              <div style={{ background: 'rgba(0,214,143,0.08)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
                <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '24px', margin: '0 0 12px 0' }}>Mesajınız göndərildi!</h3>
                <p style={{ color: '#A0A0B0', fontSize: '15px', margin: 0 }}>24 saat ərzində sizinlə əlaqə saxlanılacaq.</p>
              </div>
            ) : (
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '20px', padding: '40px' }}>
                <h2 style={{ fontWeight: 700, fontSize: '24px', color: '#FFFFFF', margin: '0 0 28px 0' }}>Mesaj göndər</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>AD, SOYAD *</label><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Adınız" required style={inputStyle} /></div>
                    <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>TELEFON *</label><input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+994 50 XXX XX XX" required style={inputStyle} /></div>
                  </div>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>EMAIL</label><input value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@example.com" type="email" style={inputStyle} /></div>
                  <div><label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>MESAJINIZ *</label><textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Sualınızı yazın..." required rows={5} style={{ ...inputStyle, resize: 'vertical' }} /></div>
                  <button type="submit" disabled={loading} style={{ background: '#FF2CA8', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Göndərilib...' : 'Mesaj Göndər →'}</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div style={{ width: '40px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600 }}>FAQ</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {faqItems.map((faq, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '24px' }}>
                <h3 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '15px', margin: '0 0 10px 0' }}>❓ {faq.q}</h3>
                <p style={{ color: '#A0A0B0', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function MobileElaqe() {
  const { form, update, sent, loading, handleSubmit } = useContactForm();
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Navbar activePage="Əlaqə" />
      <section style={{ padding: '32px 0 24px' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '30px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
            <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 600 }}>BİZİMLƏ ƏLAQƏ</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '28px', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.15 }}>Sualın var?<br /><span style={{ color: '#FF2CA8' }}>Bizə yaz!</span></h1>
          <p style={{ fontSize: '13px', color: '#A0A0B0', margin: 0 }}>24 saat ərzində cavab veririk.</p>
        </div>
      </section>
      <section style={{ padding: '0 0 32px' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <h2 style={{ fontWeight: 700, fontSize: '18px', color: '#FFFFFF', margin: '0 0 16px 0' }}>Əlaqə məlumatları</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {contactItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px' }}>
                <div style={{ width: '38px', height: '38px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>{item.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: '#A0A0B0', fontSize: '10px', fontWeight: 600, marginBottom: '3px' }}>{item.label.toUpperCase()}</div>
                  <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600 }}>{item.value}</div>
                  <div style={{ color: '#A0A0B0', fontSize: '11px', marginTop: '2px' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <a href="https://wa.me/994102557555" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#25D366', borderRadius: '12px', padding: '16px', textDecoration: 'none', marginBottom: '24px' }}>
            <span style={{ fontSize: '22px' }}>💬</span>
            <div><div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '14px' }}>WhatsApp ilə yaz</div></div>
            <span style={{ color: '#FFFFFF', marginLeft: 'auto', fontSize: '16px' }}>→</span>
          </a>
          {sent ? (
            <div style={{ background: 'rgba(0,214,143,0.08)', border: '1px solid rgba(0,214,143,0.3)', borderRadius: '16px', padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '44px', marginBottom: '14px' }}>✅</div>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '18px', margin: '0 0 10px 0' }}>Mesajınız göndərildi!</h3>
              <p style={{ color: '#A0A0B0', fontSize: '13px', margin: 0 }}>24 saat ərzində əlaqə saxlanılacaq.</p>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '16px', padding: '20px' }}>
              <h2 style={{ fontWeight: 700, fontSize: '18px', color: '#FFFFFF', margin: '0 0 18px 0' }}>Mesaj göndər</h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>AD, SOYAD *</label><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Adınız" required style={inputStyle} /></div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>TELEFON *</label><input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+994 50 XXX XX XX" required style={inputStyle} /></div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>EMAIL</label><input value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@example.com" type="email" style={inputStyle} /></div>
                <div><label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>MESAJINIZ *</label><textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Sualınızı yazın..." required rows={4} style={{ ...inputStyle, resize: 'vertical' }} /></div>
                <button type="submit" disabled={loading} style={{ background: '#FF2CA8', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '15px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Göndərilib...' : 'Mesaj Göndər →'}</button>
              </form>
            </div>
          )}
        </div>
      </section>
      <section style={{ background: '#13131A', padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '30px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
            <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 600 }}>FAQ</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqItems.map((faq, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                <h3 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '13px', margin: '0 0 8px 0' }}>❓ {faq.q}</h3>
                <p style={{ color: '#A0A0B0', fontSize: '12px', lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function ElaqePage() {
  const isMobile = useIsMobile();
  if (isMobile === null) return null;
  return isMobile ? <MobileElaqe /> : <DesktopElaqe />;
}
