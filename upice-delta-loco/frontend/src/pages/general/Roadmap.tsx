import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useBreakpoint } from '../../hooks/useBreakpoint'

export default function Roadmap() {
  const navigate = useNavigate()
  const { isMobile } = useBreakpoint()
  const { t } = useTranslation()

  const statusConfig = {
    completed: { label: t('roadmap.status_completed'), color: '#16a34a', bg: 'rgba(22,163,74,0.08)', border: 'rgba(22,163,74,0.2)' },
    active:    { label: t('roadmap.status_active'), color: '#2F5285', bg: 'rgba(47,82,133,0.08)', border: 'rgba(47,82,133,0.2)' },
    upcoming:  { label: t('roadmap.status_upcoming'), color: '#7A6B72', bg: 'rgba(122,107,114,0.08)', border: 'rgba(122,107,114,0.2)' },
  }

  const phases = [
    {
      phase: 'Phase 1',
      title: t('roadmap.phase1_title'),
      status: 'completed',
      period: t('roadmap.phase1_period'),
      items: [
        { text: t('roadmap.phase1_0'), done: true },
        { text: t('roadmap.phase1_1'), done: true },
        { text: t('roadmap.phase1_2'), done: true },
        { text: t('roadmap.phase1_3'), done: true },
        { text: t('roadmap.phase1_4'), done: true },
      ],
    },
    {
      phase: 'Phase 2',
      title: t('roadmap.phase2_title'),
      status: 'active',
      period: t('roadmap.phase2_period'),
      items: [
        { text: t('roadmap.phase2_0'), done: false },
        { text: t('roadmap.phase2_1'), done: false },
        { text: t('roadmap.phase2_2'), done: false },
        { text: t('roadmap.phase2_3'), done: false },
        { text: t('roadmap.phase2_4'), done: false },
      ],
    },
    {
      phase: 'Phase 3',
      title: t('roadmap.phase3_title'),
      status: 'upcoming',
      period: t('roadmap.phase3_period'),
      items: [
        { text: t('roadmap.phase3_0'), done: false },
        { text: t('roadmap.phase3_1'), done: false },
        { text: t('roadmap.phase3_2'), done: false },
        { text: t('roadmap.phase3_3'), done: false },
        { text: t('roadmap.phase3_4'), done: false },
      ],
    },
    {
      phase: 'Phase 4',
      title: t('roadmap.phase4_title'),
      status: 'upcoming',
      period: t('roadmap.phase4_period'),
      items: [
        { text: t('roadmap.phase4_0'), done: false },
        { text: t('roadmap.phase4_1'), done: false },
        { text: t('roadmap.phase4_2'), done: false },
        { text: t('roadmap.phase4_3'), done: false },
        { text: t('roadmap.phase4_4'), done: false },
      ],
    },
  ]

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
            {t('breadcrumb.home')}
          </span>
          <span style={{ color: '#A8BDD0' }}>›</span>
          <span style={{ color: '#0A0A0A' }}>{t('roadmap.title')}</span>
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
            {t('roadmap.badge')}
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 28 : 36,
            fontWeight: 700, color: '#0A0A0A',
            letterSpacing: -0.5, marginBottom: 16,
          }}>
            {t('roadmap.title')}
          </h1>
          <p style={{
            fontSize: 13, color: '#7A6B72',
            lineHeight: 1.7, fontFamily: "'DM Mono', monospace", margin: 0,
          }}>
            {t('roadmap.subtitle')}
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
            {t('roadmap.feature_request')}{' '}
            <a
              href="https://discord.gg/CEYY3GFx7C"
              target="_blank" rel="noreferrer"
              style={{ color: '#2F5285', textDecoration: 'underline' }}
            >
              Discord
            </a>
            {' '}{t('roadmap.or_issue')}{' '}
            <a
              href="https://github.com/AyberkA0/upis-delta-dev"
              target="_blank" rel="noreferrer"
              style={{ color: '#2F5285', textDecoration: 'underline' }}
            >
              GitHub
            </a>
            {' '}{t('roadmap.review_feedback')}
          </p>
        </div>

      </div>

      <Footer />
    </div>
  )
}
