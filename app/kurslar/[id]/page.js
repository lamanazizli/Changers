'use client';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import useIsMobile from '../../../lib/useIsMobile';

const courses = {
  '1': {
    category: 'Tikinti', icon: '🏗', color: '#FF2CA8',
    title: 'BIM & Tikinti Idareetmesi',
    subtitle: 'AutoCAD, Revit, BIM 360 ile real layihe esasli praktiki tedris kursu.',
    duration: '4 hefte', price: '299 AZN', students: '120+', rating: '4.9',
    gradient: 'linear-gradient(135deg, rgba(255,44,168,0.4), rgba(123,47,255,0.5))',
    about: 'Bu kurs tikinti sektorunda calismaq isteyen herkes ucundur. Real layiheler uzerinde calismaq, mentor desteyi ve sektor mutexessisleri ile bire bir elaqeler qurmaq imkani verir.',
    curriculum: [
      { week: 'Hefte 1', title: 'AutoCAD Esaslari', topics: ['2D cizim', 'Katlar ve bloklar', 'Annotation', 'Cixis formatlari'] },
      { week: 'Hefte 2', title: 'Revit Architecture', topics: ['BIM konsepti', 'Walls, floors', 'Mebel ve elementler', 'Sheet ve view'] },
      { week: 'Hefte 3', title: 'BIM 360', topics: ['Cloud collaboration', 'Koordinasiya', 'Model review', 'RFI prosesi'] },
      { week: 'Hefte 4', title: 'Real Layihe', topics: ['Layihe planlamasi', 'Komanda isi', 'Presentation', 'Portfolio'] },
    ],
    skills: ['AutoCAD 2D/3D', 'Revit Architecture', 'BIM 360', 'Navisworks', 'Layihe menecmenti'],
    mentor: { name: 'Elvin Mammadov', title: 'Senior BIM Manager', exp: '8 il tecrube', initials: 'EM' },
  },
  '2': {
    category: 'Digital Marketing', icon: '📱', color: '#7B2FFF',
    title: 'Digital Marketing & SMM Pro',
    subtitle: 'Google Ads, Meta Ads, SEO, Analytics ile kampaniya idareetmesi.',
    duration: '4 hefte', price: '249 AZN', students: '200+', rating: '4.9',
    gradient: 'linear-gradient(135deg, rgba(123,47,255,0.4), rgba(0,214,143,0.3))',
    about: 'Sosial media menecment, odeme reklamlari ve SEO sahesinde karyera qurmaq isteyen herkes ucun nezerde tutulub.',
    curriculum: [
      { week: 'Hefte 1', title: 'SMM Esaslari', topics: ['Content strategy', 'Instagram & Facebook', 'Copywriting', 'Design basics'] },
      { week: 'Hefte 2', title: 'Meta Ads', topics: ['Ads Manager', 'Audience targeting', 'Creative testing', 'Budget'] },
      { week: 'Hefte 3', title: 'Google Ads & SEO', topics: ['Search kampaniyasi', 'Display ads', 'On-page SEO', 'Analytics'] },
      { week: 'Hefte 4', title: 'Real Layihe', topics: ['Musteriye hesabat', 'ROI hesablama', 'Portfolio', 'Freelance'] },
    ],
    skills: ['Meta Ads', 'Google Ads', 'SEO', 'Google Analytics', 'Content Marketing'],
    mentor: { name: 'Nigar Aliyeva', title: 'Digital Marketing Lead', exp: '6 il tecrube', initials: 'NA' },
  },
  '3': {
    category: 'Daxili Dizayn', icon: '🛋', color: '#00D68F',
    title: 'Interior Design & 3D Viz',
    subtitle: '3ds Max, Lumion, V-Ray ile interior dizayn ve vizualizasiya.',
    duration: '5 hefte', price: '319 AZN', students: '80+', rating: '4.8',
    gradient: 'linear-gradient(135deg, rgba(0,214,143,0.4), rgba(123,47,255,0.3))',
    about: 'Daxili dizayn ve 3D vizualizasiya sahesinde pesekar olmaq isteyen herkes ucun nezerde tutulub.',
    curriculum: [
      { week: 'Hefte 1', title: 'Dizayn Esaslari', topics: ['Renk teoriyasi', 'Stil ve konsept', 'Proportions', 'Mood board'] },
      { week: 'Hefte 2', title: '3ds Max', topics: ['Modelling', 'Materials', 'Lighting', 'Camera'] },
      { week: 'Hefte 3', title: 'V-Ray Render', topics: ['Render settings', 'HDRI', 'Post-process', 'Photorealism'] },
      { week: 'Hefte 4', title: 'Lumion', topics: ['Real-time render', 'Walkthrough', 'Animation', 'Presentation'] },
      { week: 'Hefte 5', title: 'Real Layihe', topics: ['Musterie prezentasiya', '360 render', 'Portfolio', 'Branding'] },
    ],
    skills: ['3ds Max', 'Lumion', 'V-Ray', 'AutoCAD', 'Adobe Photoshop'],
    mentor: { name: 'Sevinc Hasanova', title: 'Interior Designer', exp: '7 il tecrube', initials: 'SH' },
  },
};

function useCourse(params) {
  const id = params?.id || '1';
  return courses[id] || courses['1'];
}

function DesktopCourseDetail({ course }) {
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Kurslar" />
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0' }}>
        <div style={{ position: 'absolute', inset: 0, background: course.gradient, opacity: 0.15 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,11,15,0.5) 0%, rgba(11,11,15,0.95) 100%)' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <span style={{ background: course.color, color: '#fff', fontSize: '11px', fontWeight: 700, padding: '5px 14px', borderRadius: '100px', marginBottom: '20px', display: 'inline-block' }}>{course.icon} {course.category}</span>
              <h1 style={{ fontWeight: 700, fontSize: '48px', color: '#FFFFFF', margin: '0 0 16px 0', lineHeight: 1.1 }}>{course.title}</h1>
              <p style={{ fontSize: '17px', color: '#A0A0B0', margin: '0 0 32px 0', lineHeight: 1.6 }}>{course.subtitle}</p>
              <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
                {[{ icon: '⏱', label: course.duration }, { icon: '👥', label: course.students + ' telebe' }, { icon: '⭐', label: course.rating + ' reytinq' }].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '14px' }}>{s.icon}</span><span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 500 }}>{s.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Link href="/qeydiyyat" style={{ textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px 32px', borderRadius: '10px' }}>Indi Qeydiyyatdan Kec →</Link>
                <a href="https://wa.me/994000000000" style={{ textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 600, fontSize: '15px', padding: '16px 24px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>💬 WhatsApp</a>
              </div>
            </div>
            <div style={{ background: '#13131A', border: '1px solid rgba(255,44,168,0.25)', borderRadius: '20px', padding: '32px', minWidth: '300px', flexShrink: 0 }}>
              <div style={{ fontSize: '40px', fontWeight: 700, color: '#FF2CA8', marginBottom: '4px' }}>{course.price}</div>
              <div style={{ fontSize: '13px', color: '#A0A0B0', marginBottom: '28px' }}>bir defeyik odenis</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {['Intensiv praktiki kurs', 'Real layihe portfeli', 'Mentor desteyi', 'Resmi sertifikat', 'Is tapma desteyi', 'Omurboyu materiallara giriş'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '18px', height: '18px', background: 'rgba(255,44,168,0.15)', border: '1px solid rgba(255,44,168,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2CA8', fontSize: '9px', flexShrink: 0 }}>✓</div>
                    <span style={{ color: '#FFFFFF', fontSize: '13px' }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/qeydiyyat" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', padding: '16px', borderRadius: '10px' }}>Qeydiyyatdan Kec →</Link>
              <div style={{ textAlign: 'center', color: '#A0A0B0', fontSize: '12px', marginTop: '12px' }}>🔒 Odenis taminatimiz var</div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 80px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '60px' }}>
          <div>
            <div style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
                <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>KURS HAQQINDA</span>
              </div>
              <p style={{ fontSize: '16px', color: '#A0A0B0', lineHeight: 1.8 }}>{course.about}</p>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '40px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
                <span style={{ color: '#FF2CA8', fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>CURRICULUM</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {course.curriculum.map((week, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                      <span style={{ background: 'rgba(255,44,168,0.15)', border: '1px solid rgba(255,44,168,0.3)', color: '#FF2CA8', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', flexShrink: 0 }}>{week.week}</span>
                      <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '15px' }}>{week.title}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {week.topics.map((t, j) => <span key={j} style={{ background: 'rgba(255,255,255,0.06)', color: '#A0A0B0', fontSize: '12px', padding: '5px 12px', borderRadius: '6px' }}>{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px', margin: '0 0 20px 0' }}>Oyrenecekleriniz</h3>
              {course.skills.map((skill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '20px', height: '20px', background: 'rgba(255,44,168,0.15)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2CA8', fontSize: '9px', flexShrink: 0 }}>✓</div>
                  <span style={{ color: '#FFFFFF', fontSize: '14px' }}>{skill}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px' }}>
              <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px', margin: '0 0 20px 0' }}>Mentor</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, rgba(255,44,168,0.3), rgba(123,47,255,0.3))', border: '2px solid rgba(255,44,168,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '18px', flexShrink: 0 }}>{course.mentor.initials}</div>
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '16px' }}>{course.mentor.name}</div>
                  <div style={{ color: '#FF2CA8', fontSize: '12px', marginTop: '4px' }}>{course.mentor.title}</div>
                  <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '2px' }}>{course.mentor.exp}</div>
                </div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,44,168,0.08)', border: '1px solid rgba(255,44,168,0.25)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🎓</div>
              <p style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600, margin: '0 0 8px 0' }}>Hala sualin var?</p>
              <p style={{ color: '#A0A0B0', fontSize: '12px', margin: '0 0 16px 0' }}>Pulsuz konsultasiya al</p>
              <a href="https://wa.me/994000000000" style={{ display: 'block', textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 700, fontSize: '13px', padding: '12px', borderRadius: '8px' }}>💬 WhatsApp ile Yaz</a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function MobileCourseDetail({ course }) {
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Navbar activePage="Kurslar" />
      <section style={{ position: 'relative', overflow: 'hidden', padding: '24px 0 32px' }}>
        <div style={{ position: 'absolute', inset: 0, background: course.gradient, opacity: 0.15 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,11,15,0.5) 0%, rgba(11,11,15,0.95) 100%)' }} />
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box', position: 'relative', zIndex: 1 }}>
                    <span style={{ background: course.color, color: '#fff', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', marginBottom: '14px', display: 'inline-block' }}>{course.icon} {course.category}</span>
          <h1 style={{ fontWeight: 700, fontSize: '24px', color: '#FFFFFF', margin: '0 0 12px 0', lineHeight: 1.2 }}>{course.title}</h1>
          <p style={{ fontSize: '14px', color: '#A0A0B0', margin: '0 0 20px 0', lineHeight: 1.6 }}>{course.subtitle}</p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {[{ icon: '⏱', label: course.duration }, { icon: '👥', label: course.students }, { icon: '⭐', label: course.rating }].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '12px' }}>{s.icon}</span><span style={{ color: '#FFFFFF', fontSize: '11px', fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#13131A', border: '1px solid rgba(255,44,168,0.25)', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#FF2CA8', marginBottom: '4px' }}>{course.price}</div>
            <div style={{ fontSize: '12px', color: '#A0A0B0', marginBottom: '16px' }}>bir dəfəlik ödəniş</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
              {['Intensiv praktiki kurs', 'Real layihe portfeli', 'Mentor desteyi', 'Rəsmi sertifikat'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '16px', height: '16px', background: 'rgba(255,44,168,0.15)', border: '1px solid rgba(255,44,168,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2CA8', fontSize: '8px', flexShrink: 0 }}>✓</div>
                  <span style={{ color: '#FFFFFF', fontSize: '12px' }}>{item}</span>
                </div>
              ))}
            </div>
            <Link href="/qeydiyyat" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '14px', padding: '14px', borderRadius: '10px' }}>Qeydiyyatdan Keç →</Link>
          </div>
          <a href="https://wa.me/994000000000" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 600, fontSize: '14px', padding: '14px', borderRadius: '10px' }}>💬 WhatsApp</a>
        </div>
      </section>
      <section style={{ padding: '32px 0' }}>
        <div style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '30px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
              <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 600 }}>KURS HAQQINDA</span>
            </div>
            <p style={{ fontSize: '13px', color: '#A0A0B0', lineHeight: 1.7 }}>{course.about}</p>
          </div>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '30px', height: '3px', background: '#FF2CA8', borderRadius: '2px' }} />
              <span style={{ color: '#FF2CA8', fontSize: '11px', fontWeight: 600 }}>CURRICULUM</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {course.curriculum.map((week, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(255,44,168,0.15)', border: '1px solid rgba(255,44,168,0.3)', color: '#FF2CA8', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '100px' }}>{week.week}</span>
                    <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '13px' }}>{week.title}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {week.topics.map((t, j) => <span key={j} style={{ background: 'rgba(255,255,255,0.06)', color: '#A0A0B0', fontSize: '11px', padding: '4px 10px', borderRadius: '6px' }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '18px', marginBottom: '16px' }}>
            <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '14px', margin: '0 0 14px 0' }}>Öyrənəcəkləriniz</h3>
            {course.skills.map((skill, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ width: '18px', height: '18px', background: 'rgba(255,44,168,0.15)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2CA8', fontSize: '8px', flexShrink: 0 }}>✓</div>
                <span style={{ color: '#FFFFFF', fontSize: '13px' }}>{skill}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '18px', marginBottom: '16px' }}>
            <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '14px', margin: '0 0 14px 0' }}>Mentor</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, rgba(255,44,168,0.3), rgba(123,47,255,0.3))', border: '2px solid rgba(255,44,168,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '15px', flexShrink: 0 }}>{course.mentor.initials}</div>
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '14px' }}>{course.mentor.name}</div>
                <div style={{ color: '#FF2CA8', fontSize: '11px', marginTop: '2px' }}>{course.mentor.title}</div>
                <div style={{ color: '#A0A0B0', fontSize: '11px', marginTop: '2px' }}>{course.mentor.exp}</div>
              </div>
            </div>
          </div>
          <div style={{ background: 'rgba(255,44,168,0.08)', border: '1px solid rgba(255,44,168,0.25)', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', marginBottom: '10px' }}>🎓</div>
            <p style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600, margin: '0 0 6px 0' }}>Hala sualin var?</p>
            <p style={{ color: '#A0A0B0', fontSize: '11px', margin: '0 0 14px 0' }}>Pulsuz konsultasiya al</p>
            <a href="https://wa.me/994000000000" style={{ display: 'block', textDecoration: 'none', background: '#25D366', color: '#FFFFFF', fontWeight: 700, fontSize: '12px', padding: '12px', borderRadius: '8px' }}>💬 WhatsApp ile Yaz</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default function CourseDetail({ params }) {
  const isMobile = useIsMobile();
  const course = useCourse(params);
  if (isMobile === null) return null;
  return isMobile ? <MobileCourseDetail course={course} /> : <DesktopCourseDetail course={course} />;
}
