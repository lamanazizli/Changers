'use client';
import Link from 'next/link';

export default function HomeSections() {
  return (
    <>
      <section style={{ background: '#0B0B0F', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'flex', justifyContent: 'space-between' }}>
          {[
            { icon: '🏗', name: 'Tikinti', sub: 'Insaat & Layihe' },
            { icon: '🏛', name: 'Arxitektura', sub: 'Dizayn & BIM' },
            { icon: '📱', name: 'Digital Marketing', sub: 'SMM & Ads' },
            { icon: '🛋', name: 'Daxili Dizayn', sub: 'Interior & 3D' },
            { icon: '📐', name: 'BIM & AutoCAD', sub: 'Revit & CAD' },
          ].map((cat, i) => (
            <Link key={i} href="/kurslar" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: '32px 24px', flex: 1, borderRight: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ width: '44px', height: '44px', background: 'rgba(255,44,168,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{cat.icon}</div>
              <div>
                <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>{cat.name}</div>
                <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{cat.sub}</div>
              </div>
              <span style={{ color: '#FF2CA8', marginLeft: 'auto' }}>→</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
              <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>NIYE CHANGERS?</span>
            </div>
            <h2 style={{ fontSize: '44px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Bizim Ferqimiz</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { icon: '🎯', title: 'Real Layiheler', desc: 'Her kurs real sektoral layiheler uzerinden kecir.' },
              { icon: '🧑‍💼', title: 'Mentorluq Desteyi', desc: 'Sahe mutexessisleri ile birebir mentorluq seansları.' },
              { icon: '💼', title: 'Karyera Desteyi', desc: 'CV hazırlığı, musahibe simulyasiyası ve is baglantıları.' },
              { icon: '📜', title: 'Sertifikat', desc: 'Sektorda tanınan resmi sertifikat verilir.' },
            ].map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px 24px' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(255,44,168,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px' }}>{f.icon}</div>
                <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0' }}>{f.title}</h3>
                <p style={{ color: '#A0A0B0', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
              <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>NETICELER</span>
            </div>
            <h2 style={{ fontSize: '44px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 32px 0' }}>Mezunlarımız Ne Deyir?</h2>
            <div style={{ display: 'flex', gap: '48px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {[{ v: '500+', l: 'Mezun Sayı' }, { v: '4 Hefte', l: 'Ortalama Kurs' }, { v: '90%', l: 'Ise Duzaldi' }, { v: '4.9', l: 'Ortalama Reytinq' }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: '#FF2CA8' }}>{s.v}</div>
                  <div style={{ fontSize: '13px', color: '#A0A0B0', marginTop: '4px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { q: '4 heftede SMM mutexessisi oldum. Ilk ayda freelance is tapdım!', name: 'Ayten Memmedova', course: 'Digital Marketing', initials: 'AM', color: '#FF2CA8' },
              { q: 'Revit oyrendim, layihemi musabiqede 1-ci yere geldim.', name: 'Rauf Eliyev', course: 'BIM & Tikinti', initials: 'RE', color: '#7B2FFF' },
              { q: 'Portfolio-m ilk hefteden musteri celb etdi. Changers mocuzerdir!', name: 'Nermin Huseynova', course: 'Daxili Dizayn', initials: 'NH', color: '#00D68F' },
            ].map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px 24px' }}>
                <div style={{ color: '#FF2CA8', fontSize: '48px', lineHeight: 0.8, marginBottom: '16px' }}>"</div>
                <div style={{ color: '#FFB800', fontSize: '14px', marginBottom: '12px' }}>★★★★★</div>
                <p style={{ color: '#FFFFFF', fontSize: '15px', lineHeight: 1.6, margin: '0 0 24px 0' }}>{t.q}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', background: t.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '13px' }}>{t.initials}</div>
                  <div>
                    <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>{t.name}</div>
                    <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{t.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#13131A', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
              <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>NECE ISLEYIR?</span>
            </div>
            <h2 style={{ fontSize: '44px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>4 Addımda Karyerana Basla</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {[
              { num: '01', icon: '📋', title: 'Qeydiyyat ol', desc: 'Forma doldur, kurs sec, konsultasiya al.' },
              { num: '02', icon: '📚', title: 'Tedrise basla', desc: 'Canlı dersler + video destekl + mentor.' },
              { num: '03', icon: '🛠', title: 'Layihe hazirla', desc: 'Real sektoral layiheni tamamla.' },
              { num: '04', icon: '🎓', title: 'Sertifikat al', desc: 'Ise duzel, portfelin hazir olsun.' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '32px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(255,44,168,0.15)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2CA8', fontSize: '13px', fontWeight: 700 }}>{s.num}</div>
                  <span style={{ fontSize: '28px' }}>{s.icon}</span>
                </div>
                <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, margin: '0 0 12px 0' }}>{s.title}</h3>
                <p style={{ color: '#A0A0B0', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0B0B0F', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '24px', padding: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '60px' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.1 }}>Karyeranı Bu Gun<br /><span style={{ color: '#FF2CA8' }}>Basla</span></h2>
              <p style={{ color: '#A0A0B0', fontSize: '16px', margin: '0 0 24px 0' }}>Qeydiyyatdan kec, pulsuz konsultasiya al.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Ohdəliksiz', 'Pulsuz meslehet', 'Derhal cavab'].map((t, i) => (
                  <span key={i} style={{ color: '#A0A0B0', fontSize: '14px' }}>✓ {t}</span>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, maxWidth: '420px' }}>
              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input placeholder="Ad Soyadınız" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '16px 20px', color: '#FFFFFF', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                <input placeholder="Telefon nomresi" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '16px 20px', color: '#FFFFFF', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                <select style={{ background: 'rgba(20,20,30,1)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '16px 20px', color: '#A0A0B0', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box' }}>
                  <option value="">Kurs secin</option>
                  <option>BIM & Tikinti Idareetmesi</option>
                  <option>Digital Marketing & SMM Pro</option>
                  <option>Interior Design & 3D Viz</option>
                  <option>AutoCAD & Revit Master</option>
                </select>
                <button type="submit" style={{ background: '#FF2CA8', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '0px 8px 28px rgba(255,44,168,0.45)' }}>Qeydiyyatdan Kec →</button>
                <div style={{ textAlign: 'center', color: '#A0A0B0', fontSize: '13px' }}>🔒 Melumatlarınız qorunur</div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
