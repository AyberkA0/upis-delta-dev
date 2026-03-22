import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Strategy } from './Dashboard'

interface DashboardContext {
  isCompact: boolean
  setSidebarOpen: (open: boolean) => void
  strategies: Strategy[]
}

// TODO
const QUICK_SUGGESTIONS: any[] = []

export default function DashboardWelcome() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isCompact, setSidebarOpen } = useOutletContext<DashboardContext>()
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    // TODO
    navigate('/dashboard/strategy/97ec5b54-eb31-4c79-af79-927e728f1390')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>

      {isCompact && (
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid rgba(47,82,133,0.06)',
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'rgba(47,82,133,0.06)',
              border: '1px solid rgba(47,82,133,0.10)',
              borderRadius: 8, padding: 6, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: 3,
            }}
          >
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 16, height: 2, background: '#2F5285', borderRadius: 2 }} />
            ))}
          </button>
        </div>
      )}


      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: isCompact ? '40px 24px' : '60px 40px',
      }}>

        <div style={{
          width: 64, height: 64, borderRadius: 20,
          background: 'linear-gradient(135deg, #2F5285, #A8BDD0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 28,
          boxShadow: '0 8px 32px rgba(47,82,133,0.15)',
          animation: 'fadeInUp 0.4s ease forwards',
        }}>
          <span style={{ color: '#fff', fontSize: 26, fontWeight: 800 }}>U</span>
        </div>


        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: isCompact ? 26 : 32, fontWeight: 700,
          color: '#0A0A0A', letterSpacing: -0.5,
          marginBottom: 10, textAlign: 'center',
          animation: 'fadeInUp 0.4s ease forwards',
          animationDelay: '0.05s', opacity: 0,
        }}>
          {t('dashboard.welcome_title', 'What would you like to trade?')}
        </h1>

        <p style={{
          fontSize: 13, color: '#7A6B72', lineHeight: 1.8,
          textAlign: 'center', maxWidth: 480, marginBottom: 36,
          animation: 'fadeInUp 0.4s ease forwards',
          animationDelay: '0.1s', opacity: 0,
        }}>
          {t('dashboard.welcome_desc', 'Describe your trading idea and Upis Delta will generate buy/sell conditions, or select an existing strategy from the sidebar.')}
        </p>


        <div style={{
          width: '100%', maxWidth: 560,
          animation: 'fadeInUp 0.4s ease forwards',
          animationDelay: '0.15s', opacity: 0,
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <div style={{
              flex: 1, background: '#fff',
              border: '1px solid rgba(47,82,133,0.12)',
              borderRadius: 14, padding: '14px 18px',
              display: 'flex', alignItems: 'center',
              boxShadow: '0 4px 24px rgba(47,82,133,0.06)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}>
              <input
                type="text"
                placeholder={t('dashboard.welcome_placeholder', 'e.g. "Buy BTC on Binance when Fed cuts rates"')}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  fontSize: 13, fontFamily: "'DM Mono', monospace",
                  color: '#0A0A0A', background: 'transparent',
                }}
              />
            </div>
            <div
              onClick={handleSend}
              style={{
                width: 46, height: 46, borderRadius: 14,
                background: input.trim() ? '#2F5285' : 'rgba(47,82,133,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, cursor: input.trim() ? 'pointer' : 'default',
                transition: 'all 0.2s',
                boxShadow: input.trim() ? '0 4px 16px rgba(47,82,133,0.20)' : 'none',
              }}
              onMouseEnter={e => {
                if (input.trim()) e.currentTarget.style.background = 'rgba(47,82,133,0.85)'
              }}
              onMouseLeave={e => {
                if (input.trim()) e.currentTarget.style.background = '#2F5285'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
          </div>
        </div>


        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8,
          justifyContent: 'center', marginTop: 24,
          maxWidth: 560,
          animation: 'fadeInUp 0.4s ease forwards',
          animationDelay: '0.2s', opacity: 0,
        }}>
          {QUICK_SUGGESTIONS.map(suggestion => (
            <div
              key={suggestion.label}
              onClick={() => setInput(suggestion.prompt)}
              style={{
                padding: '8px 16px', borderRadius: 20,
                background: 'rgba(47,82,133,0.04)',
                border: '1px solid rgba(47,82,133,0.10)',
                fontSize: 11, color: '#2F5285', fontWeight: 500,
                fontFamily: "'DM Mono', monospace",
                cursor: 'pointer', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(47,82,133,0.08)'
                e.currentTarget.style.borderColor = 'rgba(47,82,133,0.20)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(47,82,133,0.04)'
                e.currentTarget.style.borderColor = 'rgba(47,82,133,0.10)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: 13 }}>{suggestion.icon}</span>
              {suggestion.label}
            </div>
          ))}
        </div>


        <div style={{
          display: 'flex', justifyContent: 'center', gap: 16, marginTop: 32,
          animation: 'fadeInUp 0.4s ease forwards',
          animationDelay: '0.25s', opacity: 0,
        }}>
          <span style={{ fontSize: 10, color: '#A8BDD0' }}>{t('dashboard.powered_by')}</span>
          <span style={{ fontSize: 10, color: '#A8BDD0' }}>·</span>
          <span style={{ fontSize: 10, color: '#A8BDD0' }}>
            {t('dashboard.disclaimer', 'Responses may contain errors. Verify before trading.')}
          </span>
        </div>
      </div>
    </>
  )
}