import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface SidebarUserMenuProps {
  user: { name?: string; plan_code?: number }
  onLogout: () => void
}

export default function SidebarUserMenu({ user, onLogout }: SidebarUserMenuProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const initial = (user.name || 'U').charAt(0).toUpperCase()
  const planLabel = user.plan_code === 2
    ? t('dashboard.plan_enterprise')
    : user.plan_code === 1
      ? t('dashboard.plan_pro')
      : t('dashboard.plan_free')

  const links = [
    { label: t('nav.settings'), path: '/settings' },
    { label: t('nav.api_keys'), path: '/settings' },
    { label: t('nav.help'), path: '/help' },
  ]

  return (
    <div ref={menuRef} style={{ position: 'relative', padding: 16, borderTop: '1px solid rgba(47,82,133,0.06)' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          cursor: 'pointer', borderRadius: 10, padding: '6px 8px',
          margin: '-6px -8px',
          background: open ? 'rgba(47,82,133,0.06)' : 'transparent',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'rgba(47,82,133,0.04)' }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'transparent' }}
      >
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg, #2F5285, #A8BDD0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0,
        }}>
          {initial}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 12, color: '#0A0A0A', fontWeight: 600,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {user.name || 'User'}
          </div>
          <div style={{ fontSize: 10, color: '#A8BDD0' }}>{planLabel}</div>
        </div>
        <svg
          width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="#A8BDD0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {open && (
        <div style={{
          position: 'absolute', bottom: '100%', left: 8, right: 8,
          marginBottom: 6,
          background: '#fff',
          border: '1px solid rgba(47,82,133,0.10)',
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(47,82,133,0.12)',
          padding: '6px 0',
          animation: 'fadeIn 0.15s ease',
        }}>
          {links.map(link => (
            <div
              key={link.path + link.label}
              onClick={() => { navigate(link.path); setOpen(false) }}
              style={{
                padding: '9px 16px', fontSize: 12, color: '#0A0A0A',
                cursor: 'pointer', transition: 'background 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(47,82,133,0.04)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {link.label}
            </div>
          ))}
          <div style={{ height: 1, background: 'rgba(47,82,133,0.06)', margin: '4px 12px' }} />
          <div
            onClick={() => { onLogout(); setOpen(false) }}
            style={{
              padding: '9px 16px', fontSize: 12, color: '#dc2626',
              cursor: 'pointer', transition: 'background 0.1s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.04)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {t('nav.sign_out')}
          </div>
        </div>
      )}
    </div>
  )
}
