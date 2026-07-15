'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TABS = [
  { id: 'applications', label: 'Muracietler', icon: '📋' },
  { id: 'home', label: 'Ana Sehife', icon: '🏠' },
  { id: 'banners', label: 'Bannerler', icon: '🖼' },
  { id: 'courses', label: 'Kurslar', icon: '📚' },
  { id: 'mentors', label: 'Müəllimlər', icon: '👨‍🏫' },
  { id: 'students', label: 'Telebeler', icon: '🎓' },
  { id: 'pages', label: 'Sehifeler', icon: '📄' },
];

const STATUS_COLORS = {
  new: '#FF2CA8',
  contacted: '#FFB800',
  enrolled: '#00D68F',
  cancelled: '#A0A0B0',
};

const HOME_FIELDS = [
  { section: 'hero_visual', key: 'folder_badge', label: 'Sol Banner - Badge Metni (meselen Azerbaycanin #1 Praktiki Akademiyasi)' },
  { section: 'hero_visual', key: 'folder_title1', label: 'Sol Banner - Bashliq 1 (meselen GELECEYIN)' },
  { section: 'hero_visual', key: 'folder_title2', label: 'Sol Banner - Bashliq 2 (meselen PESESINI)' },
  { section: 'hero_visual', key: 'folder_title3', label: 'Sol Banner - Bashliq 3 (meselen OYREN)' },
  { section: 'hero_visual', key: 'folder_stat_value', label: 'Sol Banner - Stat Deyer (meselen 500+)' },
  { section: 'hero_visual', key: 'folder_stat_label', label: 'Sol Banner - Stat Ad (meselen MEZUN)' },
  { section: 'hero_visual', key: 'folder_btn', label: 'Sol Banner - Button Metni (meselen BASLA)' },
];

const PAGES_FIELDS = {
  kurslar: [
    { section: 'hero', key: 'title', label: 'Bashliq' },
    { section: 'hero', key: 'subtitle', label: 'Alt Bashliq' },
    { section: 'hero', key: 'categories', label: 'Kateqoriyalar (vergulle ayirin: Hamisi,Tikinti,Digital Marketing)' },
    { section: 'stats', key: 'stat1_value', label: 'Stat 1 Deyer (meselen 6+)' },
    { section: 'stats', key: 'stat1_label', label: 'Stat 1 Ad (meselen Aktiv kurs)' },
    { section: 'stats', key: 'stat2_value', label: 'Stat 2 Deyer (meselen 500+)' },
    { section: 'stats', key: 'stat2_label', label: 'Stat 2 Ad (meselen Mezun)' },
    { section: 'stats', key: 'stat3_value', label: 'Stat 3 Deyer (meselen 90%)' },
    { section: 'stats', key: 'stat3_label', label: 'Stat 3 Ad (meselen Ise duzeldi)' },
    { section: 'stats', key: 'stat4_value', label: 'Stat 4 Deyer (meselen 4.9)' },
    { section: 'stats', key: 'stat4_label', label: 'Stat 4 Ad (meselen Ortalama reytinq)' },
  ],
  neticeler: [
    { section: 'hero', key: 'title1', label: 'Bashliq 1 (ag)' },
    { section: 'hero', key: 'title2', label: 'Bashliq 2 (çəhrayi)' },
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
  korporativ: [
    { section: 'hero', key: 'title', label: 'Bashliq (meselen Guclendirin)' },
    { section: 'hero', key: 'subtitle', label: 'Alt Bashliq' },
    { section: 'stats', key: 'stat1_value', label: 'Stat 1 Deyer (meselen 50+)' },
    { section: 'stats', key: 'stat1_label', label: 'Stat 1 Ad (meselen Korporativ Musteri)' },
    { section: 'stats', key: 'stat2_value', label: 'Stat 2 Deyer (meselen 500+)' },
    { section: 'stats', key: 'stat2_label', label: 'Stat 2 Ad (meselen Hazirlanmis Kadr)' },
    { section: 'stats', key: 'stat3_value', label: 'Stat 3 Deyer (meselen 10+)' },
    { section: 'stats', key: 'stat3_label', label: 'Stat 3 Ad (meselen Sektor)' },
    { section: 'stats', key: 'stat4_value', label: 'Stat 4 Deyer (meselen 4.9)' },
    { section: 'stats', key: 'stat4_label', label: 'Stat 4 Ad (meselen Musteri Reytinqi)' },
    { section: 'content', key: 'benefits', label: 'Ustunlukler (her setir: Bashliq | Aciqlama)', textarea: true, rows: 8 },
    { section: 'content', key: 'packages', label: 'Paketler (her setir: Ad | xususiyyet1, xususiyyet2, xususiyyet3)', textarea: true, rows: 5 },
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
  const [banners, setBanners] = useState([]);
  const [bannerLink, setBannerLink] = useState('/kurslar');
  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerTitle, setBannerTitle] = useState('');
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [homeContent, setHomeContent] = useState({});
  const [pagesContent, setPagesContent] = useState({});
  const [activePage, setActivePage] = useState('kurslar');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin/login'); return; }
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
        if (data.content) setHomeContent(data.content);
      } else if (tab === 'banners') {
        const res = await fetch('/api/admin/banners');
        const data = await res.json();
        setBanners(data.banners || []);
      } else if (tab === 'courses') {
        const res = await fetch('/api/admin/courses');
        const data = await res.json();
        setCourses(data.courses || []);
      } else if (tab === 'mentors') {
        const res = await fetch('/api/admin/mentors');
        const data = await res.json();
        setMentors(data.mentors || []);
      } else if (tab === 'students') {
        const res = await fetch('/api/admin/students');
        const data = await res.json();
        setStudents(data.students || []);
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

  const handleDelete = async (type, id) => {
    if (!confirm('Silmek istediginize eminsiniz?')) return;
    const endpoints = {
      applications: '/api/admin/applications',
      courses: '/api/admin/courses',
      mentors: '/api/admin/mentors',
      banners: '/api/admin/banners',
      students: '/api/admin/students',
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
    const endpoints = { courses: '/api/admin/courses', mentors: '/api/admin/mentors', students: '/api/admin/students' };
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
    router.push('/admin/login');
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

      {/* Main Content */}
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
              {(tab === 'courses' || tab === 'mentors' || tab === 'students') && (
                <button onClick={() => { setFormData({}); setModal(tab); }} style={s.btn}>+ Yeni Elave Et</button>
              )}
            </div>
          </div>

          {loading && <div style={{ color: '#A0A0B0', textAlign: 'center', padding: '60px' }}>Yuklenir...</div>}

          {/* === APPLICATIONS === */}
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

          {/* === HOME PAGE === */}
          {!loading && tab === 'home' && (
            <div>
              <div style={{ ...s.card, marginBottom: '20px', background: 'rgba(0,214,143,0.05)', border: '1px solid rgba(0,214,143,0.2)' }}>
                <p style={{ color: '#00D68F', fontSize: '13px', margin: 0 }}>
                  💡 Saheden chixdiqda (blur) avtomatik saxlanilir. Saytda gorenmek ucun sehifeni yenilayin.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {[
                  { label: 'Sol Banner (folder şəkli)', key: 'left_image' },
                  { label: 'Sağ Banner (preview şəkli)', key: 'right_image' },
                ].map(({ label, key }) => (
                  <div key={key} style={s.card}>
                    <label style={s.label}>{label.toUpperCase()}</label>
                    {homeContent?.hero_visual?.[key] && (
                      <img src={homeContent.hero_visual[key]} alt={label} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
                    )}
                    <label style={{ display: 'block', cursor: 'pointer', background: '#FF2CA8', color: '#FFFFFF', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, textAlign: 'center' }}>
                      📷 Şəkil yüklə
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const fd = new FormData();
                        fd.append('file', file);
                        fd.append('type', 'hero_' + key);
                        fd.append('id', key);
                        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
                        const data = await res.json();
                        if (data.success) {
                          await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page: 'home', section: 'hero_visual', key, value: data.path }) });
                          fetchData();
                          setSaveMsg('Saxlanildi ✓');
                          setTimeout(() => setSaveMsg(''), 2000);
                        }
                      }} />
                    </label>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {HOME_FIELDS.map((field, i) => (
                  <div key={i} style={s.card}>
                    <label style={s.label}>{field.label.toUpperCase()}</label>
                    <input
                      key={homeContent[field.section]?.[field.key]}
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

          {/* === BANNERS === */}
          {!loading && tab === 'banners' && (
            <div>
              <div style={{ ...s.card, marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={s.label}>LINK (meselen /kurslar/3)</label>
                  <input value={bannerLink} onChange={e => setBannerLink(e.target.value)} placeholder="/kurslar/3" style={{ ...s.input, marginBottom: 0 }} />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={s.label}>BASHLIQ (opsional)</label>
                  <input value={bannerTitle} onChange={e => setBannerTitle(e.target.value)} placeholder="Tikinti kursu" style={{ ...s.input, marginBottom: 0 }} />
                </div>
                <label style={{ ...s.btn, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  + Yeni Banner Yukle
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const fd = new FormData();
                    fd.append('file', file);
                    fd.append('type', 'banner');
                    fd.append('link', bannerLink);
                    fd.append('title', bannerTitle);
                    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
                    const data = await res.json();
                    if (data.success) { setBannerLink('/kurslar'); setBannerTitle(''); fetchData(); }
                  }} />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {banners.map(banner => (
                  <div key={banner.id} style={s.card}>
                    <div style={{ borderRadius: '8px', overflow: 'hidden', height: '160px', marginBottom: '10px', background: 'rgba(255,255,255,0.04)', position: 'relative' }}>
                      <img src={banner.image} alt={banner.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <label style={{ position: 'absolute', bottom: '6px', right: '6px', background: 'rgba(0,0,0,0.7)', color: '#FFFFFF', fontSize: '11px', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer' }}>
                        📷 Sekli deyis
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          const fd = new FormData();
                          fd.append('file', file);
                          fd.append('type', 'banner');
                          fd.append('id', banner.id);
                          const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
                          const data = await res.json();
                          if (data.success) fetchData();
                        }} />
                      </label>
                    </div>

                    {editingBanner === banner.id ? (
                      <div style={{ marginBottom: '10px' }}>
                        <label style={s.label}>LINK</label>
                        <input defaultValue={banner.link} id={`link-${banner.id}`} style={{ ...s.input, marginBottom: '8px' }} />
                        <label style={s.label}>BASHLIQ</label>
                        <input defaultValue={banner.title} id={`title-${banner.id}`} style={{ ...s.input, marginBottom: '8px' }} />
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={async () => {
                            const link = document.getElementById(`link-${banner.id}`).value;
                            const title = document.getElementById(`title-${banner.id}`).value;
                            await fetch('/api/admin/banners', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: banner.id, link, title }) });
                            setEditingBanner(null);
                            fetchData();
                          }} style={{ ...s.btn, flex: 1 }}>Yadda saxla</button>
                          <button onClick={() => setEditingBanner(null)} style={{ ...s.btn, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#A0A0B0', flex: 1 }}>Legv et</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p style={{ color: '#FFFFFF', fontSize: '13px', margin: '0 0 4px 0' }}>{banner.title || '(basliqsiz)'}</p>
                        <p style={{ color: '#A0A0B0', fontSize: '12px', margin: '0 0 12px 0' }}>{banner.link} · Sira: {banner.sort_order}</p>
                      </>
                    )}

                    <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                      <button onClick={async () => {
                        await fetch('/api/admin/banners', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: banner.id, sort_order: (banner.sort_order || 0) - 1 }) });
                        fetchData();
                      }} style={{ ...s.btn, background: 'rgba(255,255,255,0.06)', color: '#FFFFFF', border: 'none', flex: 1 }}>↑ Yuxari</button>
                      <button onClick={async () => {
                        await fetch('/api/admin/banners', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: banner.id, sort_order: (banner.sort_order || 0) + 1 }) });
                        fetchData();
                      }} style={{ ...s.btn, background: 'rgba(255,255,255,0.06)', color: '#FFFFFF', border: 'none', flex: 1 }}>↓ Asagi</button>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                      <button onClick={() => setEditingBanner(banner.id)} style={{ ...s.btn, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', flex: 1 }}>Deyis</button>
                      <button onClick={() => handleDelete('banners', banner.id)} style={{ ...s.btn, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', flex: 1 }}>Sil</button>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={async () => {
                        await fetch('/api/admin/banners', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: banner.id, is_active: !banner.is_active }) });
                        fetchData();
                      }} style={{ ...s.btn, background: banner.is_active ? 'rgba(0,214,143,0.15)' : 'rgba(160,160,176,0.15)', color: banner.is_active ? '#00D68F' : '#A0A0B0', border: 'none', flex: 1 }}>
                        {banner.is_active ? '✓ Aktiv' : '✗ Deaktiv'}
                      </button>
                    </div>
                  </div>
                ))}
                {banners.length === 0 && <div style={{ color: '#A0A0B0', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>Banner yoxdur</div>}
              </div>
            </div>
          )}

          {/* === COURSES === */}
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
                  <div style={{ marginBottom: '12px', borderRadius: '8px', overflow: 'hidden', height: '120px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    {course.image
                      ? <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span style={{ color: '#A0A0B0', fontSize: '12px' }}>Şəkil yoxdur</span>
                    }
                    <label style={{ position: 'absolute', bottom: '6px', right: '6px', background: 'rgba(0,0,0,0.7)', color: '#FFFFFF', fontSize: '11px', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer' }}>
                      📷 Yüklə
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const fd = new FormData();
                        fd.append('file', file);
                        fd.append('type', 'course');
                        fd.append('id', course.id);
                        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
                        const data = await res.json();
                        if (data.success) fetchData();
                      }} />
                    </label>
                  </div>
                  <h3 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '15px', margin: '0 0 8px 0' }}>{course.title}</h3>
                  <p style={{ color: '#A0A0B0', fontSize: '12px', margin: '0 0 16px 0', lineHeight: 1.5 }}>{course.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', marginBottom: '10px' }}>
                    <div>
                      <span style={{ color: '#FF2CA8', fontWeight: 700, fontSize: '14px' }}>{course.price}</span>
                      <span style={{ color: '#A0A0B0', fontSize: '12px', marginLeft: '8px' }}>⏱ {course.duration}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => { setFormData(course); setModal('courses'); }} style={{ ...s.btn, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', padding: '6px 12px' }}>Dəyiş</button>
                      <button onClick={() => handleDelete('courses', course.id)} style={{ ...s.btn, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', padding: '6px 12px' }}>Sil</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={async () => {
                      await fetch('/api/admin/courses/reorder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: course.id, sort_order: (course.sort_order || 0) - 1 }) });
                      fetchData();
                    }} style={{ ...s.btn, background: 'rgba(255,255,255,0.06)', color: '#FFFFFF', border: 'none', flex: 1 }}>↑ Yuxarı</button>
                    <button onClick={async () => {
                      await fetch('/api/admin/courses/reorder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: course.id, sort_order: (course.sort_order || 0) + 1 }) });
                      fetchData();
                    }} style={{ ...s.btn, background: 'rgba(255,255,255,0.06)', color: '#FFFFFF', border: 'none', flex: 1 }}>↓ Aşağı</button>
                  </div>
                </div>
              ))}
              {courses.length === 0 && <div style={{ color: '#A0A0B0', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>Kurs tapilmadi</div>}
            </div>
          )}

          {/* === MENTORS === */}
          {!loading && tab === 'mentors' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {mentors.map(mentor => (
                <div key={mentor.id} style={{ ...s.card, display: 'flex', gap: '16px' }}>
                  <div style={{ position: 'relative', width: '60px', height: '60px', flexShrink: 0 }}>
                    {mentor.image ? (
                      <img src={mentor.image} alt={mentor.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '60px', height: '60px', background: mentor.color || '#FF2CA8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '18px' }}>
                        {mentor.initials}
                      </div>
                    )}
                    <label style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '22px', height: '22px', borderRadius: '50%', background: '#FF2CA8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid #0B0B0F', fontSize: '11px' }}>
                      📷
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const fd = new FormData();
                        fd.append('file', file);
                        fd.append('type', 'mentor');
                        fd.append('id', mentor.id);
                        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
                        const data = await res.json();
                        if (data.success) fetchData();
                      }} />
                    </label>
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

          {/* === STUDENTS === */}
          {!loading && tab === 'students' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {students.map(student => (
                <div key={student.id} style={s.card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '44px', height: '44px', background: student.color || '#FF2CA8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>
                        {student.initials}
                      </div>
                      <div>
                        <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '15px' }}>{student.name}</div>
                        <div style={{ color: '#FF2CA8', fontSize: '11px', marginTop: '2px' }}>{student.course}</div>
                      </div>
                    </div>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: student.is_active !== false ? '#00D68F' : '#A0A0B0', display: 'inline-block', marginTop: '6px' }} />
                  </div>
                  <p style={{ color: '#A0A0B0', fontSize: '12px', fontStyle: 'italic', margin: '0 0 12px 0', lineHeight: 1.5 }}>"{student.quote}"</p>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ flex: 1, background: 'rgba(255,255,255,0.04)', fontSize: '11px', color: '#A0A0B0', padding: '6px 10px', borderRadius: '6px' }}>Əvvəl: {student.before_text}</span>
                    <span style={{ flex: 1, background: 'rgba(0,214,143,0.06)', fontSize: '11px', color: '#00D68F', padding: '6px 10px', borderRadius: '6px' }}>İndi: {student.after_text}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                    <div>
                      <span style={{ color: '#A0A0B0', fontSize: '11px' }}>{student.company}</span>
                      <span style={{ color: '#00D68F', fontSize: '11px', fontWeight: 700, marginLeft: '8px' }}>{student.salary}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => { setFormData(student); setModal('students'); }} style={{ ...s.btn, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', padding: '6px 10px', fontSize: '12px' }}>Dəyiş</button>
                      <button onClick={() => handleDelete('students', student.id)} style={{ ...s.btn, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', padding: '6px 10px', fontSize: '12px' }}>Sil</button>
                    </div>
                  </div>
                </div>
              ))}
              {students.length === 0 && <div style={{ color: '#A0A0B0', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>Tələbə tapılmadı</div>}
            </div>
          )}

          {/* === PAGES === */}
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
                  💡 <strong>{activePage}</strong> sehifesinin mezmununu redakte edirsiniz. Saheden chixdiqda avtomatik saxlanilir.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {(PAGES_FIELDS[activePage] || []).map((field, i) => (
                  <div key={i} style={s.card}>
                    <label style={s.label}>{field.label.toUpperCase()}</label>
                    {field.textarea ? (
                      <textarea
                        key={activePage + field.section + field.key + JSON.stringify(pagesContent[activePage])}
                        defaultValue={pagesContent[activePage]?.[field.section]?.[field.key] || ''}
                        onBlur={async (e) => {
                          await saveContent(activePage, field.section, field.key, e.target.value);
                        }}
                        rows={field.rows || 6}
                        style={{ ...s.input, marginBottom: 0, fontFamily: 'monospace', fontSize: '12px' }}
                      />
                    ) : (
                      <input
                        key={activePage + field.section + field.key + JSON.stringify(pagesContent[activePage])}
                        defaultValue={pagesContent[activePage]?.[field.section]?.[field.key] || ''}
                        onBlur={async (e) => {
                          await saveContent(activePage, field.section, field.key, e.target.value);
                        }}
                        style={{ ...s.input, marginBottom: 0 }}
                      />
                    )}
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
                <textarea value={formData.description || ''} onChange={e => setFormData(d => ({ ...d, description: e.target.value }))} placeholder="Kurs haqqında qısa məlumat..." rows={3} style={{ ...s.input }} />

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '20px 0 16px 0', paddingTop: '16px' }}>
                  <div style={{ color: '#FF2CA8', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>KURS DETAL SƏHİFƏSİ</div>
                </div>

                <label style={s.label}>ALT BAŞLIQ (kurs detal səhifəsində)</label>
                <input value={formData.subtitle || ''} onChange={e => setFormData(d => ({ ...d, subtitle: e.target.value }))} placeholder="AutoCAD, Revit, BIM 360 ilə praktiki tədris" style={s.input} />

                <label style={s.label}>KURS HAQQINDA (uzun mətn)</label>
                <textarea value={formData.about || ''} onChange={e => setFormData(d => ({ ...d, about: e.target.value }))} placeholder="Bu kurs haqqında ətraflı izah..." rows={3} style={s.input} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={s.label}>TƏLƏBƏ SAYI</label>
                    <input value={formData.students || ''} onChange={e => setFormData(d => ({ ...d, students: e.target.value }))} placeholder="120+" style={s.input} />
                  </div>
                  <div>
                    <label style={s.label}>REYTİNQ</label>
                    <input value={formData.rating || ''} onChange={e => setFormData(d => ({ ...d, rating: e.target.value }))} placeholder="4.9" style={s.input} />
                  </div>
                </div>

                <label style={s.label}>BACARIQLAR (vergüllə ayırın)</label>
                <input value={formData.skills || ''} onChange={e => setFormData(d => ({ ...d, skills: e.target.value }))} placeholder="AutoCAD, Revit, BIM 360, Navisworks" style={s.input} />

                <div style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 700, marginBottom: '8px', marginTop: '12px' }}>MENTOR MƏLUMATI</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={s.label}>MENTOR ADI</label>
                    <input value={formData.mentor_name || ''} onChange={e => setFormData(d => ({ ...d, mentor_name: e.target.value }))} placeholder="Elvin Məmmədov" style={s.input} />
                  </div>
                  <div>
                    <label style={s.label}>BAŞ HƏRFLƏR</label>
                    <input value={formData.mentor_initials || ''} onChange={e => setFormData(d => ({ ...d, mentor_initials: e.target.value }))} placeholder="EM" style={s.input} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={s.label}>MENTOR VƏZİFƏSİ</label>
                    <input value={formData.mentor_title || ''} onChange={e => setFormData(d => ({ ...d, mentor_title: e.target.value }))} placeholder="Senior BIM Manager" style={s.input} />
                  </div>
                  <div>
                    <label style={s.label}>TƏCRÜBƏ</label>
                    <input value={formData.mentor_exp || ''} onChange={e => setFormData(d => ({ ...d, mentor_exp: e.target.value }))} placeholder="8 il təcrübə" style={s.input} />
                  </div>
                </div>

                <label style={s.label}>CURRICULUM (hər həftə YENİ SƏTIRDƏ, format: Həftə Adı | Mövzu1, Mövzu2, Mövzu3)</label>
                <textarea
                  value={(formData.curriculum || []).map(w => `${w.week} - ${w.title} | ${(w.topics || []).join(', ')}`).join('\n')}
                  onChange={e => {
                    const lines = e.target.value.split('\n').filter(Boolean);
                    const parsed = lines.map((line, i) => {
                      const [left, topicsStr] = line.split('|');
                      const [week, ...titleParts] = (left || '').split(' - ');
                      return {
                        week: (week || `Hefte ${i + 1}`).trim(),
                        title: titleParts.join(' - ').trim(),
                        topics: (topicsStr || '').split(',').map(t => t.trim()).filter(Boolean),
                      };
                    });
                    setFormData(d => ({ ...d, curriculum: parsed }));
                  }}
                  placeholder={"Hefte 1 - AutoCAD Esaslari | 2D cizim, Bloklar, Annotation\nHefte 2 - Revit Architecture | BIM konsepti, Walls, Sheet"}
                  rows={5}
                  style={{ ...s.input, fontFamily: 'monospace', fontSize: '12px' }}
                />

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

            {modal === 'students' && (
              <>
                {[
                  { key: 'name', placeholder: 'Aygün M.', label: 'AD SOYAD' },
                  { key: 'initials', placeholder: 'AM', label: 'BAŞ HƏRFLƏR (2)' },
                  { key: 'color', placeholder: '#FF2CA8', label: 'RƏNG (hex)' },
                  { key: 'course', placeholder: 'Digital Marketing', label: 'KURS' },
                  { key: 'rating', placeholder: '5', label: 'REYTİNQ (1-5)' },
                  { key: 'before_text', placeholder: 'SMM bilgisi yox idi', label: 'ƏVVƏL' },
                  { key: 'after_text', placeholder: 'Freelance müştəri tapdı', label: 'İNDİ' },
                  { key: 'company', placeholder: 'Freelance', label: 'ŞİRKƏT' },
                  { key: 'salary', placeholder: '+800 AZN/ay', label: 'MAAŞ ARTIMI' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={s.label}>{f.label}</label>
                    <input value={formData[f.key] || ''} onChange={e => setFormData(d => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder} style={s.input} />
                  </div>
                ))}
                <label style={s.label}>SİTAT (uğur hekayəsi)</label>
                <textarea value={formData.quote || ''} onChange={e => setFormData(d => ({ ...d, quote: e.target.value }))} placeholder="4 həftədə SMM mütəxəssisi oldum..." rows={3} style={s.input} />
                <label style={s.label}>AKTIV STATUS</label>
                <select value={formData.is_active === false ? 'false' : 'true'} onChange={e => setFormData(d => ({ ...d, is_active: e.target.value === 'true' }))} style={s.input}>
                  <option value="true">Aktiv ✓</option>
                  <option value="false">Deaktiv ✗</option>
                </select>
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
