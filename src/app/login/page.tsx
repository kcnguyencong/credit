'use client';

import { useState } from 'react';
import { loginAction } from '@/lib/actions';

export default function LoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const res = await loginAction(formData);
      if (res?.error) {
        setError(res.error);
        setIsLoading(false);
      } else if (res?.success) {
        window.location.href = '/';
      }
    } catch {
      setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F1F4F9' }}>
      {/* ── FINTECH BRAND HERO ── */}
      <div
        style={{
          position: 'relative',
          padding: '50px 20px 42px',
          background: 'linear-gradient(135deg, #071E3D 0%, #11427D 50%, #031326 100%)',
          color: '#FFFFFF',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 16px 36px -6px rgba(11, 41, 88, 0.35)'
        }}
      >
        {/* Virtual Card Overlapping Circles Logo */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#FFFFFF',
            margin: '0 0 6px',
            letterSpacing: '-0.4px',
          }}
        >
          Neo Credit Pro
        </h1>
        <p
          style={{
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.8)',
            margin: 0,
            maxWidth: '300px',
            lineHeight: 1.4
          }}
        >
          Smart, faster and <span style={{ color: '#38BDF8', fontWeight: 600 }}>AI-driven credit management</span>
        </p>
      </div>

      {/* ── SHEET FORM ĐĂNG NHẬP (BO TRÒN GỐC TRÊN) ── */}
      <div
        style={{
          flex: 1,
          background: '#FFFFFF',
          borderRadius: '26px 26px 0 0',
          marginTop: '-20px',
          padding: '30px 20px 40px',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.05)',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={{ width: '100%', maxWidth: '340px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)'
              }}
            />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1F2937', margin: 0 }}>
              Đăng nhập hệ thống
            </h2>
          </div>

          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FEE2E2',
                border: '1px solid #FCA5A5',
                color: '#B91C1C',
                padding: '10px 14px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '18px'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Tên đăng nhập */}
            <div className="input-group" style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.825rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px', display: 'block' }}>
                Tên đăng nhập
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập (admin)"
                  className="input"
                  required
                  style={{
                    paddingLeft: '40px',
                    fontSize: '0.95rem',
                    backgroundColor: '#F9FAFB'
                  }}
                />
                <svg
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="input-group" style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '0.825rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px', display: 'block' }}>
                Mật khẩu
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="input"
                  required
                  autoFocus
                  style={{
                    paddingLeft: '40px',
                    paddingRight: '40px',
                    fontSize: '0.95rem',
                    backgroundColor: '#F9FAFB'
                  }}
                />
                <svg
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>

                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#9CA3AF',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn"
              disabled={isLoading || !password}
              style={{
                padding: '14px',
                fontSize: '1rem',
                fontWeight: 700,
                opacity: (isLoading || !password) ? 0.6 : 1,
                cursor: (isLoading || !password) ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? 'Đang kiểm tra...' : 'Đăng Nhập'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', color: '#9CA3AF', fontSize: '0.78rem' }}>
            <span>🔒 Highly secured and encrypted by Neo Bank</span>
          </div>
        </div>
      </div>
    </div>
  );
}
