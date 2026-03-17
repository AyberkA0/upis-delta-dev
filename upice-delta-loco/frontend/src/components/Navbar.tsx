import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AccountDropdown from './AccountDropdown'
import logoSvg from '../assets/upisdelta.svg'

interface Props {
  isLoggedIn: boolean
  username: string
  onLogout: () => void
}

export default function Navbar({ isLoggedIn, username, onLogout }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { key: 'nav.markets',    label: t('nav.markets') },
    { key: 'nav.data',       label: t('nav.data') },
    { key: 'nav.conditions', label: t('nav.conditions') },
    { key: 'nav.community',  label: t('nav.community') },
  ]

  return (
    <nav style={{
      position: 'fixed',
      top: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)',
      maxWidth: 1100,
      zIndex: 50,
      padding: '0 24px',
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 16,
      transition: 'all 0.3s ease',
      ...(scrolled ? {
        background: 'rgba(255,255,255,0.80)',
        backdropFilter: 'blur(24px) saturate(200%)',
        WebkitBackdropFilter: 'blur(24px) saturate(200%)',
        border: '1px solid rgba(255,255,255,0.8)',
        boxShadow: '0 8px 32px rgba(47,82,133,0.12)',
      } : {
        background: 'rgba(255,255,255,1)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.4)',
        boxShadow: '0 4px 16px rgba(0,0,0,0)',
      }),
    }}>
      <div style={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => navigate('/')}>
        <img src={logoSvg} height={28} style={{ display: 'block', margin: "3px 0px 0px 0px" }} />
      </div>

      <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {navItems.map(item => (
          <a key={item.key} href="#" style={{
            color: scrolled ? '#0A0A0A' : 'rgb(80, 80, 80)',
            textDecoration: 'none',
            fontSize: 13,
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            letterSpacing: '0.04em',
            padding: '6px 14px',
            borderRadius: 8,
            transition: 'all 0.2s',
            border: '1px solid transparent',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = scrolled ? 'rgba(47,82,133,0.08)' : 'rgba(255,255,255,0.15)'
              e.currentTarget.style.borderColor = scrolled ? 'rgba(47,82,133,0.15)' : 'rgba(255,255,255,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'transparent'
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        {isLoggedIn ? (
          <AccountDropdown username={username} onLogout={onLogout} />
        ) : (
          <button
            onClick={() => navigate('/login')}
            style={{
              background: '#2F5285',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '8px 20px',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'DM Mono', monospace",
              cursor: 'pointer',
              letterSpacing: '0.04em',
              transition: 'all 0.2s',
              boxShadow: '0 2px 12px rgba(47,82,133,0.3)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#1e3d6b'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#2F5285'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {t('nav.sign_in')}
          </button>
        )}
      </div>
    </nav>
  )
}