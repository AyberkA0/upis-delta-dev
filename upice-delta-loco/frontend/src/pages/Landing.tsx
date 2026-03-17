import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import PriceCard from '../components/PriceCard'
import Footer from '../components/Footer'
import backgroundImg from '../assets/background.jpg'

export default function LandingPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const authToken = sessionStorage.getItem('authToken')
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}')
  const isLoggedIn = !!authToken

  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=DM+Mono:wght@400;500;600&display=swap'
    document.head.appendChild(link)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: "'DM Mono', monospace" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(38px, 5.5vw, 76px);
          font-weight: 800;
          line-height: 1.08;
          color: #FAFAFA;
          letter-spacing: -1.5px;
        }
        .hero-title em { font-style: italic; color: #A8BDD0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }
        .step-card {
          flex: 1; min-width: 240px;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.7);
          box-shadow: 0 8px 32px rgba(47,82,133,0.07);
          border-radius: 20px;
          padding: 32px 28px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(47,82,133,0.12);
        }
      `}</style>

      <Navbar isLoggedIn={isLoggedIn} username={userData.name || ''} onLogout={handleLogout} />

      <section style={{
        minHeight: '100vh', position: 'relative',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
      }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }} />
          {/* Dark overlay */}
          {/* <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.25) 50%, rgba(10,10,10,0.55) 100%)',
            }} /> */}
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: 860 }}>
          <div className="fade-up delay-1" style={{
            display: 'inline-block',
            background: 'rgba(203, 216, 228, 0.62)',
            border: '1px solid rgba(168,189,208,0.35)',
            borderRadius: 20, padding: '5px 18px',
            fontSize: 11, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#4f4f4f', marginBottom: 32,
          }}>
            {t('hero.badge')}
          </div>

          <h1 className="hero-title fade-up delay-2">
            {t('hero.title_1')}<br/>
            <em>{t('hero.title_2')}</em><br/>
            {t('hero.title_3')}
          </h1>

          <div className="fade-up delay-4" style={{
            marginTop: 44, display: 'flex', gap: 12,
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {isLoggedIn ? (
              <button onClick={() => navigate('/dashboard')} style={{
                background: '#727881ac', color: '#0A0A0A', border: '1px solid rgba(122, 140, 167, 0.2)',
                borderRadius: 12, padding: '14px 36px',
                fontSize: 14, fontWeight: 700,
                fontFamily: "'DM Mono', monospace", cursor: 'pointer',
                letterSpacing: '0.05em',
                boxShadow: '0 4px 24px rgba(168,189,208,0.4)',
                transition: 'all 0.2s',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {t('hero.cta_dashboard')}
              </button>
            ) : (
              <>
                 <button onClick={() => navigate('/register')} style={{
                background: '#2F5285',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '14px 36px',
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "'DM Mono', monospace",
                cursor: 'pointer',
                letterSpacing: '0.05em',
                boxShadow: '0 4px 24px rgba(47,82,133,0.4)',
                transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.background = '#1e3d6b'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(47,82,133,0.5)'
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.background = '#2F5285'
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(47,82,133,0.4)'
                }}
                >
                {t('hero.cta_primary')}
                </button>
              </>
            )}
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          color: 'rgba(255, 255, 255, 0.8)', fontSize: 10, letterSpacing: '0.15em',
          fontFamily: "'DM Mono', monospace",
        }}>
          <span>{t('hero.scroll')}</span>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), transparent)' }} />
        </div>
      </section>

      <section style={{ padding: '96px 40px', background: '#F4F6FA' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{
              display: 'inline-block', fontSize: 11, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#7A6B72',
              fontFamily: "'DM Mono', monospace", marginBottom: 12,
            }}>
              {t('how.badge')}
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 36, fontWeight: 700, color: '#0A0A0A', letterSpacing: -0.5,
            }}>
              {t('how.title')}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { num: '01', title: t('how.step1_title'), desc: t('how.step1_desc'), color: '#2F5285' },
              { num: '02', title: t('how.step2_title'), desc: t('how.step2_desc'), color: '#7A6B72' },
              { num: '03', title: t('how.step3_title'), desc: t('how.step3_desc'), color: '#A8BDD0' },
            ].map(step => (
              <div key={step.num} className="step-card">
                <div style={{
                  fontSize: 11, fontWeight: 700, color: step.color,
                  letterSpacing: '0.15em', fontFamily: "'DM Mono', monospace",
                  marginBottom: 16,
                }}>
                  {step.num}
                </div>
                <div style={{
                  fontSize: 18, fontWeight: 700, color: '#0A0A0A',
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

      <section style={{ padding: '96px 40px', background: '#FAFAFA' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
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
              fontSize: 36, fontWeight: 700, color: '#0A0A0A', letterSpacing: -0.5,
            }}>
              {t('markets.subtitle')}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <PriceCard
              title="Bitcoin"
              subtitle="BTC / USD"
              price="$83,421.50"
              change="2.34%"
              positive={true}
              color="#2F5285"
            />
            <PriceCard
              title="BIST 100"
              subtitle="XU100 / TRY"
              price="₺9,842.30"
              change="0.87%"
              positive={false}
              color="#7A6B72"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}