import { useTranslation } from '../../node_modules/react-i18next'
import { useNavigate } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import logoSvg from '../assets/upisdelta.svg'
import { useBreakpoint } from '../hooks/useBreakpoint'

export default function Footer() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isMobile, isTablet } = useBreakpoint()
  const px = isMobile ? '20px' : isTablet ? '32px' : '40px'

  const columns = [
    {
      title: t('footer.links'),
      links: [
        { label: t('footer.overview'),  href: '/overview' },
        { label: t('footer.blog'),     href: '/blog' },
        { label: t('footer.faqs'),     href: '/faqs' },
        { label: t('footer.roadmap'),  href: '/roadmap' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.privacy'),  href: '/privacy' },
        { label: t('footer.terms'),    href: '/terms' },
        { label: t('footer.cookies'),  href: '/cookies' },
        { label: t('footer.security'), href: '/security' },
      ],
    },
  ]

  return (
    <footer style={{
      background: '#0A0A0A', color: '#FAFAFA',
      padding: `56px ${px} 32px`,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : isTablet
            ? '1fr 1fr'
            : '2fr 1fr 1fr 1fr',
          gap: isMobile ? 32 : 40,
          marginBottom: 48,
        }}>

          <div>
            <div style={{
              background: 'rgba(255,255,255,1)',
              backdropFilter: 'blur(24px) saturate(200%)',
              WebkitBackdropFilter: 'blur(24px) saturate(200%)',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 8px 32px rgba(47,82,133,0.12)',
              width: 'fit-content',
              borderRadius: 16,
              cursor: 'pointer',
            }} onClick={() => navigate('/')}>
              <img src={logoSvg} height={28} style={{
                display: 'block',
                margin: '15px 22px 12px 22px',
              }} />
            </div>
            <p style={{
              marginTop: 16, fontSize: 12, color: '#7A6B72',
              lineHeight: 1.8, fontFamily: "'DM Mono', monospace",
              maxWidth: 240,
            }}>
              {t('footer.tagline')}
            </p>
          </div>

          {columns.map(col => (
            <div key={col.title}>
              <div style={{
                fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#A8BDD0', marginBottom: 16, fontWeight: 600,
                fontFamily: "'DM Mono', monospace",
              }}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={e => { e.preventDefault(); navigate(link.href) }}
                    style={{
                      color: '#7A6B72', textDecoration: 'none', fontSize: 12,
                      fontFamily: "'DM Mono', monospace", transition: 'color 0.2s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#A8BDD0')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7A6B72')}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div>
            <div style={{
              fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#A8BDD0', marginBottom: 16, fontWeight: 600,
              fontFamily: "'DM Mono', monospace",
            }}>
              {t('footer.language')}
            </div>
            <LanguageSwitcher />
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(168,189,208,0.1)',
          paddingTop: 24,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: 12,
        }}>
          <span style={{
            fontSize: 12, color: '#7A6B72',
            fontFamily: "'DM Mono', monospace",
          }}>
            © 2026 Upis Fintech. {t('footer.rights')}
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'GitHub',  href: 'https://github.com/AyberkA0/upis-delta-dev' },
              { label: 'Discord', href: 'https://discord.gg/CEYY3GFx7C' },
            ].map(s => (
              <a key={s.label} href={s.href}
                target="_blank" rel="noreferrer"
                style={{
                  color: '#7A6B72', textDecoration: 'none', fontSize: 12,
                  fontFamily: "'DM Mono', monospace", transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#A8BDD0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7A6B72')}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}