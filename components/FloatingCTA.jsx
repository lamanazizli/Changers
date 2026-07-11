'use client';
import Link from 'next/link';
import useIsMobile from '../lib/useIsMobile';

export default function FloatingCTA() {
  const isMobile = useIsMobile();
  if (!isMobile) return null;

  return (
    <>
      <style>{`
        @keyframes pulse-cta {
          0% { box-shadow: 0 0 0 0 rgba(255,44,168,0.6); }
          70% { box-shadow: 0 0 0 14px rgba(255,44,168,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,44,168,0); }
        }
        .floating-cta {
          animation: pulse-cta 2s infinite;
        }
      `}</style>
      <Link href="/qeydiyyat" className="floating-cta" style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 999,
        textDecoration: 'none',
        background: '#FF2CA8',
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: '13px',
        padding: '13px 18px',
        borderRadius: '100px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 8px 24px rgba(255,44,168,0.4)',
      }}>
        Kursa qoşul
      </Link>
    </>
  );
}
