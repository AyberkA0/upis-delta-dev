import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../node_modules/react-i18next'
import AccountDropdown from './AccountDropdown'
import logoSvg from '../assets/upisdelta.svg'
import { useBreakpoint } from '../hooks/useBreakpoint'

interface Props {
  isLoggedIn: boolean
  username: string
  onLogout: () => void
}

export default function Navbar({ isLoggedIn, username, onLogout }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isMobile, isTablet } = useBreakpoint()
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [navigate])

  const navItems = [
    { key: 'nav.overview', label: t('nav.overview'), href: '/overview' },
    { key: 'nav.faqs',    label: t('nav.faqs'),    href: '/faqs' },
    { key: 'nav.blog',    label: t('nav.blog'),    href: '/blog' },
    { key: 'nav.roadmap', label: t('nav.roadmap'), href: '/roadmap' },
  ]

  const isCompact = isMobile || isTablet

  return (
    <div ref={navRef}>
      <nav style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: `calc(100% - ${isMobile ? '24px' : '48px'})`,
        maxWidth: 1100,
        zIndex: 50,
        padding: `0 ${isMobile ? '16px' : '24px'}`,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 16,
        transition: 'all 0.3s ease',
        ...(scrolled ? {
          background: 'rgba(255,255,255,0.70)',
          backdropFilter: 'blur(12px) saturate(200%)',
          WebkitBackdropFilter: 'blur(12px) saturate(200%)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 8px 32px rgba(47,82,133,0.12)',
        } : {
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.4)',
          boxShadow: 'none',
        }),
      }}>

        <div style={{ cursor: 'pointer', flexShrink: 0, zIndex: 1 }} onClick={() => navigate('/')}>
          <img src={logoSvg} height={isMobile ? 22 : 28} style={{ display: 'block', margin: '3px 0 0 0' }} />
        </div>

        {!isCompact && (
          <div style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 2, alignItems: 'center',
          }}>
            {navItems.map(item => (
              <a key={item.key} href={item.href} style={{
                color: scrolled ? '#0A0A0A' : 'rgb(80,80,80)',
                textDecoration: 'none', fontSize: 13,
                fontFamily: "'DM Mono', monospace", fontWeight: 500,
                letterSpacing: '0.04em', padding: '6px 14px',
                borderRadius: 8, transition: 'all 0.2s',
                border: '1px solid transparent',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(47,82,133,0.08)'
                  e.currentTarget.style.borderColor = scrolled ? 'rgba(47,82,133,0.15)' : 'rgba(119,119,119,0.2)'
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
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, zIndex: 1 }}>

          {!isCompact && (
            isLoggedIn ? (
              <AccountDropdown username={username} onLogout={onLogout} />
            ) : (
              <button
                onClick={() => navigate('/login')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  background: 'rgba(47,82,133,0.30)',
                  border: '1px solid rgba(47,82,133,0.20)',
                  borderRadius: 10,
                  backdropFilter: 'blur(6px) saturate(100%)',
                  WebkitBackdropFilter: 'blur(6px) saturate(100%)',
                  color: '#ffffff', padding: '8px 20px',
                  fontSize: 13, fontWeight: 600,
                  fontFamily: "'DM Mono', monospace",
                  cursor: 'pointer', letterSpacing: '0.04em', transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(47,82,133,0.20)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(47,82,133,0.30)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                {t('nav.sign_in')}
              </button>
            )
          )}

          {isCompact && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: scrolled ? 'rgba(47,82,133,0.08)' : 'rgba(255,255,255,0.2)',
                border: `1px solid ${scrolled ? 'rgba(47,82,133,0.15)' : 'rgba(255,255,255,0.3)'}`,
                borderRadius: 8, padding: '8px',
                cursor: 'pointer', display: 'flex',
                flexDirection: 'column', gap: 4,
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: 18, height: 2,
                background: scrolled ? '#0A0A0A' : '#2F5285',
                borderRadius: 2,
                transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
                transition: 'transform 0.2s',
              }} />
              <div style={{
                width: 18, height: 2,
                background: scrolled ? '#0A0A0A' : '#2F5285',
                borderRadius: 2,
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.2s',
              }} />
              <div style={{
                width: 18, height: 2,
                background: scrolled ? '#0A0A0A' : '#2F5285',
                borderRadius: 2,
                transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
                transition: 'transform 0.2s',
              }} />
            </button>
          )}
        </div>
      </nav>

      {isCompact && menuOpen && (
        <div style={{
          position: 'fixed',
          top: 80, left: '50%',
          transform: 'translateX(-50%)',
          width: `calc(100% - ${isMobile ? '24px' : '48px'})`,
          maxWidth: 1100,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(47,82,133,0.10)',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(47,82,133,0.12)',
          zIndex: 49,
          overflow: 'hidden',
        }}>

          {navItems.map((item, i) => (
            <a key={item.key} href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '14px 24px',
                color: '#0A0A0A', textDecoration: 'none',
                fontSize: 14, fontFamily: "'DM Mono', monospace", fontWeight: 500,
                borderBottom: i < navItems.length - 1 ? '1px solid rgba(47,82,133,0.06)' : 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(47,82,133,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {item.label}
            </a>
          ))}

          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid rgba(47,82,133,0.08)',
            background: 'rgba(47,82,133,0.02)',
          }}>
            {isLoggedIn ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{
                  fontSize: 12, color: '#7A6B72',
                  fontFamily: "'DM Mono', monospace", marginBottom: 4,
                }}>
                  {t('nav.signed_in_as')}{' '}
                  <strong style={{ color: '#0A0A0A' }}>{username}</strong>
                </div>
                <button
                  onClick={() => { navigate('/dashboard'); setMenuOpen(false) }}
                  style={{
                    background: 'rgba(47,82,133,0.08)',
                    border: '1px solid rgba(47,82,133,0.15)',
                    borderRadius: 10, padding: '10px 16px',
                    cursor: 'pointer', fontSize: 13,
                    color: '#2F5285', fontFamily: "'DM Mono', monospace",
                    fontWeight: 600, textAlign: 'left', width: '100%',
                  }}
                >
                  {t('nav.dashboard')}
                </button>
                <button
                  onClick={() => { navigate('/settings'); setMenuOpen(false) }}
                  style={{
                    background: 'rgba(47,82,133,0.08)',
                    border: '1px solid rgba(47,82,133,0.15)',
                    borderRadius: 10, padding: '10px 16px',
                    cursor: 'pointer', fontSize: 13,
                    color: '#2F5285', fontFamily: "'DM Mono', monospace",
                    fontWeight: 600, textAlign: 'left', width: '100%',
                  }}
                >
                  {t('nav.settings')}
                </button>
                <button
                  onClick={() => { navigate('/help'); setMenuOpen(false) }}
                  style={{
                    background: 'rgba(47,82,133,0.08)',
                    border: '1px solid rgba(47,82,133,0.15)',
                    borderRadius: 10, padding: '10px 16px',
                    cursor: 'pointer', fontSize: 13,
                    color: '#2F5285', fontFamily: "'DM Mono', monospace",
                    fontWeight: 600, textAlign: 'left', width: '100%',
                  }}
                >
                  {t('nav.help')}
                </button>
                <button
                  onClick={() => { onLogout(); setMenuOpen(false) }}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: 10, padding: '10px 16px',
                    cursor: 'pointer', fontSize: 13,
                    color: '#dc2626', fontFamily: "'DM Mono', monospace",
                    fontWeight: 600, textAlign: 'left', width: '100%',
                  }}
                >
                  {t('nav.sign_out')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => { navigate('/login'); setMenuOpen(false) }}
                style={{
                  width: '100%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: 'rgba(47,82,133,0.30)',
                  border: '1px solid rgba(47,82,133,0.20)',
                  borderRadius: 10, padding: '12px 20px',
                  cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  fontFamily: "'DM Mono', monospace", color: '#ffffff',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                {t('nav.sign_in')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}