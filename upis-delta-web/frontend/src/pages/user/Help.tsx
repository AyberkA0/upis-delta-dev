import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../../node_modules/react-i18next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useBreakpoint } from '../../hooks/useBreakpoint'

export default function Help() {
  const navigate = useNavigate()
  const { isMobile } = useBreakpoint()
  const { t } = useTranslation()
  const [openSections, setOpenSections] = useState<string[]>([])

  const helpSections = [
    {
      title: t('help.section_0'),
      items: [
        { q: t('help.s0_q0'), a: t('help.s0_a0') },
        { q: t('help.s0_q1'), a: t('help.s0_a1') },
        { q: t('help.s0_q2'), a: t('help.s0_a2') },
      ],
    },
    {
      title: t('help.section_1'),
      items: [
        { q: t('help.s1_q0'), a: t('help.s1_a0') },
        { q: t('help.s1_q1'), a: t('help.s1_a1') },
        { q: t('help.s1_q2'), a: t('help.s1_a2') },
      ],
    },
    {
      title: t('help.section_2'),
      items: [
        { q: t('help.s2_q0'), a: t('help.s2_a0') },
        { q: t('help.s2_q1'), a: t('help.s2_a1') },
        { q: t('help.s2_q2'), a: t('help.s2_a2') },
      ],
    },
    {
      title: t('help.section_3'),
      items: [
        { q: t('help.s3_q0'), a: t('help.s3_a0') },
        { q: t('help.s3_q1'), a: t('help.s3_a1') },
        { q: t('help.s3_q2'), a: t('help.s3_a2') },
      ],
    },
    {
      title: t('help.section_4'),
      items: [
        { q: t('help.s4_q0'), a: t('help.s4_a0') },
        { q: t('help.s4_q1'), a: t('help.s4_a1') },
        { q: t('help.s4_q2'), a: t('help.s4_a2') },
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

  const toggleSection = (title: string) => {
    setOpenSections(prev =>
      prev.includes(title)
        ? prev.filter(s => s !== title)
        : [...prev, title]
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6FA', fontFamily: "'DM Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        .help-section {
          background: #fff;
          border: 1px solid rgba(47,82,133,0.08);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(47,82,133,0.04);
          margin-bottom: 20px;
        }
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          cursor: pointer;
          user-select: none;
          border-bottom: 1px solid rgba(47,82,133,0.06);
          transition: background 0.15s;
        }
        .section-header:hover {
          background: rgba(47,82,133,0.02);
        }
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #0A0A0A;
          margin: 0;
        }
        .section-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2F5285;
          font-size: 16px;
          transition: transform 0.2s;
        }
        .section-icon.open {
          transform: rotate(180deg);
        }
        .section-content {
          display: flex;
          flex-direction: column;
        }
        .help-item {
          padding: 20px 24px;
          border-bottom: 1px solid rgba(47,82,133,0.06);
        }
        .help-item:last-child {
          border-bottom: none;
        }
        .help-question {
          font-size: 14px;
          font-weight: 600;
          color: #0A0A0A;
          margin-bottom: 10px;
        }
        .help-answer {
          font-size: 13px;
          color: #7A6B72;
          line-height: 1.7;
        }
      `}</style>

      <Navbar isLoggedIn={isLoggedIn} username={user.name || ''} onLogout={handleLogout} />

      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: `120px ${isMobile ? '20px' : '40px'} 80px`,
      }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 12, color: '#7A6B72', marginBottom: 40,
        }}>
          <span style={{ color: 'rgb(122, 107, 114)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#2F5285'}
            onMouseLeave={e => e.currentTarget.style.color = '#7A6B72'}
          >{t('breadcrumb.user')}</span>
          <span style={{ color: '#A8BDD0' }}>›</span>
          <span style={{ color: '#0A0A0A' }}>{t('help.title')}</span>
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid rgba(47,82,133,0.08)',
          borderRadius: 20,
          padding: isMobile ? '28px 24px' : '40px 48px',
          marginBottom: 32,
          boxShadow: '0 4px 24px rgba(47,82,133,0.06)',
        }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#7A6B72', marginBottom: 12,
          }}>
            {t('help.badge')}
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 28 : 36,
            fontWeight: 700, color: '#0A0A0A',
            letterSpacing: -0.5, marginBottom: 16, margin: 0,
            // marginBottom: 16,
          }}>
            {t('help.title')}
          </h1>
          <p style={{
            fontSize: 13, color: '#7A6B72', lineHeight: 1.7,
            fontFamily: "'DM Mono', monospace", margin: 0,
          }}>
            {t('help.subtitle_text')}{' '}
            <a href="https://discord.gg/CEYY3GFx7C" target="_blank" rel="noreferrer"
              style={{ color: '#2F5285', textDecoration: 'underline' }}>
              {t('help.join_discord')}
            </a>
            {' '}{t('help.for_support')}
          </p>
        </div>

        {helpSections.map(section => (
          <div key={section.title} className="help-section">
            <div
              className="section-header"
              onClick={() => toggleSection(section.title)}
            >
              <h2 className="section-title">{section.title}</h2>
              <div className={`section-icon ${openSections.includes(section.title) ? 'open' : ''}`}>
                ⌄
              </div>
            </div>

            {openSections.includes(section.title) && (
              <div className="section-content">
                {section.items.map((item, idx) => (
                  <div key={idx} className="help-item">
                    <div className="help-question">{item.q}</div>
                    <div className="help-answer">{item.a}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div style={{
          marginTop: 32,
          background: 'rgba(47,82,133,0.04)',
          border: '1px solid rgba(47,82,133,0.10)',
          borderRadius: 16,
          padding: isMobile ? '24px 20px' : '28px 36px',
        }}>
          <div style={{
            fontSize: 14, fontWeight: 600, color: '#0A0A0A',
            fontFamily: "'DM Mono', monospace", marginBottom: 4,
          }}>
            {t('help.still_need_help')}
          </div>
          <div style={{ fontSize: 12, color: '#7A6B72', fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>
            {t('help.reach_out')}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href="https://discord.gg/CEYY3GFx7C"
              target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 12, color: '#2F5285',
                fontFamily: "'DM Mono', monospace",
                padding: '8px 16px',
                background: 'rgba(47,82,133,0.08)',
                border: '1px solid rgba(47,82,133,0.15)',
                borderRadius: 8,
                textDecoration: 'none',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(47,82,133,0.14)'
                e.currentTarget.style.borderColor = 'rgba(47,82,133,0.28)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(47,82,133,0.08)'
                e.currentTarget.style.borderColor = 'rgba(47,82,133,0.15)'
              }}
            >
              {t('common.discord')}
            </a>
            <a
              href="https://github.com/AyberkA0/upis-delta-dev"
              target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 12, color: '#2F5285',
                fontFamily: "'DM Mono', monospace",
                padding: '8px 16px',
                background: 'rgba(47,82,133,0.08)',
                border: '1px solid rgba(47,82,133,0.15)',
                borderRadius: 8,
                textDecoration: 'none',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(47,82,133,0.14)'
                e.currentTarget.style.borderColor = 'rgba(47,82,133,0.28)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(47,82,133,0.08)'
                e.currentTarget.style.borderColor = 'rgba(47,82,133,0.15)'
              }}
            >
              {t('common.github')}
            </a>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}