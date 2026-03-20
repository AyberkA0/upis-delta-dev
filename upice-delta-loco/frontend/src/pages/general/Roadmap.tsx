import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useBreakpoint } from '../../hooks/useBreakpoint'

const phases = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    status: 'completed',
    period: 'Q1 2026',
    items: [
      { text: 'User authentication & email verification', done: true },
      { text: 'Platform architecture & infrastructure', done: true },
      { text: 'Landing page & legal pages', done: true },
      { text: 'Binance integration', done: true },
      { text: 'Real-time price feed', done: true },
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Core Platform',
    status: 'active',
    period: 'Q2 2026',
    items: [
      { text: 'AI condition engine (natural language input)', done: false },
      { text: 'Strategy builder & management', done: false },
      { text: 'Automated order execution', done: false },
      { text: 'News & sentiment data feed', done: false },
      { text: 'Dashboard & portfolio overview', done: false },
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Expansion',
    status: 'upcoming',
    period: 'Q3 2026',
    items: [
      { text: 'OKX integration', done: false },
      { text: 'Interactive Brokers integration', done: false },
      { text: 'Backtesting engine', done: false },
      { text: 'Strategy performance analytics', done: false },
      { text: 'Mobile-optimized experience', done: false },
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Scale',
    status: 'upcoming',
    period: 'Q4 2026',
    items: [
      { text: 'Paid plan tiers', done: false },
      { text: 'DenizBank integration', done: false },
      { text: 'Multi-strategy portfolio management', done: false },
      { text: 'Advanced risk management tools', done: false },
      { text: 'Mobile application', done: false },
    ],
  },
]

const statusConfig = {
  completed: { label: 'Completed', color: '#16a34a', bg: 'rgba(22,163,74,0.08)', border: 'rgba(22,163,74,0.2)' },
  active:    { label: 'In Progress', color: '#2F5285', bg: 'rgba(47,82,133,0.08)', border: 'rgba(47,82,133,0.2)' },
  upcoming:  { label: 'Upcoming', color: '#7A6B72', bg: 'rgba(122,107,114,0.08)', border: 'rgba(122,107,114,0.2)' },
}

export default function Roadmap() {
  const navigate = useNavigate()
  const { isMobile } = useBreakpoint()

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isLoggedIn = !!token

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6FA', fontFamily: "'DM Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
      `}</style>

      <Navbar isLoggedIn={isLoggedIn} username={user.name || ''} onLogout={handleLogout} />

      <div style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: `120px ${isMobile ? '20px' : '40px'} 80px`,
      }}>

        {/* Breadcrumb */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 12, color: '#7A6B72',
          fontFamily: "'DM Mono', monospace",
          marginBottom: 40,
        }}>
          <span
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#2F5285'}
            onMouseLeave={e => e.currentTarget.style.color = '#7A6B72'}
          >
            Home
          </span>
          <span style={{ color: '#A8BDD0' }}>›</span>
          <span style={{ color: '#0A0A0A' }}>Roadmap</span>
        </div>

        {/* Header */}
        <div style={{
          background: '#fff',
          border: '1px solid rgba(47,82,133,0.08)',
          borderRadius: 20,
          padding: isMobile ? '28px 24px' : '40px 48px',
          marginBottom: 40,
          boxShadow: '0 4px 24px rgba(47,82,133,0.06)',
        }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#7A6B72', marginBottom: 12,
          }}>
            Product
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 28 : 36,
            fontWeight: 700, color: '#0A0A0A',
            letterSpacing: -0.5, marginBottom: 16,
          }}>
            Roadmap
          </h1>
          <p style={{
            fontSize: 13, color: '#7A6B72',
            lineHeight: 1.7, fontFamily: "'DM Mono', monospace", margin: 0,
          }}>
            Our development plan for Upis Delta. This roadmap reflects our current priorities and is subject to change based on user feedback and market conditions.
          </p>

          {/* Status legend */}
          <div style={{
            display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 24,
          }}>
            {Object.entries(statusConfig).map(([key, val]) => (
              <div key={key} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 11, color: val.color,
                fontFamily: "'DM Mono', monospace", fontWeight: 600,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: val.color,
                }} />
                {val.label}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {phases.map((phase, pi) => {
            const cfg = statusConfig[phase.status as keyof typeof statusConfig]
            return (
              <div key={pi} style={{
                background: '#fff',
                border: `1px solid ${phase.status === 'active' ? 'rgba(47,82,133,0.2)' : 'rgba(47,82,133,0.08)'}`,
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: phase.status === 'active'
                  ? '0 4px 24px rgba(47,82,133,0.10)'
                  : '0 4px 24px rgba(47,82,133,0.04)',
              }}>

                {/* Phase header */}
                <div style={{
                  padding: isMobile ? '20px 24px' : '24px 36px',
                  borderBottom: '1px solid rgba(47,82,133,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 12,
                  background: phase.status === 'active'
                    ? 'rgba(47,82,133,0.02)'
                    : 'transparent',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      fontSize: 11, fontWeight: 700, color: '#A8BDD0',
                      letterSpacing: '0.1em', fontFamily: "'DM Mono', monospace",
                    }}>
                      {phase.phase}
                    </div>
                    <h2 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: isMobile ? 18 : 22,
                      fontWeight: 700, color: '#0A0A0A',
                      margin: 0, letterSpacing: -0.3,
                    }}>
                      {phase.title}
                    </h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      fontSize: 11, color: '#7A6B72',
                      fontFamily: "'DM Mono', monospace",
                    }}>
                      {phase.period}
                    </span>
                    <span style={{
                      fontSize: 10, fontWeight: 700,
                      color: cfg.color,
                      background: cfg.bg,
                      border: `1px solid ${cfg.border}`,
                      borderRadius: 20,
                      padding: '3px 10px',
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}>
                      {cfg.label}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div style={{ padding: isMobile ? '16px 24px' : '20px 36px' }}>
                  {phase.items.map((item, ii) => (
                    <div key={ii} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 0',
                      borderBottom: ii < phase.items.length - 1
                        ? '1px solid rgba(47,82,133,0.04)'
                        : 'none',
                    }}>
                      <div style={{
                        width: 18, height: 18,
                        borderRadius: '50%',
                        flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: item.done
                          ? 'rgba(22,163,74,0.12)'
                          : phase.status === 'active'
                          ? 'rgba(47,82,133,0.08)'
                          : 'rgba(122,107,114,0.08)',
                        border: `1px solid ${item.done
                          ? 'rgba(22,163,74,0.3)'
                          : phase.status === 'active'
                          ? 'rgba(47,82,133,0.2)'
                          : 'rgba(122,107,114,0.2)'}`,
                      }}>
                        {item.done ? (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <div style={{
                            width: 5, height: 5, borderRadius: '50%',
                            background: phase.status === 'active' ? '#2F5285' : '#A8BDD0',
                            opacity: 0.5,
                          }} />
                        )}
                      </div>
                      <span style={{
                        fontSize: 13,
                        color: item.done ? '#5a6a7e' : '#0A0A0A',
                        fontFamily: "'DM Mono', monospace",
                        textDecoration: item.done ? 'line-through' : 'none',
                        opacity: item.done ? 0.6 : 1,
                      }}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            )
          })}
        </div>

        {/* Bottom note */}
        <div style={{
          marginTop: 32,
          background: 'rgba(47,82,133,0.04)',
          border: '1px solid rgba(47,82,133,0.10)',
          borderLeft: '3px solid #2F5285',
          borderRadius: '0 12px 12px 0',
          padding: '16px 20px',
        }}>
          <p style={{
            fontSize: 12, color: '#7A6B72',
            fontFamily: "'DM Mono', monospace",
            lineHeight: 1.7, margin: 0,
          }}>
            Have a feature request? Share it on{' '}
            <a
              href="https://discord.gg/CEYY3GFx7C"
              target="_blank" rel="noreferrer"
              style={{ color: '#2F5285', textDecoration: 'underline' }}
            >
              Discord
            </a>
            {' '}or open an issue on{' '}
            <a
              href="https://github.com/AyberkA0/upis-delta-dev"
              target="_blank" rel="noreferrer"
              style={{ color: '#2F5285', textDecoration: 'underline' }}
            >
              GitHub
            </a>.
            We review all feedback.
          </p>
        </div>

      </div>

      <Footer />
    </div>
  )
}
