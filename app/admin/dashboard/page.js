'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TABS = [
  { id: 'applications', label: 'Muracietler', icon: '📋' },
  { id: 'home', label: 'Ana Sehife', icon: '🏠' },
  { id: 'courses', label: 'Kurslar', icon: '📚' },
  { id: 'mentors', label: 'Mentorlar', icon: '👨‍🏫' },
  { id: 'pages', label: 'Sehifeler', icon: '📄' },
];

const STATUS_COLORS = {
  new: '#FF2CA8',
  contacted: '#FFB800',
  enrolled: '#00D68F',
  cancelled: '#A0A0B0',
};

const HOME_FIELDS = [
  { section: 'hero', key: 'badge', label: 'Badge Metni' },
  { section: 'hero', key: 'title1', label: 'Bashliq 1 (ag)' },
  { section: 'hero', key: 'title2', label: 'Bashliq 2 (chehrayi)' },
  { section: 'hero', key: 'title3', label: 'Bashliq 3 (ag)' },
  { section: 'hero', key: 'subtitle', label: 'Alt Bashliq' },
  { section: 'hero', key: 'tags', label: 'Teqler' },
  { section: 'hero', key: 'btn1', label: 'Duyma 1' },
  { section: 'hero', key: 'btn2', label: 'Duyma 2' },
  { section: 'stats', key: 'stat1_value', label: 'Stat 1 Deyer' },
  { section: 'stats', key: 'stat1_label', label: 'Stat 1 Ad' },
  { section: 'stats', key: 'stat2_value', label: 'Stat 2 Deyer' },
  { section: 'stats', key: 'stat2_label', label: 'Stat 2 Ad' },
  { section: 'stats', key: 'stat3_value', label: 'Stat 3 Deyer' },
  { section: 'stats', key: 'stat3_label', label: 'Stat 3 Ad' },
  { section: 'stats', key: 'stat4_value', label: 'Stat 4 Deyer' },
  { section: 'stats', key: 'stat4_label', label: 'Stat 4 Ad' },
  { section: 'hero_image', key: 'testimonial_name', label: 'Testimonial Ad' },
  { section: 'hero_image', key: 'testimonial_text', label: 'Testimonial Metn' },
  { section: 'hero_image', key: 'stat1_value', label: 'Foto Stat 1 Deyer' },
  { section: 'hero_image', key: 'stat1_label', label: 'Foto Stat 1 Ad' },
  { section: 'hero_image', key: 'stat2_value', label: 'Foto Stat 2 Deyer' },
  { section: 'hero_image', key: 'stat2_label', label: 'Foto Stat 2 Ad' },
];

const PAGES_FIELDS = {
  kurslar: [
    { section: 'hero', key: 'title', label: 'Bashliq' },
    { section: 'hero', key: 'subtitle', label: 'Alt Bashliq' },
  ],
  neticeler: [
    { section: 'hero', key: 'title1', label: 'Bashliq 1' },
    { section: 'hero', key: 'title2', label: 'Bashliq 2 (chehrayi)' },
    { section: 'hero', key: 'subtitle', label: 'Alt Bashliq' },
  ],
  mentorlar: [
    { section: 'hero', key: 'title', label: 'Bashliq' },
    { section: 'hero', key: 'subtitle', label: 'Alt Bashliq' },
  ],
  elaqe: [
    { section: 'hero', key: 'title', label: 'Bashliq' },
    { section: 'hero', key: 'subtitle', label: 'Alt Bashliq' },
    { section: 'contact', key: 'address', label: 'Unvan' },
    { section: 'contact', key: 'phone', label: 'Telefon' },
    { section: 'contact', key: 'email', label: 'Email' },
    { section: 'contact', key: 'whatsapp', label: 'WhatsApp' },
  ],
  footer: [
    { section: 'main', key: 'tagline', label: 'Teqlayn' },
    { section: 'main', key: 'copyright', label: 'Copyright' },
  ],
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [homeContent, setHomeContent] = useState({});
  const [pagesContent, setPagesContent] = useState({});
  const [activePage, setActivePage] = useState('kurslar');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [saveMsg, setSaveMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin'); return; }
    fetchData();
  }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (tab === 'applications') {
        const res = await fetch('/api/admin/applications');
        const data = await res.json();
        setApplications(data.applications || []);
      } else if (tab === 'home') {
        const res = await fetch('/api/content?page=home');
        const data = await res.json();
        if (data.content) {
          setHomeContent(data.content);
          setPhotoPreview(data.content.hero_image?.student_photo || null);
        }
      } else if (tab === 'courses') {
        const res = await fetch('/api/admin/courses');
        const data = await res.json();
        setCourses(data.courses || []);
      } else if (tab === 'mentors') {
        const res = await fetch('/api/admin/mentors');
        const data = await res.json();
        setMentors(data.mentors || []);
      } else if (tab === 'pages') {
        const res = await fetch('/api/content?page=' + activePage);
        const data = await res.json();
        if (data.content) setPagesContent(prev => ({ ...prev, [activePage]: data.content }));
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => {
    if (tab === 'pages') fetchData();
  }, [activePage]);

  const saveContent = async (page, section, key, value) => {
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, section, key, value }),
    });
    setSaveMsg('Saxlanildi ✓');
    setTimeout(() => setSaveMsg(''), 2000);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('type', 'student');
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setPhotoPreview(data.path);
        setSaveMsg('Foto yuklenildi! ✓');
        setTimeout(() => setSaveMsg(''), 3000);
      } else {
        setSaveMsg('Xeta: ' + data.error);
      }
    } catch (err) {
      setSaveMsg('Yuklemede xeta bas verdi');
    }
    setUploading(false);
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Silmek istediginize eminsiniz?')) return;
    const endpoints = {
      applications: '/api/admin/applications',
      courses: '/api/admin/courses',
      mentors: '/api/admin/mentors',
    };
    await fetch(endpoints[type], {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  const handleStatusChange = async (id, status) => {
    await fetch('/api/admin/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status, notes: '' }),
    });
    fetchData();
  };

  const handleSave = async () => {
    const endpoints = { courses: '/api/admin/courses', mentors: '/api/admin/mentors' };
    const method = formData.id ? 'PATCH' : 'POST';
    await fetch(endpoints[modal], {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setModal(null);
    setFormData({});
    fetchData();
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  const filteredApps = applications.filter(a => {
    const matchSearch = !search ||
      a.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      a.phone?.includes(search) ||
      a.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const s = {
    card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' },
    btn: { background: '#FF2CA8', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' },
    input: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 14px', color: '#FFFFFF', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box', marginBottom: '12px', fontFamily: 'Inter, sans-serif' },
    label: { color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px', letterSpacing: '1px' },
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', background: '#13131A', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <img src="/logo.png" alt="Changers" style={{ height: '36px', width: 'auto', marginBottom: '4px' }} />
          <div style={{ color: '#A0A0B0', fontSize: '11px' }}>Admin Panel</div>
        </div>
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 16px', borderRadius: '10px', border: 'none',
              background: tab === t.id ? 'rgba(255,44,168,0.12)' : 'transparent',
              color: tab === t.id ? '#FF2CA8' : '#A0A0B0',
              fontSize: '14px', fontWeight: tab === t.id ? 600 : 400,
              cursor: 'pointer', marginBottom: '4px', textAlign: 'left',
            }}>
              <span>{t.icon}</span> {t.label}
              {t.id === 'applications' && applications.filter(a => a.status === 'new').length > 0 && (
                <span style={{ marginLeft: 'auto', background: '#FF2CA8', color: '#FFFFFF', borderRadius: '100px', padding: '2px 8px', fontSize: '11px', fontWeight: 700 }}>
                  {applications.filter(a => a.status === 'new').length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={logout} style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#A0A0B0', fontSize: '13px', cursor: 'pointer' }}>
            🚪 Cixis
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, background: '#0B0B0F', overflow: 'auto' }}>
        <div style={{ padding: '32px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '24px', margin: '0 0 4px 0' }}>
                {TABS.find(t => t.id === tab)?.icon} {TABS.find(t => t.id === tab)?.label}
              </h1>
              <p style={{ color: '#A0A0B0', fontSize: '13px', margin: 0 }}>Changers Academy idareetme paneli</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {saveMsg && <span style={{ color: '#00D68F', fontSize: '13px', fontWeight: 600 }}>{saveMsg}</span>}
              {(tab === 'courses' || tab === 'mentors') && (
                <button onClick={() => { setFormData({}); setModal(tab); }} style={s.btn}>+ Yeni Elave Et</button>
              )}
            </div>
          </div>

          {loading && <div style={{ color: '#A0A0B0', textAlign: 'center', padding: '60px' }}>Yuklenir...</div>}

          {/* APPLICATIONS */}
          {!loading && tab === 'applications' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Umumi', value: applications.length, color: '#FF2CA8' },
                  { label: 'Yeni', value: applications.filter(a => a.status === 'new').length, color: '#FF2CA8' },
                  { label: 'Elaqe Saxlanildi', value: applications.filter(a => a.status === 'contacted').length, color: '#FFB800' },
                  { label: 'Qeydiyyat Oldu', value: applications.filter(a => a.status === 'enrolled').length, color: '#00D68F' },
                ].map((stat, i) => (
                  <div key={i} style={{ ...s.card, textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '32px', color: stat.color }}>{stat.value}</div>
                    <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Ad, telefon, email axtar..." style={{ ...s.input, marginBottom: 0, maxWidth: '300px' }} />
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ ...s.input, marginBottom: 0, width: 'auto' }}>
                  <option value="all">Hamisi</option>
                  <option value="new">Yeni</option>
                  <option value="contacted">Elaqe Saxlanildi</option>
                  <option value="enrolled">Qeydiyyat Oldu</option>
                  <option value="cancelled">Legv Edildi</option>
                </select>
              </div>
              <div style={s.card}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      {['Ad Soyad', 'Telefon', 'Email', 'Qeyd/Kurs', 'Status', 'Tarix', 'Emeliyyat'].map(h => (
                        <th key={h} style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, padding: '12px 16px', textAlign: 'left', letterSpacing: '1px' }}>{h.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApps.map(app => (
                      <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '14px 16px', color: '#FFFFFF', fontSize: '14px', fontWeight: 500 }}>{app.full_name}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <a href={'tel:' + app.phone} style={{ color: '#FF2CA8', textDecoration: 'none', fontSize: '13px' }}>{app.phone}</a>
                        </td>
                        <td style={{ padding: '14px 16px', color: '#A0A0B0', fontSize: '13px' }}>{app.email || '—'}</td>
                        <td style={{ padding: '14px 16px', color: '#A0A0B0', fontSize: '12px', maxWidth: '160px' }}>{app.notes || app.message || '—'}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <select value={app.status} onChange={e => handleStatusChange(app.id, e.target.value)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '4px 8px', color: STATUS_COLORS[app.status] || '#FFFFFF', fontSize: '12px', cursor: 'pointer' }}>
                            <option value="new">Yeni</option>
                            <option value="contacted">Elaqe Saxlanildi</option>
                            <option value="enrolled">Qeydiyyat Oldu</option>
                            <option value="cancelled">Legv Edildi</option>
                          </select>
                        </td>
                        <td style={{ padding: '14px 16px', color: '#A0A0B0', fontSize: '12px' }}>
                          {new Date(app.created_at).toLocaleDateString('az-AZ')}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <button onClick={() => handleDelete('applications', app.id)} style={{ background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '6px', padding: '6px 12px', color: '#FF2CA8', fontSize: '12px', cursor: 'pointer' }}>Sil</button>
                        </td>
                      </tr>
                    ))}
                    {filteredApps.length === 0 && (
                      <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#A0A0B0' }}>Muraciet tapilmadi</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* HOME */}
          {!loading && tab === 'home' && (
            <div>
              {/* Photo Upload Section */}
              <div style={{ ...s.card, marginBottom: '24px', border: '1px solid rgba(255,44,168,0.25)' }}>
                <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px', margin: '0 0 16px 0' }}>🖼️ Hero Bannerdəki Foto</h3>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  {/* Preview */}
                  <div style={{ width: '100px', height: '130px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '32px' }}>👤</span>
                    )}
                  </div>
                  {/* Upload */}
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#A0A0B0', fontSize: '13px', margin: '0 0 16px 0' }}>
                      Yeni foto yukleyin. PNG, JPG formatları desteklenir. Arxa fonu qara ve ya seffaf olan sekil daha yaxsi gorunur.
                    </p>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FF2CA8', color: '#FFFFFF', fontWeight: 700, fontSize: '14px', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(255,44,168,0.4)' }}>
                      {uploading ? '⏳ Yukleniyor...' : '📤 Foto Yukle'}
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} disabled={uploading} />
                    </label>
                    {photoPreview && (
                      <p style={{ color: '#00D68F', fontSize: '12px', marginTop: '10px' }}>
                        ✓ Movcud foto: {photoPreview}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Tip */}
              <div style={{ ...s.card, marginBottom: '20px', background: 'rgba(0,214,143,0.05)', border: '1px solid rgba(0,214,143,0.2)' }}>
                <p style={{ color: '#00D68F', fontSize: '13px', margin: 0 }}>
                  💡 Saheden chixdiqda (blur) avtomatik saxlanilir. Saytda gorenmek ucun sehifeni yenilayin.
                </p>
              </div>

              {/* Content Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {HOME_FIELDS.map((field, i) => (
                  <div key={i} style={s.card}>
                    <label style={s.label}>{field.label.toUpperCase()}</label>
                    <input
                      key={`${field.section}-${field.key}-${homeContent[field.section]?.[field.key]}`}
                      defaultValue={homeContent[field.section]?.[field.key] || ''}
                      onBlur={async (e) => {
                        await saveContent('home', field.section, field.key, e.target.value);
                      }}
                      style={{ ...s.input, marginBottom: 0 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COURSES */}
          {!loading && tab === 'courses' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {courses.map(course => (
                <div key={course.id} style={s.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ background: course.color || '#FF2CA8', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px' }}>
                      {course.icon} {course.category}
                    </span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: course.is_active ? '#00D68F' : '#A0A0B0', display: 'inline-block', marginTop: '6px' }} />
                  </div>
                  <h3 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '15px', margin: '0 0 8px 0' }}>{course.title}</h3>
                  <p style={{ color: '#A0A0B0', fontSize: '12px', margin: '0 0 16px 0', lineHeight: 1.5 }}>{course.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                    <div>
                      <span style={{ color: '#FF2CA8', fontWeight: 700, fontSize: '14px' }}>{course.price}</span>
                      <span style={{ color: '#A0A0B0', fontSize: '12px', marginLeft: '8px' }}>⏱ {course.duration}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => { setFormData(course); setModal('courses'); }} style={{ ...s.btn, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', padding: '6px 12px' }}>Dəyiş</button>
                      <button onClick={() => handleDelete('courses', course.id)} style={{ ...s.btn, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', padding: '6px 12px' }}>Sil</button>
                    </div>
                  </div>
                </div>
              ))}
              {courses.length === 0 && <div style={{ color: '#A0A0B0', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>Kurs tapilmadi</div>}
            </div>
          )}

          {/* MENTORS */}
          {!loading && tab === 'mentors' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {mentors.map(mentor => (
                <div key={mentor.id} style={{ ...s.card, display: 'flex', gap: '16px' }}>
                  <div style={{ width: '60px', height: '60px', background: mentor.color || '#FF2CA8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '18px', flexShrink: 0 }}>
                    {mentor.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '16px' }}>{mentor.name}</div>
                        <div style={{ color: '#FF2CA8', fontSize: '12px', marginTop: '2px' }}>{mentor.title}</div>
                        <div style={{ color: '#A0A0B0', fontSize: '12px' }}>{mentor.company} · {mentor.experience}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => { setFormData(mentor); setModal('mentors'); }} style={{ ...s.btn, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', padding: '6px 10px', fontSize: '12px' }}>Dəyiş</button>
                        <button onClick={() => handleDelete('mentors', mentor.id)} style={{ ...s.btn, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', padding: '6px 10px', fontSize: '12px' }}>Sil</button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                      {(mentor.skills || '').split(',').map((skill, j) => (
                        <span key={j} style={{ background: 'rgba(255,255,255,0.06)', color: '#A0A0B0', fontSize: '11px', padding: '3px 8px', borderRadius: '4px' }}>{skill.trim()}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {mentors.length === 0 && <div style={{ color: '#A0A0B0', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>Mentor tapilmadi</div>}
            </div>
          )}

          {/* PAGES */}
          {!loading && tab === 'pages' && (
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {Object.keys(PAGES_FIELDS).map(page => (
                  <button key={page} onClick={() => setActivePage(page)} style={{
                    padding: '8px 20px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                    background: activePage === page ? '#FF2CA8' : 'rgba(255,255,255,0.06)',
                    color: activePage === page ? '#FFFFFF' : '#A0A0B0',
                    fontSize: '13px', fontWeight: activePage === page ? 600 : 400,
                  }}>
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                ))}
              </div>
              <div style={{ ...s.card, marginBottom: '20px', background: 'rgba(0,214,143,0.05)', border: '1px solid rgba(0,214,143,0.2)' }}>
                <p style={{ color: '#00D68F', fontSize: '13px', margin: 0 }}>
                  💡 <strong>{activePage}</strong> sehifesinin mezmununu redakte edirsiniz.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {(PAGES_FIELDS[activePage] || []).map((field, i) => (
                  <div key={i} style={s.card}>
                    <label style={s.label}>{field.label.toUpperCase()}</label>
                    <input
                      key={activePage + field.section + field.key + JSON.stringify(pagesContent[activePage])}
                      defaultValue={pagesContent[activePage]?.[field.section]?.[field.key] || ''}
                      onBlur={async (e) => {
                        await saveContent(activePage, field.section, field.key, e.target.value);
                      }}
                      style={{ ...s.input, marginBottom: 0 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
          <div style={{ background: '#13131A', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '560px', maxHeight: '80vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '20px', margin: 0 }}>
                {formData.id ? 'Redakte Et' : 'Yeni Elave Et'}
              </h2>
              <button onClick={() => { setModal(null); setFormData({}); }} style={{ background: 'none', border: 'none', color: '#A0A0B0', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>

            {modal === 'courses' && (
              <>
                {[
                  { key: 'title', placeholder: 'BIM & Tikinti Idareetmesi', label: 'KURS ADI' },
                  { key: 'category', placeholder: 'Tikinti', label: 'KATEQORİYA' },
                  { key: 'icon', placeholder: '🏗', label: 'İKON (emoji)' },
                  { key: 'color', placeholder: '#FF2CA8', label: 'RENG (hex)' },
                  { key: 'duration', placeholder: '4 hefte', label: 'MUDDET' },
                  { key: 'price', placeholder: '299 AZN', label: 'QİYMET' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={s.label}>{f.label}</label>
                    <input value={formData[f.key] || ''} onChange={e => setFormData(d => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder} style={s.input} />
                  </div>
                ))}
                <label style={s.label}>ACIQLAMASI</label>
                <textarea value={formData.description || ''} onChange={e => setFormData(d => ({ ...d, description: e.target.value }))} placeholder="Kurs haqqında qısa məlumat..." rows={3} style={s.input} />
                <label style={s.label}>AKTIV STATUS</label>
                <select value={formData.is_active === false ? 'false' : 'true'} onChange={e => setFormData(d => ({ ...d, is_active: e.target.value === 'true' }))} style={s.input}>
                  <option value="true">Aktiv ✓</option>
                  <option value="false">Deaktiv ✗</option>
                </select>
              </>
            )}

            {modal === 'mentors' && (
              <>
                {[
                  { key: 'name', placeholder: 'Ad Soyad', label: 'AD SOYAD' },
                  { key: 'title', placeholder: 'Senior BIM Manager', label: 'VEZİFE' },
                  { key: 'company', placeholder: 'Sirket adi', label: 'SİRKET' },
                  { key: 'experience', placeholder: '8 il tecrube', label: 'TECRUBE' },
                  { key: 'initials', placeholder: 'EM', label: 'BAŞ HERFLER (2)' },
                  { key: 'color', placeholder: '#FF2CA8', label: 'RENG (hex)' },
                  { key: 'students', placeholder: '120+', label: 'TELEBE SAYI' },
                  { key: 'rating', placeholder: '4.9', label: 'REYTİNQ' },
                  { key: 'skills', placeholder: 'Revit, AutoCAD, BIM 360', label: 'BACARIQLAR (vergüllü)' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={s.label}>{f.label}</label>
                    <input value={formData[f.key] || ''} onChange={e => setFormData(d => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder} style={s.input} />
                  </div>
                ))}
                <label style={s.label}>BİO</label>
                <textarea value={formData.bio || ''} onChange={e => setFormData(d => ({ ...d, bio: e.target.value }))} placeholder="Mentor haqqında məlumat..." rows={3} style={s.input} />
              </>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button onClick={() => { setModal(null); setFormData({}); }} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#A0A0B0', fontSize: '14px', cursor: 'pointer' }}>
                Ləğv Et
              </button>
              <button onClick={handleSave} style={{ flex: 1, ...s.btn, padding: '12px', fontSize: '14px', borderRadius: '10px' }}>
                Saxla →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
