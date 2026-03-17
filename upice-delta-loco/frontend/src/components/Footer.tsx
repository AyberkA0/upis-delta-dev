import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import logoSvg from '../assets/upisdelta.svg'

export default function Footer() {
  const { t, i18n } = useTranslation()

  const columns = [
    {
      title: t('footer.product'),
      links: [
        t('footer.markets'),
        t('footer.data_feeds'),
        t('footer.conditions'),
        t('footer.api'),
      ],
    },
    {
      title: t('footer.company'),
      links: [
        t('footer.about'),
        t('footer.blog'),
        t('footer.careers'),
        t('footer.press'),
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        t('footer.privacy'),
        t('footer.terms'),
        t('footer.cookies'),
        t('footer.security'),
      ],
    },
  ]

  return (
    <footer style={{ background: '#0A0A0A', color: '#FAFAFA', padding: '56px 40px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 40, marginBottom: 48,
        }}>
          <div style={{ maxWidth: 260 }}>
            <div style={{
                background: 'rgba(255,255,255, 1)',
                backdropFilter: 'blur(24px) saturate(200%)',
                WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 32px rgba(47,82,133,0.12)',

                width: "fit-content",
                height: "fit-content",
                inlineSize: "fit-content",
                blockSize: "fit-content",

                borderRadius: "16px",
            }}>
                <img src={logoSvg} height={28} style={{ 
                    display: 'block', 
                    margin: '10px 15px 7px 15px',
                }} />
            </div>
            <p style={{ marginTop: 16, fontSize: 12, color: '#7A6B72', lineHeight: 1.8, fontFamily: "'DM Mono', monospace" }}>
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
                  <a key={link} href="#" style={{
                    color: '#7A6B72', textDecoration: 'none', fontSize: 12,
                    fontFamily: "'DM Mono', monospace", transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#A8BDD0')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7A6B72')}
                  >
                    {link}
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
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontSize: 12, color: '#7A6B72', fontFamily: "'DM Mono', monospace" }}>
            © 2026 UPIS Fintech. {t('footer.rights')}
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['GitHub', 'Discord'].map(s => (
              <a key={s} href="#" style={{
                color: '#7A6B72', textDecoration: 'none', fontSize: 12,
                fontFamily: "'DM Mono', monospace", transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#A8BDD0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7A6B72')}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}