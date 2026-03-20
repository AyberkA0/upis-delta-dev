import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const glass = {
  background: 'rgba(255,255,255,0.8)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 8px 32px rgba(47,82,133,0.12)',
}

interface Props {
  username: string
  onLogout: () => void
}

export default function AccountDropdown({ username, onLogout }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const items = [
    { label: t('nav.dashboard'),  action: () => { navigate('/dashboard'); setOpen(false) } },
    { label: t('nav.settings'),   action: () => { navigate('/settings'); setOpen(false) }},
    { label: t('nav.help'),       action: () => { navigate('/help'); setOpen(false) } },
  ]

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(47,82,133,0.10)',
          border: '1px solid rgba(47,82,133,0.20)',
          borderRadius: 10, padding: '8px 16px',
          cursor: 'pointer', fontFamily: "'DM Mono', monospace",
          fontSize: 13, color: '#2F5285', fontWeight: 600,
        }}
      >
        <div style={{
          width: 24, height: 24, borderRadius: '50%',
          background: 'linear-gradient(135deg, #2F5285, #A8BDD0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 11, fontWeight: 700,
        }}>
          {username.charAt(0).toUpperCase()}
        </div>
        {username}
        <span style={{ fontSize: 10, opacity: 0.6 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          width: 200, ...glass, borderRadius: 14, overflow: 'hidden', zIndex: 100,
        }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(168,189,208,0.3)' }}>
            <div style={{ fontSize: 11, color: '#7A6B72', fontFamily: "'DM Mono', monospace", marginBottom: 2 }}>
              {t('nav.signed_in_as')}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0A0A0A' }}>
              {username}
            </div>
          </div>
          {items.map(item => (
            <button key={item.label} onClick={item.action} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '10px 16px', background: 'transparent', border: 'none',
              cursor: 'pointer', fontSize: 13, color: '#0A0A0A',
              fontFamily: "'DM Mono', monospace",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(47,82,133,0.07)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {item.label}
            </button>
          ))}
          <div style={{ borderTop: '1px solid rgba(168,189,208,0.3)' }}>
            <button onClick={onLogout} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '10px 16px', background: 'transparent', border: 'none',
              cursor: 'pointer', fontSize: 13, color: '#dc2626',
              fontFamily: "'DM Mono', monospace",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {t('nav.sign_out')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}