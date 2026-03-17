import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

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
  const ref = useRef<HTMLDivElement>(null)

  const current = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[1]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'transparent',
          border: '1px solid #1e2530',
          borderRadius: 8, padding: '5px 12px',
          cursor: 'pointer', fontSize: 12, fontWeight: 600,
          color: '#5a6a7e', fontFamily: "'DM Mono', monospace",
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#2F5285'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#1e2530'}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span style={{ fontSize: 9, opacity: 0.5 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: 0,
          width: 160,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
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
                color: i18n.language === lang.code ? '#2F5285' : '#0A0A0A',
                fontFamily: "'DM Mono', monospace",
                fontWeight: i18n.language === lang.code ? 700 : 400,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => {
                if (i18n.language !== lang.code)
                  e.currentTarget.style.background = 'rgba(47,82,133,0.05)'
              }}
              onMouseLeave={e => {
                if (i18n.language !== lang.code)
                  e.currentTarget.style.background = 'transparent'
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