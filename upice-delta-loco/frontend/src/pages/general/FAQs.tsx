import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useBreakpoint } from '../../hooks/useBreakpoint'

const faqs = [
  {
    q: 'What is Upis Delta?',
    a: 'Upis Delta is a data-driven trading platform that provides real-time market and news data, an AI-powered condition engine, and automated order execution. You define your conditions in plain language, and the system sends trade orders to your connected broker when those conditions are met.',
  },
  {
    q: 'Is this a trading bot?',
    a: 'Not exactly. Upis Delta is a conditional order execution platform. It does not make autonomous trading decisions — you define the conditions, and the system executes only when your specified criteria are satisfied.',
  },
  {
    q: 'How do I get started?',
    a: 'Create an account, verify your email, connect your broker API key from account settings, define your conditions using the AI condition engine, and activate your strategy. The platform handles the rest.',
  },
  {
    q: 'What happens if my conditions are met while I\'m offline?',
    a: 'The platform operates server-side, so your conditions are monitored continuously regardless of whether you are logged in. Orders are sent to your broker automatically when conditions are triggered.',
  },
  {
    q: 'Can I run multiple strategies at the same time?',
    a: 'Yes. You can define and activate multiple strategies simultaneously across different symbols, timeframes, and condition sets.',
  },
  {
    q: 'What happens if the platform goes down during an active condition?',
    a: 'We maintain a highly available infrastructure and continuously monitor platform health. While we do not want to sound overconfident, we do not anticipate such an issue occurring. In the event of an outage, active conditions will continue to run safely on our backup servers.',
  },
  {
    q: 'Are my trading strategies private?',
    a: 'Yes. Your strategies are private and visible only to you. We do not share, sell, or replicate your strategy configurations.',
  },
  {
    q: 'Do you provide financial advice?',
    a: 'No. Upis Delta provides data and execution tools only. Nothing on this platform constitutes financial advice. All trading decisions are made at your own risk.',
  },
  {
    q: 'What data sources do you support?',
    a: 'We provide real-time price data for cryptocurrencies, equities, indices, and commodities. News and sentiment data from major financial news sources is also available as a condition trigger.',
  },
  {
    q: 'Which brokers and exchanges are supported?',
    a: 'Currently, Binance is fully supported. OKX, Interactive Brokers, and DenizBank integrations are in progress. We are continuously expanding our list of supported platforms.',
  },
  {
    q: 'What email addresses are accepted for registration?',
    a: 'We accept Gmail, Outlook, Hotmail, and Proton email addresses. Alias emails (containing + or similar modifications) are not accepted. This policy helps us maintain platform integrity.',
  },
  {
    q: 'How do I report a bug or security issue?',
    a: 'Please contact us through official platform channels or our Discord server. For security vulnerabilities, do not disclose them publicly — report them privately so we can address them promptly.',
  },
  {
    q: 'What is the difference between the free and paid plans?',
    a: 'The platform is currently free during its early access phase. Paid plans with expanded data access, higher execution limits, and premium features will be introduced at a later stage.',
  },
  {
    q: 'What indicators and conditions are supported?',
    a: 'You can define conditions based on price levels, percentage changes, technical indicators (RSI, MACD, moving averages), volume thresholds, and news sentiment. The AI condition engine interprets your instructions in natural language.',
  },
  {
    q: 'How does the AI condition engine work?',
    a: 'You describe your trading condition in plain language — for example, "send a buy order if BTC drops below $80,000 and news sentiment is negative." The AI interprets your intent and maps it to executable logic monitored against live data.',
  },
  {
    q: 'Is there a mobile app?',
    a: 'Not yet. Upis Delta is currently available as a web platform optimized for both desktop and mobile browsers. A dedicated mobile application is on our roadmap.',
  },
  {
    q: 'Can I backtest my strategies?',
    a: 'Backtesting is on our roadmap and will be available in a future release. It will allow you to simulate your conditions against historical data before going live.',
  },
  {
    q: 'Is my API key safe?',
    a: 'We encrypt all stored API keys and strongly recommend using trade-only keys — never keys with deposit or withdrawal permissions. You are solely responsible for configuring appropriate API key restrictions. See our Security Policy for full details.',
  },
  {
    q: 'How do I delete my account?',
    a: 'You can request account deletion from your account settings. All personal data will be deleted or anonymized within 30 days of the request, in accordance with our Privacy Policy.',
  },
]

export default function FAQs() {
  const navigate = useNavigate()
  const { isMobile } = useBreakpoint()
  const [open, setOpen] = useState<number | null>(null)

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
            Home
          </span>
          <span style={{ color: '#A8BDD0' }}>›</span>
          <span style={{ color: '#0A0A0A' }}>FAQs</span>
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
            Support
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 28 : 36,
            fontWeight: 700, color: '#0A0A0A',
            letterSpacing: -0.5, marginBottom: 16,
          }}>
            Frequently Asked Questions
          </h1>
          <p style={{
            fontSize: 13, color: '#7A6B72', lineHeight: 1.7,
            fontFamily: "'DM Mono', monospace", margin: 0,
          }}>
            Everything you need to know about Upis Delta. Can't find your answer?{' '}
            <a href="https://discord.gg/CEYY3GFx7C" target="_blank" rel="noreferrer"
              style={{ color: '#2F5285', textDecoration: 'underline' }}>
              Ask us on Discord.
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
              Still have questions?
            </div>
            <div style={{ fontSize: 12, color: '#7A6B72', fontFamily: "'DM Mono', monospace" }}>
              Join our community or reach out directly.
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
              Discord →
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
              GitHub →
            </a>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}
