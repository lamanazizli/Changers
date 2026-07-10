'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('admin_token', data.token);
        router.push('/admin');
      } else {
        setError(data.error || 'Xeta bas verdi');
      }
    } catch {
      setError('Server ile elaqe yoxdur');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0B0B0F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: '#13131A', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img src="/logo.png" alt="Changers" style={{ height: '40px', marginBottom: '16px' }} />
          <h1 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700, margin: 0 }}>Admin Panel</h1>
          <p style={{ color: '#A0A0B0', fontSize: '13px', marginTop: '8px' }}>Daxil olmaq ucun melumatlarinizi daxil edin</p>
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px', letterSpacing: '1px' }}>EMAIL</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@changers.az"
              style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '12px 14px', color: '#FFFFFF', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} required />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: '#A0A0B0', fontSize: '11px', fontWeight: 600, display: 'block', marginBottom: '6px', letterSpacing: '1px' }}>SIFRE</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '12px 14px', color: '#FFFFFF', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} required />
          </div>
          {error && <div style={{ color: '#FF2CA8', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
          <button type="submit" disabled={loading}
            style={{ width: '100%', background: '#FF2CA8', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '14px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Yuklenir...' : 'Daxil ol →'}
          </button>
        </form>
      </div>
    </div>
  );
}
