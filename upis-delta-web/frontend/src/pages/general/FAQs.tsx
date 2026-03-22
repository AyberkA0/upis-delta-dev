import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../../node_modules/react-i18next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useBreakpoint } from '../../hooks/useBreakpoint'

export default function FAQs() {
  const navigate = useNavigate()
  const { isMobile } = useBreakpoint()
  const { t } = useTranslation()
  const [open, setOpen] = useState<number | null>(null)

  const faqs = [
    { q: t('faqs.q_0'), a: t('faqs.a_0') },
    { q: t('faqs.q_1'), a: t('faqs.a_1') },
    { q: t('faqs.q_2'), a: t('faqs.a_2') },
    { q: t('faqs.q_3'), a: t('faqs.a_3') },
    { q: t('faqs.q_4'), a: t('faqs.a_4') },
    { q: t('faqs.q_5'), a: t('faqs.a_5') },
    { q: t('faqs.q_6'), a: t('faqs.a_6') },
    { q: t('faqs.q_7'), a: t('faqs.a_7') },
    { q: t('faqs.q_8'), a: t('faqs.a_8') },
    { q: t('faqs.q_9'), a: t('faqs.a_9') },
    { q: t('faqs.q_10'), a: t('faqs.a_10') },
    { q: t('faqs.q_11'), a: t('faqs.a_11') },
    { q: t('faqs.q_12'), a: t('faqs.a_12') },
    { q: t('faqs.q_13'), a: t('faqs.a_13') },
    { q: t('faqs.q_14'), a: t('faqs.a_14') },
    { q: t('faqs.q_15'), a: t('faqs.a_15') },
    { q: t('faqs.q_16'), a: t('faqs.a_16') },
    { q: t('faqs.q_17'), a: t('faqs.a_17') },
    { q: t('faqs.q_18'), a: t('faqs.a_18') },
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
        .faq-item {
          border-bottom: 1px solid rgba(47,82,133,0.06);
          transition: background 0.15s;
        }
        .faq-item:last-child { border-bottom: none; }
        .faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: ${isMobile ? '18px 20px' : '20px 40px'};
          cursor: pointer;
          user-select: none;
        }
        .faq-question:hover { background: rgba(47,82,133,0.02); }
        .faq-answer {
          padding: 0 ${isMobile ? '20px' : '40px'} 20px;
          font-size: 13px;
          color: #5a6a7e;
          line-height: 1.8;
          font-family: 'DM Mono', monospace;
        }
        .faq-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(47,82,133,0.08);
          border: 1px solid rgba(47,82,133,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
          color: #2F5285;
          font-size: 14px;
          font-weight: 700;
        }
      `}</style>

      <Navbar isLoggedIn={isLoggedIn} username={user.name || ''} onLogout={handleLogout} />

      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: `120px ${isMobile ? '20px' : '40px'} 80px`,
      }}>

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
          <span style={{ color: '#0A0A0A' }}>{t('nav.faqs')}</span>
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid rgba(47,82,133,0.08)',
          borderRadius: 20,
          padding: isMobile ? '28px 24px' : '40px 48px',
          marginBottom: 24,
          boxShadow: '0 4px 24px rgba(47,82,133,0.06)',
        }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#7A6B72', marginBottom: 12,
          }}>
            {t('faqs.badge')}
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 28 : 36,
            fontWeight: 700, color: '#0A0A0A',
            letterSpacing: -0.5, marginBottom: 16,
          }}>
            {t('faqs.title')}
          </h1>
          <p style={{
            fontSize: 13, color: '#7A6B72', lineHeight: 1.7,
            fontFamily: "'DM Mono', monospace", margin: 0,
          }}>
            {t('faqs.subtitle')}{' '}
            <a href="https://discord.gg/CEYY3GFx7C" target="_blank" rel="noreferrer"
              style={{ color: '#2F5285', textDecoration: 'underline' }}>
              {t('faqs.ask_discord')}
            </a>
          </p>
        </div>

        {/* FAQ List */}
        <div style={{
          background: '#fff',
          border: '1px solid rgba(47,82,133,0.08)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(47,82,133,0.06)',
        }}>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <div
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span style={{
                  fontSize: isMobile ? 13 : 14,
                  fontWeight: 600,
                  color: open === i ? '#2F5285' : '#0A0A0A',
                  fontFamily: "'DM Mono', monospace",
                  lineHeight: 1.5,
                  transition: 'color 0.15s',
                }}>
                  {faq.q}
                </span>
                <div className="faq-icon" style={{
                  background: open === i ? '#2F5285' : 'rgba(47,82,133,0.08)',
                  color: open === i ? '#fff' : '#2F5285',
                }}>
                  {open === i ? '−' : '+'}
                </div>
              </div>

              {open === i && (
                <div className="faq-answer">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 32,
          background: 'rgba(47,82,133,0.04)',
          border: '1px solid rgba(47,82,133,0.10)',
          borderRadius: 16,
          padding: isMobile ? '24px 20px' : '28px 36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <div style={{
              fontSize: 14, fontWeight: 600, color: '#0A0A0A',
              fontFamily: "'DM Mono', monospace", marginBottom: 4,
            }}>
              {t('faqs.still_questions')}
            </div>
            <div style={{ fontSize: 12, color: '#7A6B72', fontFamily: "'DM Mono', monospace" }}>
              {t('faqs.community_reach')}
            </div>
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
