'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const mentorlar = [
  {
    initials: 'EM', name: 'Elvin Mammadov', color: '#FF2CA8',
    title: 'Senior BIM Manager',
    company: 'Tikinti & Layihe Şirketi',
    exp: '8 il tecrube',
    courses: ['BIM & Tikinti Idareetmesi', 'AutoCAD & Revit Master'],
    bio: 'Elvin 8 ilden cox BIM texnologiyalari sahesinde calismisdir. Azerbaycanin en boyuk tikinti layihelerinde BIM meneceri kimi is aparib. Changers-de telebelerine real layihe tecrubesi kazandirmagi hedifliyir.',
    skills: ['Revit', 'AutoCAD', 'BIM 360', 'Navisworks', 'Layihe Menecmenti'],
    students: '120+',
    rating: '4.9',
    linkedin: '#',
  },
  {
    initials: 'NA', name: 'Nigar Aliyeva', color: '#7B2FFF',
    title: 'Digital Marketing Lead',
    company: 'Marketing Agency',
    exp: '6 il tecrube',
    courses: ['Digital Marketing & SMM Pro', 'E-Commerce & Dropshipping'],
    bio: 'Nigar Azerbaycanin aparici marketing agentlikleri ile is aparmisdir. Google ve Meta sertifikatli marketoloq kimi 50+ brend ucun ugurlu kampaniyalar heyata kecirmisdir.',
    skills: ['Meta Ads', 'Google Ads', 'SEO', 'Analytics', 'Content Marketing'],
    students: '200+',
    rating: '4.9',
    linkedin: '#',
  },
  {
    initials: 'SH', name: 'Sevinc Hasanova', color: '#00D68F',
    title: 'Interior Designer & 3D Artist',
    company: 'Oz Studiyasi',
    exp: '7 il tecrube',
    courses: ['Interior Design & 3D Viz'],
    bio: 'Sevinc Azerbaycan ve Turkiyede 100-den cox interior dizayn layihesi heyata kecirmisdir. 3ds Max ve Lumion ustasi kimi telebelerine professional vizualizasiya texnikalarini oyredendir.',
    skills: ['3ds Max', 'Lumion', 'V-Ray', 'AutoCAD', 'SketchUp'],
    students: '80+',
    rating: '4.8',
    linkedin: '#',
  },
  {
    initials: 'KA', name: 'Kamil Agayev', color: '#FFB800',
    title: 'Arxitekt & BIM Spesialisti',
    company: 'Arxitektura Burosu',
    exp: '10 il tecrube',
    courses: ['Arxitektura & BIM'],
    bio: 'Kamil Avropa ve Azerbaycanda cox sayda arxitektura layihesinde is aparib. ArchiCAD ve Revit Architecture uzre derin biliyine sahib olan Kamil telim sahesinde de 5 illik tecrubeyə malikdir.',
    skills: ['ArchiCAD', 'Revit Architecture', 'SketchUp', 'BIM', 'Renderinq'],
    students: '60+',
    rating: '4.9',
    linkedin: '#',
  },
];

export default function MentorlarPage() {
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Mentorlar" />

      {/* Hero */}
      <section style={{ position: 'relative', padding: '100px 0 80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: '0', transform: 'translateX(-50%)', width: '800px', height: '500px', background: 'radial-gradient(circle, rgba(123,47,255,0.15) 0%, rgba(255,44,168,0.08) 40%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
            <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>KOMANDAMIZ</span>
          </div>
          <h1 style={{ fontWeight: 700, fontSize: '64px', color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.05 }}>
            Sahənin <span style={{ color: '#FF2CA8' }}>Ustalarından</span><br />Oyrən
          </h1>
          <p style={{ fontSize: '18px', color: '#A0A0B0', margin: '0 0 48px 0', maxWidth: '600px' }}>
            Mentorlarimiz real sektorda calisan, tecrubeli mutexessislerdir. Nəzəriyyə deyil, praktika oyredirler.
          </p>
          <div style={{ display: 'flex', gap: '40px' }}>
            {[{ v: '4', l: 'Ekspert Mentor' }, { v: '460+', l: 'Mezun Telebe' }, { v: '4.9', l: 'Ortalama Reytinq' }, { v: '15+', l: 'Il Tecrube' }].map((s, i) => (
              <div key={i}>
                <div style={{ fontWeight: 700, fontSize: '28px', color: '#FF2CA8' }}>{s.v}</div>
                <div style={{ fontSize: '13px', color: '#A0A0B0', marginTop: '4px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentorlar Grid */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}>
            {mentorlar.map((m, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px', display: 'flex', gap: '28px' }}>
                {/* Avatar */}
                <div style={{ flexShrink: 0 }}>
                  <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${m.color}, rgba(123,47,255,0.6))`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '24px', border: `2px solid ${m.color}`, boxShadow: `0 0 24px ${m.color}40` }}>
                    {m.initials}
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '20px', margin: '0 0 4px 0' }}>{m.name}</h3>
                      <div style={{ color: m.color, fontSize: '13px', fontWeight: 500 }}>{m.title}</div>
                      <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{m.company} · {m.exp}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#FFB800', fontSize: '13px' }}>⭐ {m.rating}</div>
                      <div style={{ color: '#A0A0B0', fontSize: '11px', marginTop: '2px' }}>{m.students} telebe</div>
                    </div>
                  </div>

                  <p style={{ color: '#A0A0B0', fontSize: '13px', lineHeight: 1.7, margin: '16px 0' }}>{m.bio}</p>

                  {/* Skills */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {m.skills.map((skill, j) => (
                      <span key={j} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', fontSize: '11px', padding: '4px 10px', borderRadius: '6px' }}>{skill}</span>
                    ))}
                  </div>

                  {/* Courses */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                    <div style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, marginBottom: '8px', letterSpacing: '1px' }}>TƏDRIS ETDIYI KURSLAR</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {m.courses.map((c, j) => (
                        <span key={j} style={{ background: `${m.color}15`, border: `1px solid ${m.color}40`, color: m.color, fontSize: '11px', fontWeight: 600, padding: '4px 12px', borderRadius: '100px' }}>{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#13131A', padding: '100px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: '44px', color: '#FFFFFF', margin: '0 0 16px 0' }}>
            Ekspert Mentorlarla <span style={{ color: '#FF2CA8' }}>Birbasa Calis</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#A0A0B0', margin: '0 0 36px 0' }}>Suallarin var? Pulsuz konsultasiya al, sene uygun kursu birlikde secek.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 40px', borderRadius: '10px', boxShadow: '0px 8px 28px rgba(255,44,168,0.45)' }}>
              Qeydiyyatdan Kec →
            </Link>
            <Link href="/kurslar" style={{ textDecoration: 'none', border: '1px solid rgba(255,44,168,0.4)', color: '#FF2CA8', fontWeight: 600, fontSize: '15px', padding: '16px 32px', borderRadius: '10px' }}>
              Kurslara Bax
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
