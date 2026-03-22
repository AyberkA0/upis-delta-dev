import { useState, useEffect, useRef } from 'react'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom'
import { useTranslation } from '../../../node_modules/react-i18next'
import { MOCK_STRATEGIES, STATUS_STYLES } from './Dashboard'
import type { Strategy } from './Dashboard'

interface DashboardContext {
  isCompact: boolean
  setSidebarOpen: (open: boolean) => void
  strategies: Strategy[]
}

interface Message {
  id: string
  sender: 'user' | 'ai'
  text: string
  codeBlock?: string
  actions?: { label: string; type: 'primary' | 'secondary' }[]
  timestamp: string
}

// TODO
const MOCK_MESSAGES: Record<string, Message[]> = {
  '97ec5b54-eb31-4c79-af79-927e728f1390': [
    {
      id: 'm1', sender: 'ai', timestamp: '2:34 PM',
      text: "I've analyzed the BTC/USD pair on Binance. Based on your momentum strategy, here are the conditions I've generated:",
      codeBlock: 'BUY when RSI(14) < 30 AND MACD_cross_up AND volume > SMA(20)\nSELL when RSI(14) > 70 OR stop_loss(-3%)',
    },
    {
      id: 'm2', sender: 'user', timestamp: '2:35 PM',
      text: 'Add a trailing stop at 2% and change the RSI sell threshold to 75. Also include a volume confirmation for the sell signal.',
    },
    {
      id: 'm3', sender: 'ai', timestamp: '2:35 PM',
      text: 'Updated conditions:',
      codeBlock: 'BUY when RSI(14) < 30 AND MACD_cross_up AND volume > SMA(20)\nSELL when RSI(14) > 75 AND volume > SMA(20) OR trailing_stop(-2%) OR stop_loss(-3%)',
      actions: [
        { label: 'Apply & Activate', type: 'primary' },
        { label: 'Run Backtest', type: 'secondary' },
      ],
    },
  ],
}

function ConditionBlock({ code }: { code: string }) {
  const lines = code.split('\n')
  return (
    <div style={{
      marginTop: 14, background: '#0A0A0A', borderRadius: 10,
      padding: '14px 18px', fontSize: 12, color: '#A8BDD0',
      lineHeight: 1.7, fontFamily: "'DM Mono', monospace",
    }}>
      {lines.map((line, i) => {
        const parts = line.split(/(BUY|SELL|when|AND|OR)/g)
        return (
          <div key={i}>
            {parts.map((part, j) => {
              if (part === 'BUY') return <span key={j} style={{ color: '#16a34a' }}>{part}</span>
              if (part === 'SELL') return <span key={j} style={{ color: '#dc2626' }}>{part}</span>
              if (['when', 'AND', 'OR'].includes(part)) return <span key={j} style={{ color: '#7A6B72' }}>{part}</span>
              return <span key={j}>{part}</span>
            })}
          </div>
        )
      })}
    </div>
  )
}

export default function StrategyChat() {
  const { strategyId } = useParams<{ strategyId: string }>()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isCompact, setSidebarOpen } = useOutletContext<DashboardContext>()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const strategy = MOCK_STRATEGIES.find(s => s.id === strategyId)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    if (strategyId && MOCK_MESSAGES[strategyId]) {
      setMessages(MOCK_MESSAGES[strategyId])
    } else {
      setMessages([])
    }
  }, [strategyId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg: Message = {
      id: `m${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, newMsg])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!strategy) {
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <div style={{ fontSize: 40, opacity: 0.3 }}>🔍</div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22, fontWeight: 700, color: '#0A0A0A',
        }}>
          {t('dashboard.strategy_not_found')}
        </div>
        <div style={{ fontSize: 13, color: '#7A6B72' }}>
          {t('dashboard.strategy_not_found_desc')}
        </div>
        <div
          onClick={() => navigate('/dashboard')}
          style={{
            marginTop: 8, padding: '10px 24px', borderRadius: 30,
            background: 'rgba(47,82,133,0.08)',
            border: '1px solid rgba(47,82,133,0.15)',
            fontSize: 13, color: '#2F5285', fontWeight: 600,
            fontFamily: "'DM Mono', monospace", cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(47,82,133,0.12)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(47,82,133,0.08)')}
        >
          {t('dashboard.back_to_dashboard')}
        </div>
      </div>
    )
  }

  const st = STATUS_STYLES[strategy.status]

  return (
    <>

      <div style={{
        padding: isCompact ? '12px 16px' : '16px 28px',
        borderBottom: '1px solid rgba(47,82,133,0.06)',
        background: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isCompact && (
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
          )}
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A' }}>
              {strategy.name}
            </div>
            <div style={{ fontSize: 11, color: '#7A6B72' }}>
              {strategy.pair} · {strategy.broker} · {strategy.conditionCount} {t('dashboard.conditions', 'conditions')}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <StatusBadge status={strategy.status} />
          <div
            style={{
              padding: '5px 14px', borderRadius: 8,
              background: 'rgba(47,82,133,0.06)',
              border: '1px solid rgba(47,82,133,0.12)',
              color: '#2F5285', fontSize: 11, fontWeight: 600,
              fontFamily: "'DM Mono', monospace", cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(47,82,133,0.10)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(47,82,133,0.06)')}
          >
            {t('dashboard.backtest', 'Backtest')}
          </div>
          <div
            style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'rgba(47,82,133,0.06)',
              border: '1px solid rgba(47,82,133,0.10)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(47,82,133,0.10)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(47,82,133,0.06)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A6B72" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
            </svg>
          </div>
        </div>
      </div>


      <div style={{
        flex: 1, overflowY: 'auto',
        padding: isCompact ? '20px 16px' : '28px 40px',
      }}>
        {messages.length === 0 && (
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            height: '100%', gap: 12,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'linear-gradient(135deg, #2F5285, #A8BDD0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>U</span>
            </div>
            <div style={{ fontSize: 14, color: '#7A6B72', textAlign: 'center', maxWidth: 360 }}>
              {t('dashboard.empty_chat', 'Start describing your strategy conditions for')} <strong style={{ color: '#0A0A0A' }}>{strategy.name}</strong>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={msg.id}
            style={{
              maxWidth: 600,
              marginBottom: 24,
              marginLeft: msg.sender === 'user' ? 'auto' : undefined,
              animation: 'fadeInUp 0.3s ease forwards',
              animationDelay: `${i * 0.05}s`,
              opacity: 0,
            }}
          >

            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: 8,
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            }}>
              {msg.sender === 'ai' && (
                <div style={{
                  width: 24, height: 24, borderRadius: 8,
                  background: 'linear-gradient(135deg, #2F5285, #A8BDD0)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>U</span>
                </div>
              )}
              {msg.sender === 'ai' && (
                <span style={{ fontSize: 12, fontWeight: 600, color: '#2F5285' }}>Delta</span>
              )}
              <span style={{ fontSize: 10, color: '#A8BDD0' }}>{msg.timestamp}</span>
              {msg.sender === 'user' && (
                <span style={{ fontSize: 12, fontWeight: 600, color: '#0A0A0A' }}>
                  {t('dashboard.you', 'You')}
                </span>
              )}
              {msg.sender === 'user' && (
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2F5285, #A8BDD0)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 10, fontWeight: 700,
                }}>
                  {(user.name || 'U').charAt(0).toUpperCase()}
                </div>
              )}
            </div>


            <div style={{
              background: msg.sender === 'user' ? 'rgba(47,82,133,0.08)' : '#fff',
              border: `1px solid ${msg.sender === 'user' ? 'rgba(47,82,133,0.12)' : 'rgba(47,82,133,0.08)'}`,
              borderRadius: 16, padding: '18px 22px',
              fontSize: 13, color: '#0A0A0A', lineHeight: 1.8,
            }}>
              {msg.text}
              {msg.codeBlock && <ConditionBlock code={msg.codeBlock} />}
              {msg.actions && (
                <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {msg.actions.map(action => (
                    <div
                      key={action.label}
                      style={{
                        padding: '6px 16px', borderRadius: 20, cursor: 'pointer',
                        fontSize: 11, fontWeight: 700,
                        fontFamily: "'DM Mono', monospace",
                        transition: 'all 0.15s',
                        ...(action.type === 'primary' ? {
                          background: 'rgba(108,168,24,0.12)',
                          border: '1px solid rgba(108,168,24,0.25)',
                          color: '#639922',
                        } : {
                          background: 'rgba(47,82,133,0.06)',
                          border: '1px solid rgba(47,82,133,0.12)',
                          color: '#2F5285',
                        }),
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.background = action.type === 'primary'
                          ? 'rgba(108,168,24,0.20)' : 'rgba(47,82,133,0.10)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.background = action.type === 'primary'
                          ? 'rgba(108,168,24,0.12)' : 'rgba(47,82,133,0.06)'
                      }}
                    >
                      {action.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>


      <div style={{
        padding: isCompact ? '12px 16px 16px' : '16px 28px 20px',
        borderTop: '1px solid rgba(47,82,133,0.06)',
        background: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <div style={{
            flex: 1, background: '#fff',
            border: '1px solid rgba(47,82,133,0.12)',
            borderRadius: 14, padding: '12px 16px',
            display: 'flex', alignItems: 'center',
          }}>
            <input
              type="text"
              placeholder={t('dashboard.input_placeholder', 'Describe your trading strategy...')}
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
              width: 42, height: 42, borderRadius: 12,
              background: input.trim() ? '#2F5285' : 'rgba(47,82,133,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, cursor: input.trim() ? 'pointer' : 'default',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              if (input.trim()) e.currentTarget.style.background = 'rgba(47,82,133,0.85)'
            }}
            onMouseLeave={e => {
              if (input.trim()) e.currentTarget.style.background = '#2F5285'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </div>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 16, marginTop: 10,
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

function StatusBadge({ status }: { status: Strategy['status'] }) {
  const [hovered, setHovered] = useState(false)
  const st = STATUS_STYLES[status]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '5px 14px', borderRadius: 8,
        background: st.bg,
        border: `1px solid ${st.color}40`,
        color: st.color, fontSize: 11, fontWeight: 700,
        fontFamily: "'DM Mono', monospace", cursor: 'pointer',
        transition: 'all 0.15s',
        transform: hovered ? 'translateY(-1px)' : 'none',
      }}
    >
      {st.label}
    </div>
  )
}