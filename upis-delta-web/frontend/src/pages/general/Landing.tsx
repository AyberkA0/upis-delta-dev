import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../../node_modules/react-i18next'
import backgroundImg from '../../assets/background.jpg'
import Navbar from '../../components/Navbar'
import PriceCard from '../../components/PriceCard'
import Footer from '../../components/Footer'
import TickerStrip from '../../components/TickerStrip'
import { useBreakpoint } from '../../hooks/useBreakpoint'

export default function LandingPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isMobile, isTablet } = useBreakpoint()

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isLoggedIn = !!token

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=DM+Mono:wght@400;500;600&display=swap'
    document.head.appendChild(link)
  }, [])

  const [disclaimerAccepted, setDisclaimerAccepted] = useState(() => sessionStorage.getItem('disclaimer_accepted') === '1')

  const handleAcceptDisclaimer = () => {
    sessionStorage.setItem('disclaimer_accepted', '1')
    setDisclaimerAccepted(true)
  }

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const px = isMobile ? '20px' : isTablet ? '32px' : '40px'

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'DM Mono', monospace" }}>

      {!disclaimerAccepted && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(10,10,10,0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}>
          <div style={{
            background: '#fff',
            border: '1px solid rgba(47,82,133,0.12)',
            borderRadius: 16,
            padding: isMobile ? '28px 24px' : '36px 40px',
            maxWidth: 520, width: '100%',
            boxShadow: '0 24px 80px rgba(10,10,10,0.25)',
            textAlign: 'center',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(245,158,11,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: 24,
            }}>
              ⚠
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 20 : 24,
              fontWeight: 700, color: '#0A0A0A',
              marginBottom: 16,
            }}>
              Early Access Disclaimer
            </h2>
            <p style={{
              fontSize: 14, lineHeight: 1.7,
              color: '#555', marginBottom: 28,
              fontFamily: "'DM Mono', monospace",
            }}>
              This platform is not yet fully operational. Any accounts, strategies, API keys, and all other data you create may be deleted, modified, or reset at any time without prior notice. Use at your own risk.
            </p>
            <div
              onClick={handleAcceptDisclaimer}
              style={{
                display: 'inline-block',
                background: '#2F5285',
                color: '#fff',
                border: 'none',
                borderRadius: 30,
                padding: '12px 36px',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'DM Mono', monospace",
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a3554' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#2F5285' }}
            >
              I Understand
            </div>
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 7vw, 76px);
          font-weight: 800;
          line-height: 1.05;
          color: #FAFAFA;
          letter-spacing: 0.5px;
        }
        .hero-title em { font-style: italic; color: #93af58; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }

        .step-card {
          flex: 1;
          min-width: ${isMobile ? '100%' : '240px'};
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.7);
          box-shadow: 0 8px 32px rgba(47,82,133,0.07);
          border-radius: 20px;
          padding: ${isMobile ? '24px 20px' : '32px 28px'};
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(47,82,133,0.12);
        }

        .platform-grid {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }

        .price-grid {
          display: grid;
          grid-template-columns: ${isMobile ? '1fr' : 'repeat(2, 1fr)'};
          gap: 20px;
        }
      `}</style>

      <Navbar isLoggedIn={isLoggedIn} username={user.name || ''} onLogout={handleLogout} />

      <section style={{
        minHeight: '100vh', position: 'relative',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.05) 50%, rgba(10,10,10,0) 100%)',
          }} />
        </div>

        <div style={{
          position: 'relative', zIndex: 1,
          textAlign: 'center',
          padding: `0 ${isMobile ? '24px' : '40px'}`,
          maxWidth: 860,
          isolation: 'isolate',
        }}>
          <h1 className="hero-title fade-up delay-2" style={{ marginTop: 40 }}>
            {t('hero.title_1')}<br/>
            <em>{t('hero.title_2')}</em><br/>
            {t('hero.title_3')}
          </h1>

          <div
            onClick={() => navigate(isLoggedIn ? '/dashboard' : '/register')}
            className="fade-up delay-4"
            style={{
              marginTop: isMobile ? 48 : 80,
              display: 'inline-block',
              background: 'rgba(100, 112, 146, 0.5)',
              backdropFilter: 'blur(6px) saturate(100%)',
              WebkitBackdropFilter: 'blur(6px) saturate(100%)',
              border: '1px solid rgba(208, 232, 253, 0.5)',
              borderRadius: 30,
              padding: isMobile ? '12px 28px' : '14px 36px',
              fontSize: isMobile ? 15 : 18,
              letterSpacing: '0.05em',
              color: '#ffffff',
              fontWeight: 100,
              fontFamily: "'DM Mono', monospace",
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(100, 112, 146, 0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(100, 112, 146, 0.5)' }}
          >
            {isLoggedIn ? t('hero.cta_dashboard') : t('hero.cta_primary')}
          </div>
        </div>

        {!isMobile && (
          <div style={{
            position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            color: 'rgba(255,255,255,0.8)', fontSize: 12, letterSpacing: '0.15em',
            fontFamily: "'DM Mono', monospace",
            opacity: scrolled ? 0 : 1,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}>
            <span>{t('hero.scroll')}</span>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(255,255,255,1), transparent)' }} />
          </div>
        )}
      </section>

      <section style={{ padding: `${isMobile ? '64px' : '96px'} ${px}`, background: '#F4F6FA' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 36 : 56 }}>
            <div style={{
              display: 'inline-block', fontSize: 11, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#7A6B72',
              fontFamily: "'DM Mono', monospace", marginBottom: 12,
            }}>
              {t('how.badge')}
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 26 : 36,
              fontWeight: 700, color: '#0A0A0A', letterSpacing: -0.5,
            }}>
              {t('how.title')}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { num: '01', title: t('how.step1_title'), desc: t('how.step1_desc'), color: '#2F5285' },
              { num: '02', title: t('how.step2_title'), desc: t('how.step2_desc'), color: '#7A6B72' },
              { num: '03', title: t('how.step3_title'), desc: t('how.step3_desc'), color: '#88afd1' },
            ].map(step => (
              <div key={step.num} className="step-card">
                <div style={{
                  fontSize: 11, fontWeight: 700, color: step.color,
                  letterSpacing: '0.15em', fontFamily: "'DM Mono', monospace", marginBottom: 16,
                }}>
                  {step.num}
                </div>
                <div style={{
                  fontSize: isMobile ? 16 : 18, fontWeight: 700, color: '#0A0A0A',
                  fontFamily: "'Playfair Display', serif", marginBottom: 12,
                }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 13, color: '#7A6B72', lineHeight: 1.7, fontFamily: "'DM Mono', monospace" }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        padding: `${isMobile ? '48px' : '64px'} ${px}`,
        background: '#fff',
        borderTop: '1px solid rgba(47,82,133,0.06)',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 40 }}>
            <div style={{
              fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#7A6B72', fontFamily: "'DM Mono', monospace",
            }}>
              {t('platforms.title')}
            </div>
          </div>

          <div className="platform-grid">
            {[
              { name: 'Binance', ready: true,  color: '#F0B90B', bg: 'rgba(240,185,11,0.08)',  border: 'rgba(240,185,11,0.2)' },
              { name: 'OKX',     ready: true,  color: '#0A0A0A', bg: 'rgba(10,10,10,0.05)',    border: 'rgba(10,10,10,0.12)' },
              { name: 'IBKR',    ready: false, color: '#E31837', bg: 'rgba(227,24,55,0.06)',   border: 'rgba(227,24,55,0.15)' },
              { name: 'Alpaca',  ready: false, color: '#fffb00', bg: 'rgba(0,79,159,0.06)',    border: 'rgba(159, 141, 0, 0.15)' },
            ].map(platform => (
              <div key={platform.name} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: platform.bg,
                border: `1px solid ${platform.border}`,
                borderRadius: 12,
                padding: isMobile ? '10px 16px' : '12px 24px',
                transition: 'all 0.2s',
                cursor: 'default',
                width: isMobile ? '100%' : 'auto',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = `0 8px 24px ${platform.border}`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: platform.color, flexShrink: 0 }} />
                <span style={{
                  fontSize: 13, fontWeight: 700, color: '#0A0A0A',
                  fontFamily: "'DM Mono', monospace", letterSpacing: '0.03em',
                }}>
                  {platform.name}
                </span>
                <span style={{
                  fontSize: 10, color: '#7A6B72',
                  fontFamily: "'DM Mono', monospace",
                  background: 'rgba(122,107,114,0.1)',
                  padding: '2px 8px', borderRadius: 4,
                  marginLeft: 'auto',
                }}>
                  {platform.ready ? t('platforms.connected') : t('platforms.in_progress')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: `${isMobile ? '64px' : '96px'} ${px}`, background: '#FAFAFA' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 52 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#7A6B72', fontFamily: "'DM Mono', monospace", marginBottom: 12,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
              {t('markets.live')}
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 26 : 36,
              fontWeight: 700, color: '#0A0A0A', letterSpacing: -0.5,
            }}>
              {t('markets.subtitle')}
            </h2>
          </div>

          <div className="price-grid">
            <PriceCard title="Bitcoin"   subtitle="BTC / USDT"       price="83.421,50" change="2.34%" positive={true}  color="#2F5285" />
            <PriceCard title="BIST 100"  subtitle="XU100 / TRY"      price="9.842,30"  change="0.87%" positive={false} color="#7A6B72" />
            <PriceCard title="Apple"     subtitle="NASDAQ:AAPL / USD" price="1.455,80"  change="0.52%" positive={false} color="#656565" />
            <PriceCard title="Şişecam"   subtitle="BIST:SISE / TRY"  price="742,45"    change="2.21%" positive={true}  color="#b293a1" />
          </div>
        </div>
      </section>

      <TickerStrip />
      <Footer />
    </div>
  )
}