const TICKERS = [
  { symbol: 'BTC/USD',  price: '83,421.50', change: '+2.34%', positive: true },
  { symbol: 'ETH/USD',  price: '3,204.80',  change: '+1.12%', positive: true },
  { symbol: 'XAU/USD',  price: '2,184.30',  change: '-0.22%', positive: false },
  { symbol: 'XAG/USD',  price: '24.67',     change: '+0.45%', positive: true },
  { symbol: 'BTC/TRY',  price: '2,741,820', change: '+2.89%', positive: true },
  { symbol: 'BIST100',  price: '9,842.30',  change: '-0.87%', positive: false },
  { symbol: 'EUR/USD',  price: '1.0842',    change: '-0.14%', positive: false },
  { symbol: 'USD/TRY',  price: '32.84',     change: '+0.31%', positive: true },
  { symbol: 'WTI',      price: '78.42',     change: '+0.67%', positive: true },
  { symbol: 'AAPL',     price: '182.63',    change: '+0.92%', positive: true },
  { symbol: 'SOL/USD',  price: '142.80',    change: '+3.21%', positive: true },
  { symbol: 'BNB/USD',  price: '401.20',    change: '+1.05%', positive: true },
]

export default function TickerStrip() {
  const items = [...TICKERS, ...TICKERS]

  return (
    <div style={{
      background: '#0A0A0A',
      borderBottom: '1px solid rgba(168,189,208,0.1)',
      overflow: 'hidden',
      position: 'relative',
      height: 36,
    }}>
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: ticker 40s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="ticker-track">
        {items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '0 24px',
            borderRight: '1px solid rgba(168,189,208,0.08)',
            height: 36, whiteSpace: 'nowrap',
          }}>
            <span style={{
              fontSize: 11, fontWeight: 600,
              color: '#A8BDD0',
              fontFamily: "'DM Mono', monospace",
              letterSpacing: '0.06em',
            }}>
              {item.symbol}
            </span>
            <span style={{
              fontSize: 11,
              color: '#e0ebe8',
              fontFamily: "'DM Mono', monospace",
            }}>
              {item.price}
            </span>
            <span style={{
              fontSize: 10, fontWeight: 700,
              color: item.positive ? '#22c55e' : '#ef4444',
              fontFamily: "'DM Mono', monospace",
            }}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
