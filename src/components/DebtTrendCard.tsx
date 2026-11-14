'use client';

import { useState } from 'react';

export default function DebtTrendCard({ totalDebt }: { totalDebt: number }) {
  const [period, setPeriod] = useState<'1D' | '1W' | '1M' | '1Q'>('1W');

  return (
    <div className="fintech-trend-card">
      <div className="trend-card-top">
        <div>
          <div className="trend-title">Dư nợ tín dụng tuần này</div>
          <div className="trend-tabs">
            {(['1D', '1W', '1M', '1Q'] as const).map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setPeriod(tab)}
                className={`trend-tab ${period === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="trend-stat">
          <div className="trend-value">
            {new Intl.NumberFormat('vi-VN', { notation: 'compact', compactDisplay: 'short' }).format(totalDebt)}
            <span style={{ fontSize: '0.8rem', marginLeft: '2px', fontWeight: 600 }}>đ</span>
          </div>
          <div className="trend-badge">
            <span>▲ 0.44%</span>
          </div>
        </div>
      </div>

      {/* SVG Sparkline Area Chart (Exact match of the blue curve from the image) */}
      <div className="trend-chart-wrapper">
        <svg viewBox="0 0 320 85" className="trend-chart" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fintechAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0066FF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path
            d="M 0 68 
               L 18 68 
               L 32 78 
               L 48 54 
               L 64 74 
               L 80 72 
               L 100 52 
               L 120 54 
               L 142 42 
               L 165 32 
               L 185 40 
               L 205 30 
               L 225 36 
               L 248 44 
               L 270 38 
               L 295 48 
               L 320 42 
               L 320 85 
               L 0 85 Z"
            fill="url(#fintechAreaGrad)"
          />

          {/* Blue Stroke Line */}
          <path
            d="M 0 68 
               L 18 68 
               L 32 78 
               L 48 54 
               L 64 74 
               L 80 72 
               L 100 52 
               L 120 54 
               L 142 42 
               L 165 32 
               L 185 40 
               L 205 30 
               L 225 36 
               L 248 44 
               L 270 38 
               L 295 48 
               L 320 42"
            fill="none"
            stroke="#0066FF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Marker point and tooltip badge */}
          <circle cx="48" cy="54" r="3.5" fill="#0066FF" stroke="#FFFFFF" strokeWidth="2" />
        </svg>

        {/* Floating tooltip label matching 0.7413 from the screenshot */}
        <div className="trend-tooltip" style={{ left: '16%' }}>
          {new Intl.NumberFormat('vi-VN').format(totalDebt)}đ
        </div>

        {/* Date labels at bottom */}
        <div className="trend-x-axis">
          <span>16 Thg 11</span>
          <span>23 Thg 11</span>
          <span>30 Thg 11</span>
          <span>07 Thg 12</span>
          <span>14 Thg 12</span>
        </div>
      </div>
    </div>
  );
}
