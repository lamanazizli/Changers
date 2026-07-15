'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { PartyPopper, ClipboardList, Check, Lock } from 'lucide-react';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^(\+994|0)(10|50|51|55|60|70|77|99)\d{7}$/.test(phone.replace(/[\s\-()]/g, ''));
import useIsMobile from '../../lib/useIsMobile';

const steps = [
  { num: 1, label: 'Şəxsi məlumat' },
  { num: 2, label: 'Kurs seçimi' },
  { num: 3, label: 'Əlaqə' },
  { num: 4, label: 'Təsdiq' },
];

function useCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch('/api/admin/courses')
      .then(r => r.json())
      .then(data => {
        if (data.courses) setCourses(data.courses.filter(c => c.is_active !== false).map(c => c.title));
      })
      .catch(() => {});
  }, []);
  return courses;
}

export default function QeydiyyatPage() {
  const isMobile = useIsMobile();
  const courses = useCourses();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '+994 ', email: '', course: '', message: '', howFound: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch (e) {
      alert('Xəta baş verdi, yenidən cəhd edin');
    }
    setLoading(false);
  };

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

  const labelStyle = {
    color: '#A0A0B0',
    fontSize: '13px',
    marginBottom: '8px',
    display: 'block',
    fontWeight: 500,
  };

  if (submitted) {
    return (
      <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
        <Navbar />
        <section style={{ maxWidth: '600px', margin: '0 auto', padding: isMobile ? '60px 20px' : '120px 24px', textAlign: 'center', boxSizing: 'border-box' }}>
          <div style={{ marginBottom: '24px', color: '#FF2CA8', display: 'flex', justifyContent: 'center' }}><PartyPopper size={72} /></div>
          <h1 style={{ fontWeight: 700, fontSize: '36px', color: '#FFFFFF', margin: '0 0 16px 0' }}>Müraciətin qəbul edildi!</h1>
          <p style={{ fontSize: '16px', color: '#A0A0B0', lineHeight: 1.6, margin: '0 0 32px 0' }}>
            Təşəkkürlər! Komandamız 24 saat ərzində sizinlə əlaqə saxlayacaq. WhatsApp üzərindən də müraciət edə bilərsiniz.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <a href="/" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '14px 28px', borderRadius: '10px' }}>Ana Səhifə</a>
            <a href="https://wa.me/994102557555" style={{ textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '14px 28px', borderRadius: '10px' }}>WhatsApp</a>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Qeydiyyat" />

      <section style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '32px 16px' : '80px 24px', boxSizing: 'border-box' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '100px', padding: '8px 16px', marginBottom: '20px' }}>
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><ClipboardList size={14} /> Qeydiyyat</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: isMobile ? '26px' : '40px', color: '#FFFFFF', margin: '0 0 12px 0' }}>
            Karyerana <span style={{ color: '#FF2CA8' }}>başla!</span>
          </h1>
          <p style={{ fontSize: '15px', color: '#A0A0B0' }}>Formu doldur, komandamız səninlə elaqe saxlayacaq.</p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '48px', gap: '0' }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: isMobile ? '32px' : '40px', height: isMobile ? '32px' : '40px', borderRadius: '50%',
                  background: step >= s.num ? '#FF2CA8' : 'rgba(255,255,255,0.06)',
                  border: step === s.num ? '2px solid #FF2CA8' : step > s.num ? '2px solid #FF2CA8' : '2px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: step >= s.num ? '#FFFFFF' : '#A0A0B0',
                  fontWeight: 700, fontSize: '14px',
                  boxShadow: step === s.num ? '0 0 20px rgba(255,44,168,0.4)' : 'none',
                  transition: 'all 0.3s',
                }}>
                  {step > s.num ? <Check size={16} /> : s.num}
                </div>
                <span style={{ fontSize: isMobile ? '9px' : '11px', color: step >= s.num ? '#FF2CA8' : '#A0A0B0', fontWeight: step === s.num ? 600 : 400, whiteSpace: 'nowrap', display: isMobile ? 'none' : 'block' }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: isMobile ? '20px' : '80px', height: '2px', background: step > s.num ? '#FF2CA8' : 'rgba(255,255,255,0.1)', margin: isMobile ? '0 3px' : '0 8px', marginBottom: '24px', transition: 'all 0.3s' }} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '20px', padding: isMobile ? '20px' : '40px', boxSizing: 'border-box' }}>

          {step === 1 && (
            <div>
              <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '22px', margin: '0 0 28px 0' }}>Şəxsi məlumatlar</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Ad, Soyad *</label>
                  <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Məsələn: Leyla Əzizli" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@example.com" type="email" style={{ ...inputStyle, border: form.email && !isValidEmail(form.email) ? '1px solid #FF4D4D' : inputStyle.border }} />
                  {form.email && !isValidEmail(form.email) && <div style={{ color: '#FF4D4D', fontSize: '12px', marginTop: '6px' }}>Düzgün email daxil edin (məsələn: ad@example.com)</div>}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '22px', margin: '0 0 28px 0' }}>Kurs seçimi</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {courses.map((c, i) => (
                  <div key={i} onClick={() => update('course', c)} style={{
                    padding: '16px 20px', borderRadius: '12px', cursor: 'pointer',
                    background: form.course === c ? 'rgba(255,44,168,0.12)' : 'rgba(255,255,255,0.04)',
                    border: form.course === c ? '1px solid rgba(255,44,168,0.5)' : '1px solid rgba(255,255,255,0.08)',
                    color: form.course === c ? '#FFFFFF' : '#A0A0B0',
                    fontSize: '14px', fontWeight: form.course === c ? 600 : 400,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'all 0.2s',
                  }}>
                    {c}
                    {form.course === c && <Check size={16} color="#FF2CA8" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '22px', margin: '0 0 28px 0' }}>Əlaqə məlumatları</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Telefon nömrəsi *</label>
                  <input value={form.phone} onChange={e => {
                    let v = e.target.value;
                    if (!v.startsWith('+994')) v = '+994 ' + v.replace(/^\+994\s*/, '');
                    update('phone', v);
                  }} placeholder="+994 50 XXX XX XX" style={{ ...inputStyle, border: form.phone && !isValidPhone(form.phone) ? '1px solid #FF4D4D' : inputStyle.border }} />
                  {form.phone && !isValidPhone(form.phone) && <div style={{ color: '#FF4D4D', fontSize: '12px', marginTop: '6px' }}>Düzgün nömrə daxil edin (məsələn: +994 50 123 45 67)</div>}
                </div>
                <div>
                  <label style={labelStyle}>Əlavə mesaj (opsional)</label>
                  <textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Sual və ya qeydin varsa yaz..." rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={labelStyle}>Bizi haradan tapdınız?</label>
                  <select value={form.howFound} onChange={e => update('howFound', e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
                    <option value="">Secin...</option>
                    <option>Instagram</option>
                    <option>Facebook</option>
                    <option>Dost Tavsiyesi</option>
                    <option>Google</option>
                    <option>Diger</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '22px', margin: '0 0 28px 0' }}>Məlumatları yoxla</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                {[
                  { label: 'Ad Soyad', value: form.name },
                  { label: 'Email', value: form.email },
                  { label: 'Telefon', value: form.phone },
                  { label: 'Kurs', value: form.course },
                  { label: 'Mesaj', value: form.message || '—' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ color: '#A0A0B0', fontSize: '13px' }}>{item.label}</span>
                    <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(255,44,168,0.08)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '12px', padding: '16px', fontSize: '13px', color: '#A0A0B0', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Lock size={13} /> Məlumatlarınız güvənlə saxlanılır.
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', justifyContent: 'space-between', marginTop: '32px', gap: '12px' }}>
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} style={{ padding: '14px 28px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: '#A0A0B0', fontSize: '14px', cursor: 'pointer', fontWeight: 500 }}>
                ← Geri
              </button>
            )}
            <div style={{ flex: 1 }} />
            {step < 4 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={
                (step === 1 && (!form.name || !form.email || !isValidEmail(form.email))) ||
                (step === 2 && !form.course) ||
                (step === 3 && (!form.phone || !isValidPhone(form.phone)))
              } style={{
                padding: '14px 32px', background: '#FF2CA8', border: 'none', borderRadius: '10px',
                color: '#FFFFFF', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0px 4px 16px rgba(255,44,168,0.45)',
                opacity: (step === 1 && (!form.name || !form.email || !isValidEmail(form.email))) || (step === 2 && !form.course) || (step === 3 && (!form.phone || !isValidPhone(form.phone))) ? 0.5 : 1,
              }}>
                İrəli
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} style={{ padding: '14px 32px', background: '#FF2CA8', border: 'none', borderRadius: '10px', color: '#FFFFFF', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '0px 4px 16px rgba(255,44,168,0.45)' }}>
                {loading ? 'Gonderilib...' : 'Müraciəti göndər'}
              </button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
