import SparkLine from './SparkLine'

interface PriceCardProps {
  title: string
  subtitle: string
  price: string
  change: string
  positive: boolean
  color: string
}

const glassCard = {
  background: 'rgba(255,255,255,0.55)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 8px 32px rgba(47,82,133,0.08)',
  borderRadius: 20,
  padding: 28,
  flex: 1,
  minWidth: 280,
}

export default function PriceCard({ title, subtitle, price, change, positive, color }: PriceCardProps) {
  return (
    <div style={glassCard}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{
            fontSize: 11, color: '#7A6B72', letterSpacing: '0.08em',
            textTransform: 'uppercase', fontFamily: "'DM Mono', monospace", marginBottom: 4,
          }}>
            {subtitle}
          </div>
          <div style={{
            fontSize: 20, fontWeight: 700, color: '#0A0A0A',
            fontFamily: "'Playfair Display', serif",
          }}>
            {title}
          </div>
        </div>
        <div style={{
          padding: '4px 10px', borderRadius: 20,
          background: positive ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
          color: positive ? '#16a34a' : '#dc2626',
          fontSize: 12, fontWeight: 700, fontFamily: "'DM Mono', monospace",
        }}>
          {positive ? '▲' : '▼'} {change}
        </div>
      </div>

      <div style={{
        fontSize: 30, fontWeight: 800, color: '#0A0A0A',
        fontFamily: "'Playfair Display', serif", marginBottom: 16,
      }}>
        {price}
      </div>

      <SparkLine color={color} />

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        {['1D', '1W', '1M', '3M'].map(tf => (
          <button key={tf} style={{
            background: tf === '1D' ? color : 'transparent',
            color: tf === '1D' ? '#fff' : '#7A6B72',
            border: `1px solid ${tf === '1D' ? color : 'rgba(168,189,208,0.4)'}`,
            borderRadius: 6, padding: '3px 10px',
            fontSize: 11, cursor: 'pointer',
            fontFamily: "'DM Mono', monospace", fontWeight: 600,
          }}>
            {tf}
          </button>
        ))}
      </div>
    </div>
  )
}