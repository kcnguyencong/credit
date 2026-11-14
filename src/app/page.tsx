import { getCustomers, getPendingPaymentTickets } from '@/lib/db';
import ToggleBalance from '@/components/ToggleBalance';
import DebtTrendCard from '@/components/DebtTrendCard';
import PendingTicketsWidget from '@/components/PendingTicketsWidget';
import CustomerSearchList from '@/components/CustomerSearchList';
import Link from 'next/link';

export const instant = false;

export default async function Home() {
  const [customers, pendingTickets] = await Promise.all([
    getCustomers(),
    getPendingPaymentTickets(),
  ]);
  const totalDebt = customers.reduce((sum, c) => sum + Number(c.total_debt), 0);

  return (
    <div className="fintech-page-container">
      {/* ── TOP HERO SECTION (Matching image aesthetic) ── */}
      <div className="fintech-hero-section">
        <div className="fintech-top-bar">
          <div className="brand-badge">
            <span className="dot-pulse" />
            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Neo Credit Pro</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link href="/products" className="fintech-icon-pill" title="Biểu phí dịch vụ">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '16px', height: '16px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>
            </Link>
            <Link href="/customers" className="fintech-icon-pill" title="Thêm khách hàng">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '16px', height: '16px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.765Z" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="fintech-hero-headline">
          <h1>
            Smart, faster and <span className="text-electric-blue">AI-driven banking</span>
          </h1>
          <p>Hệ thống tự động hóa quản lý dư nợ, đáo hạn thẻ tín dụng và thanh toán đa kênh.</p>
        </div>
      </div>

      {/* ── THE METALLIC BLUE VIRTUAL CARD (Center of Image) ── */}
      <div style={{ padding: '0 16px', marginBottom: '14px' }}>
        <ToggleBalance balance={totalDebt} />
      </div>

      {/* ── TREND & ANALYTICS WIDGET (Bottom Card of Image) ── */}
      <div style={{ padding: '0 16px', marginBottom: '14px' }}>
        <DebtTrendCard totalDebt={totalDebt} />
      </div>

      {/* ── THÔNG BÁO TICKET CHỜ DUYỆT (NẾU CÓ) ── */}
      <PendingTicketsWidget tickets={pendingTickets} />

      {/* ── WHITE CARD SHEET (DANH SÁCH KHÁCH HÀNG) ── */}
      <div style={{ padding: '0 16px', marginBottom: '80px' }}>
        <div className="main-sheet">
          <CustomerSearchList customers={customers} />
        </div>
      </div>
    </div>
  );
}
