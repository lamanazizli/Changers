'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@changers.az');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        cache: 'no-store',
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Xeta bas verdi');
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_email', data.admin.email);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Token alinmadi');
      }
    } catch (err) {
      setError('Server ile elaqe xetasi: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img src="/logo.png" alt="Changers" style={{ height: '44px', width: 'auto', marginBottom: '16px' }} />
          <h1 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '24px', margin: '0 0 8px 0' }}>Admin Panel</h1>
          <p style={{ color: '#A0A0B0', fontSize: '14px', margin: 0 }}>Daxil olmaq ucun melumatlarınızı yazın</p>
        </div>
        <form onSubmit={handleLogin} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,44,168,0.2)', borderRadius: '20px', padding: '32px' }}>
          {error && (
            <div style={{ background: 'rgba(255,44,168,0.1)', border: '1px solid rgba(255,44,168,0.3)', borderRadius: '10px', padding: '12px 16px', color: '#FF2CA8', fontSize: '14px', marginBottom: '20px' }}>
              ⚠️ {error}
            </div>
          )}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '1px' }}>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@changers.az"
              required
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '14px 18px', color: '#FFFFFF', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: '#A0A0B0', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '1px' }}>SIFRE</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '14px 18px', color: '#FFFFFF', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ background: '#FF2CA8', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', width: '100%', boxShadow: '0px 8px 28px rgba(255,44,168,0.45)', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Daxil olunur...' : 'Daxil Ol →'}
          </button>
          <div style={{ marginTop: '16px', textAlign: 'center', color: '#A0A0B0', fontSize: '12px' }}>
            🔒 Yalnız icazəli istifadəçilər üçün
          </div>
        </form>
      </div>
    </main>
  );
}
