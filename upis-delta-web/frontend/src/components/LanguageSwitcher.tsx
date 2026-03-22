import { useState, useRef, useEffect } from 'react'
import { useTranslation } from '../../node_modules/react-i18next'

const LANGUAGES = [
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [openUp, setOpenUp] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[1]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleDropdown = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      const middle = window.innerHeight / 2

      setOpenUp(rect.top > middle)
    }
    setOpen(o => !o)
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={toggleDropdown}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'transparent',
          border: '1px solid #1e2530',
          borderRadius: 8, padding: '10px 24px',
          cursor: 'pointer', fontSize: 12, fontWeight: 600,
          color: '#5a6a7e', fontFamily: "'DM Mono', monospace",
          transition: 'all 0.15s',
        }}
      >
        <span>{current.label}</span>
        <span style={{ fontSize: 9, opacity: 0.5 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          ...(openUp
            ? { bottom: 'calc(100% + 8px)' }
            : { top: 'calc(100% + 8px)' }
          ),
          left: 0,
          width: 160,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(47,82,133,0.15)',
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(47,82,133,0.12)',
          overflow: 'hidden',
          zIndex: 200,
        }}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => { i18n.changeLanguage(lang.code); setOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', textAlign: 'left',
                padding: '9px 14px', border: 'none',
                background: i18n.language === lang.code ? 'rgba(47,82,133,0.08)' : 'transparent',
                cursor: 'pointer', fontSize: 12,
                color: i18n.language === lang.code ? '#496fa8' : '#0A0A0A',
                fontFamily: "'DM Mono', monospace",
                fontWeight: i18n.language === lang.code ? 700 : 400,
              }}
            >
              <span style={{ fontSize: 16 }}>{lang.flag}</span>
              <span>{lang.label}</span>
              {i18n.language === lang.code && (
                <span style={{ marginLeft: 'auto', fontSize: 10, color: '#2F5285' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}