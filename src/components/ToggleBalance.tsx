'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ToggleBalance({ balance }: { balance: number }) {
  const [show, setShow] = useState(true);
  const formatted = new Intl.NumberFormat('vi-VN').format(balance);

  return (
    <div className="fintech-card">
      {/* Card Header: Mastercard logo + Contactless icon */}
      <div className="fintech-card-header">
        {/* Overlapping translucent circles (Mastercard aesthetic) */}
        <div className="fintech-card-logo" aria-hidden="true">
          <div className="circle circle-1" />
          <div className="circle circle-2" />
        </div>

        {/* Contactless wave icon */}
        <div className="fintech-card-contactless" aria-label="Contactless payment">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M8.5 16.5a5 5 0 0 1 0-9" />
            <path d="M12 19a8.5 8.5 0 0 0 0-14" />
            <path d="M15.5 21.5a12 12 0 0 0 0-19" />
          </svg>
        </div>
      </div>

      {/* Card Body: Balance info */}
      <div className="fintech-card-body">
        <div className="fintech-card-label">
          <span>Tổng dư nợ tín dụng</span>
          <button
            type="button"
            onClick={() => setShow(v => !v)}
            className="fintech-eye-btn"
            aria-label="Ẩn / Hiện số nợ"
          >
            {show ? (
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '16px', height: '16px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            ) : (
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '16px', height: '16px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            )}
          </button>
        </div>

        <div className="fintech-card-amount">
          {show ? formatted : '••••••••'}
          <span className="currency-unit">đ</span>
        </div>
      </div>

      {/* Card Footer: Expiry, Masked Number & Action Pill */}
      <div className="fintech-card-footer">
        <div className="fintech-card-meta">
          <span className="meta-expiry">12/28</span>
          <span className="meta-number">•••• 9248</span>
        </div>

        <Link href="/transaction" className="fintech-card-action-btn">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '14px', height: '14px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Ghi nợ</span>
        </Link>
      </div>
    </div>
  );
}
