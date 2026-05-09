'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TABS = [
  { id: 'applications', label: 'Muracietler', icon: '📋' },
  { id: 'home', label: 'Ana Sehife', icon: '🏠' },
  { id: 'courses', label: 'Kurslar', icon: '📚' },
  { id: 'mentors', label: 'Mentorlar', icon: '👨‍🏫' },
  { id: 'content', label: 'Mezmun', icon: '✏️' },
];

const STATUS_COLORS = {
  new: '#FF2CA8',
  contacted: '#FFB800',
  enrolled: '#00D68F',
  cancelled: '#A0A0B0',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [homeContent, setHomeContent] = useState({});
  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

  useEffect(() => {
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
        if (data.content) setHomeContent(data.content);
      } else if (tab === 'courses') {
        const res = await fetch('/api/admin/courses');
        const data = await res.json();
        setCourses(data.courses || []);
      } else if (tab === 'mentors') {
        const res = await fetch('/api/admin/mentors');
        const data = await res.json();
        setMentors(data.mentors || []);
      } else if (tab === 'content') {
        const res = await fetch('/api/admin/content');
        const data = await res.json();
        setContent(data.content || []);
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Silmek istediginize eminsiniz?')) return;
    const endpoints = { applications: '/api/admin/applications', courses: '/api/admin/courses', mentors: '/api/admin/mentors', content: '/api/admin/content' };
    await fetch(endpoints[type], { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    fetchData();
  };

  const handleStatusChange = async (id, status) => {
    await fetch('/api/admin/applications', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status, notes: '' }) });
    fetchData();
  };

  const handleSave = async () => {
    const endpoints = { courses: '/api/admin/courses', mentors: '/api/admin/mentors', content: '/api/admin/content' };
    const method = formData.id ? 'PATCH' : 'POST';
    await fetch(endpoints[tab], { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    setModal(null);
    setFormData({});
    fetchData();
  };

  const logout = () => { localStorage.removeItem('admin_token'); router.push('/admin'); };

  const filteredApps = applications.filter(a => {
    const matchSearch = !search || a.full_name?.toLowerCase().includes(search.toLowerCase()) || a.phone?.includes(search) || a.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const sidebarStyle = { width: '240px', background: '#13131A', borderRight: '1px solid rgba(255,255,255,0.06)', minHeight: '100vh', flexShrink: 0, display: 'flex', flexDirection: 'column' };
  const mainStyle = { flex: 1, background: '#0B0B0F', minHeight: '100vh', overflow: 'auto' };
  const cardStyle = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' };
  const btnStyle = { background: '#FF2CA8', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' };
  const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 14px', color: '#FFFFFF', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box', marginBottom: '12px' };

  return (
    <div style={{ display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <img src="/logo.png" alt="Changers" style={{ height: '36px', width: 'auto', marginBottom: '8px' }} />
          <div style={{ color: '#A0A0B0', fontSize: '12px' }}>Admin Panel</div>
        </div>
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: tab === t.id ? 'rgba(255,44,168,0.12)' : 'transparent', color: tab === t.id ? '#FF2CA8' : '#A0A0B0', fontSize: '14px', fontWeight: tab === t.id ? 600 : 400, cursor: 'pointer', marginBottom: '4px', textAlign: 'left' }}>
              <span>{t.icon}</span> {t.label}
              {t.id === 'applications' && applications.filter(a => a.status === 'new').length > 0 && (
                <span style={{ marginLeft: 'auto', background: '#FF2CA8', color: '#FFFFFF', borderRadius: '100px', padding: '2px 8px', fontSize: '11px', fontWeight: 700 }}>{applications.filter(a => a.status === 'new').length}</span>
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
      <div style={mainStyle}>
        <div style={{ padding: '32px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '24px', margin: '0 0 4px 0' }}>
                {TABS.find(t => t.id === tab)?.icon} {TABS.find(t => t.id === tab)?.label}
              </h1>
              <p style={{ color: '#A0A0B0', fontSize: '13px', margin: 0 }}>Changers Academy idareetme paneli</p>
            </div>
            {(tab === 'courses' || tab === 'mentors' || tab === 'content') && (
              <button onClick={() => { setFormData({}); setModal(tab); }} style={btnStyle}>+ Yeni Elave Et</button>
            )}
          </div>

          {loading && <div style={{ color: '#A0A0B0', textAlign: 'center', padding: '40px' }}>Yuklenir...</div>}

          {/* Applications */}
          {!loading && tab === 'applications' && (
            <div>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Umumi', value: applications.length, color: '#FF2CA8' },
                  { label: 'Yeni', value: applications.filter(a => a.status === 'new').length, color: '#FF2CA8' },
                  { label: 'Elaqe Saxlanildi', value: applications.filter(a => a.status === 'contacted').length, color: '#FFB800' },
                  { label: 'Qeydiyyat Oldu', value: applications.filter(a => a.status === 'enrolled').length, color: '#00D68F' },
                ].map((s, i) => (
                  <div key={i} style={{ ...cardStyle, textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '28px', color: s.color }}>{s.value}</div>
                    <div style={{ color: '#A0A0B0', fontSize: '12px', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Ad, telefon ve ya email axtar..." style={{ ...inputStyle, marginBottom: 0, maxWidth: '300px' }} />
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ ...inputStyle, marginBottom: 0, width: 'auto' }}>
                  <option value="all">Hamisi</option>
                  <option value="new">Yeni</option>
                  <option value="contacted">Elaqe Saxlanildi</option>
                  <option value="enrolled">Qeydiyyat Oldu</option>
                  <option value="cancelled">Ləğv Edildi</option>
                </select>
              </div>

              {/* Table */}
              <div style={cardStyle}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      {['Ad Soyad', 'Telefon', 'Email', 'Qeyd', 'Status', 'Tarix', 'Emeliyyat'].map(h => (
                        <th key={h} style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, padding: '12px 16px', textAlign: 'left', letterSpacing: '1px' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApps.map(app => (
                      <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '14px 16px', color: '#FFFFFF', fontSize: '14px', fontWeight: 500 }}>{app.full_name}</td>
                        <td style={{ padding: '14px 16px', color: '#A0A0B0', fontSize: '13px' }}>
                          <a href={'tel:' + app.phone} style={{ color: '#FF2CA8', textDecoration: 'none' }}>{app.phone}</a>
                        </td>
                        <td style={{ padding: '14px 16px', color: '#A0A0B0', fontSize: '13px' }}>{app.email || '—'}</td>
                        <td style={{ padding: '14px 16px', color: '#A0A0B0', fontSize: '12px', maxWidth: '160px' }}>{app.notes || '—'}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <select value={app.status} onChange={e => handleStatusChange(app.id, e.target.value)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '4px 8px', color: STATUS_COLORS[app.status] || '#FFFFFF', fontSize: '12px', cursor: 'pointer' }}>
                            <option value="new">Yeni</option>
                            <option value="contacted">Elaqe Saxlanildi</option>
                            <option value="enrolled">Qeydiyyat Oldu</option>
                            <option value="cancelled">Legv Edildi</option>
                          </select>
                        </td>
                        <td style={{ padding: '14px 16px', color: '#A0A0B0', fontSize: '12px' }}>{new Date(app.created_at).toLocaleDateString('az-AZ')}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <button onClick={() => handleDelete('applications', app.id)} style={{ background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '6px', padding: '6px 12px', color: '#FF2CA8', fontSize: '12px', cursor: 'pointer' }}>Sil</button>
                        </td>
                      </tr>
                    ))}
                    {filteredApps.length === 0 && (
                      <tr><td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#A0A0B0' }}>Muraciet tapılmadı</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Home */}
          {!loading && tab === 'home' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {[
                { section: 'hero', key: 'badge', label: 'Badge Metni' },
                { section: 'hero', key: 'title1', label: 'Bashliq 1' },
                { section: 'hero', key: 'title2', label: 'Bashliq 2 (pink)' },
                { section: 'hero', key: 'title3', label: 'Bashliq 3' },
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
              ].map((field, i) => (
                <div key={i} style={cardStyle}>
                  <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '1px' }}>{field.label.toUpperCase()}</label>
                  <input
                    defaultValue={homeContent[field.section]?.[field.key] || ''}
                    onBlur={async (e) => {
                      await fetch('/api/admin/content', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ page: 'home', section: field.section, key: field.key, value: e.target.value }),
                      });
                    }}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 14px', color: '#FFFFFF', fontSize: '13px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              <div style={{ gridColumn: '1/-1', padding: '12px 16px', background: 'rgba(0,214,143,0.08)', border: '1px solid rgba(0,214,143,0.2)', borderRadius: '8px', color: '#00D68F', fontSize: '12px' }}>
                ✓ Saheden chixdiqda avtomatik saxlanilir. Saytda gorenmek ucun sehifeni yenileyin.
              </div>
            </div>
          )}

          {/* Courses */}
          {!loading && tab === 'courses' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {courses.map(course => (
                <div key={course.id} style={{ ...cardStyle, position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ background: course.color || '#FF2CA8', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px' }}>{course.icon} {course.category}</span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: course.is_active ? '#00D68F' : '#A0A0B0', display: 'inline-block', marginTop: '4px' }} />
                  </div>
                  <h3 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '15px', margin: '0 0 8px 0' }}>{course.title}</h3>
                  <p style={{ color: '#A0A0B0', fontSize: '12px', margin: '0 0 16px 0', lineHeight: 1.5 }}>{course.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                    <span style={{ color: '#FF2CA8', fontWeight: 700, fontSize: '14px' }}>{course.price}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => { setFormData(course); setModal('courses'); }} style={{ ...btnStyle, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)' }}>Dəyiş</button>
                      <button onClick={() => handleDelete('courses', course.id)} style={{ ...btnStyle, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)' }}>Sil</button>
                    </div>
                  </div>
                </div>
              ))}
              {courses.length === 0 && <div style={{ color: '#A0A0B0', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>Kurs tapilmadi</div>}
            </div>
          )}

          {/* Mentors */}
          {!loading && tab === 'mentors' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {mentors.map(mentor => (
                <div key={mentor.id} style={{ ...cardStyle, display: 'flex', gap: '16px' }}>
                  <div style={{ width: '56px', height: '56px', background: mentor.color || '#FF2CA8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '18px', flexShrink: 0 }}>{mentor.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '16px' }}>{mentor.name}</div>
                        <div style={{ color: '#FF2CA8', fontSize: '12px', marginTop: '2px' }}>{mentor.title}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => { setFormData(mentor); setModal('mentors'); }} style={{ ...btnStyle, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', padding: '6px 12px' }}>Dəyiş</button>
                        <button onClick={() => handleDelete('mentors', mentor.id)} style={{ ...btnStyle, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', padding: '6px 12px' }}>Sil</button>
                      </div>
                    </div>
                    <p style={{ color: '#A0A0B0', fontSize: '12px', margin: '8px 0 0 0', lineHeight: 1.5 }}>{mentor.bio?.slice(0, 100)}...</p>
                  </div>
                </div>
              ))}
              {mentors.length === 0 && <div style={{ color: '#A0A0B0', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>Mentor tapilmadi</div>}
            </div>
          )}

          {/* Content */}
          {!loading && tab === 'content' && (
            <div>
              <div style={{ ...cardStyle, marginBottom: '16px' }}>
                <p style={{ color: '#A0A0B0', fontSize: '13px', margin: 0 }}>💡 Sayt metnlerini buradan redakte edebilersiniz. Sehife, bolme ve acar sozü daxil edin.</p>
              </div>
              <div style={cardStyle}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      {['Sehife', 'Bolme', 'Acar Soz', 'Deyeri', 'Emeliyyat'].map(h => (
                        <th key={h} style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, padding: '12px 16px', textAlign: 'left', letterSpacing: '1px' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content.map(item => (
                      <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '12px 16px', color: '#FF2CA8', fontSize: '13px' }}>{item.page}</td>
                        <td style={{ padding: '12px 16px', color: '#A0A0B0', fontSize: '13px' }}>{item.section}</td>
                        <td style={{ padding: '12px 16px', color: '#A0A0B0', fontSize: '13px' }}>{item.key}</td>
                        <td style={{ padding: '12px 16px', color: '#FFFFFF', fontSize: '13px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.value}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => { setFormData(item); setModal('content'); }} style={{ ...btnStyle, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', padding: '6px 12px', fontSize: '12px' }}>Dəyiş</button>
                            <button onClick={() => handleDelete('content', item.id)} style={{ ...btnStyle, background: 'rgba(255,44,168,0.1)', color: '#FF2CA8', border: '1px solid rgba(255,44,168,0.3)', padding: '6px 12px', fontSize: '12px' }}>Sil</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {content.length === 0 && (
                      <tr><td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#A0A0B0' }}>Mezmun tapilmadi. Yeni elave edin.</td></tr>
                    )}
                  </tbody>
                </table>
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
                  { key: 'title', placeholder: 'Kurs adi', label: 'AD' },
                  { key: 'category', placeholder: 'Kateqoriya', label: 'KATEQORİYA' },
                  { key: 'icon', placeholder: '🏗', label: 'İKON' },
                  { key: 'color', placeholder: '#FF2CA8', label: 'RENG' },
                  { key: 'duration', placeholder: '4 hefte', label: 'MUDDET' },
                  { key: 'price', placeholder: '299 AZN', label: 'QİYMET' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px', letterSpacing: '1px' }}>{f.label}</label>
                    <input value={formData[f.key] || ''} onChange={e => setFormData(d => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inputStyle} />
                  </div>
                ))}
                <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px', letterSpacing: '1px' }}>ACIQLAMASI</label>
                <textarea value={formData.description || ''} onChange={e => setFormData(d => ({ ...d, description: e.target.value }))} placeholder="Kurs haqda qisa melumat..." rows={3} style={{ ...inputStyle }} />
                <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px', letterSpacing: '1px' }}>AKTIV</label>
                <select value={formData.is_active === false ? 'false' : 'true'} onChange={e => setFormData(d => ({ ...d, is_active: e.target.value === 'true' }))} style={inputStyle}>
                  <option value="true">Aktiv</option>
                  <option value="false">Deaktiv</option>
                </select>
              </>
            )}

            {modal === 'mentors' && (
              <>
                {[
                  { key: 'name', placeholder: 'Ad Soyad', label: 'AD SOYAD' },
                  { key: 'title', placeholder: 'Senior BIM Manager', label: 'VEZIFE' },
                  { key: 'company', placeholder: 'Sirket adi', label: 'SİRKET' },
                  { key: 'experience', placeholder: '8 il tecrube', label: 'TECRUBE' },
                  { key: 'initials', placeholder: 'EM', label: 'BAŞ HERFL.' },
                  { key: 'color', placeholder: '#FF2CA8', label: 'RENG' },
                  { key: 'students', placeholder: '120+', label: 'TELEBE' },
                  { key: 'rating', placeholder: '4.9', label: 'REYTİNQ' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px', letterSpacing: '1px' }}>{f.label}</label>
                    <input value={formData[f.key] || ''} onChange={e => setFormData(d => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inputStyle} />
                  </div>
                ))}
                <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px', letterSpacing: '1px' }}>BİO</label>
                <textarea value={formData.bio || ''} onChange={e => setFormData(d => ({ ...d, bio: e.target.value }))} placeholder="Mentor haqda melumat..." rows={3} style={inputStyle} />
                <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px', letterSpacing: '1px' }}>BACARIQLAR (vergullu)</label>
                <input value={formData.skills || ''} onChange={e => setFormData(d => ({ ...d, skills: e.target.value }))} placeholder="Revit, AutoCAD, BIM 360" style={inputStyle} />
              </>
            )}

            {modal === 'content' && (
              <>
                {[
                  { key: 'page', placeholder: 'home, kurslar, neticeler...', label: 'SEHİFE' },
                  { key: 'section', placeholder: 'hero, footer, navbar...', label: 'BOLME' },
                  { key: 'key', placeholder: 'title, subtitle, button_text...', label: 'ACAR SOZ' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px', letterSpacing: '1px' }}>{f.label}</label>
                    <input value={formData[f.key] || ''} onChange={e => setFormData(d => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inputStyle} />
                  </div>
                ))}
                <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px', letterSpacing: '1px' }}>DEYERI</label>
                <textarea value={formData.value || ''} onChange={e => setFormData(d => ({ ...d, value: e.target.value }))} placeholder="Mezmun yazin..." rows={4} style={inputStyle} />
              </>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button onClick={() => { setModal(null); setFormData({}); }} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#A0A0B0', fontSize: '14px', cursor: 'pointer' }}>Ləğv Et</button>
              <button onClick={handleSave} style={{ flex: 1, ...btnStyle, padding: '12px', fontSize: '14px' }}>Saxla →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
