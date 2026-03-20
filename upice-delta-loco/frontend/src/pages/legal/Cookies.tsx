import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useBreakpoint } from '../../hooks/useBreakpoint'

export default function Cookies() {
  const navigate = useNavigate()
  const { isMobile } = useBreakpoint()

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isLoggedIn = !!token

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const sections = [
    {
      title: 'What Are Cookies',
      content: 'Cookies are small text files stored on your device when you visit a website. They help the platform remember your preferences, keep you logged in, and understand how you use the service.',
    },
    {
      title: 'Essential Cookies',
      content: 'Some cookies are strictly necessary for the operation of the service. These include authentication tokens, session identifiers, and security cookies. You cannot opt out of these cookies as they are required for the platform to function.',
    },
    {
      title: 'Analytics Cookies',
      content: 'We use analytics cookies to understand how users interact with the platform — which features are used most, where users encounter issues, and how the overall experience can be improved. This data is aggregated and anonymized.',
    },
    {
      title: 'Marketing Cookies',
      content: 'Marketing cookies may be used to deliver relevant content and measure the effectiveness of our communications. These cookies track your interactions across sessions and may be shared with trusted third-party partners.',
    },
    {
      title: 'Your Consent',
      content: 'By continuing to use the platform, you agree to the use of cookies as described in this policy. Where required by law, we will request your explicit consent before placing non-essential cookies on your device.',
    },
    {
      title: 'Managing Cookies',
      content: 'You can manage or disable cookies through your browser settings at any time. Please note that disabling certain cookies may affect platform functionality, including the ability to stay logged in or access certain features.',
    },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6FA', fontFamily: "'DM Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
      `}</style>

      <Navbar isLoggedIn={isLoggedIn} username={user.name || ''} onLogout={handleLogout} />

      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: `120px ${isMobile ? '20px' : '40px'} 80px`,
      }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 12, color: '#7A6B72',
          fontFamily: "'DM Mono', monospace",
          marginBottom: 40,
        }}>
          <span
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#2F5285'}
            onMouseLeave={e => e.currentTarget.style.color = '#7A6B72'}
          >
            Home
          </span>
          <span style={{ color: '#A8BDD0' }}>›</span>
          <span style={{ color: '#7A6B72' }}>Legal</span>
          <span style={{ color: '#A8BDD0' }}>›</span>
          <span style={{ color: '#0A0A0A' }}>Cookie Policy</span>
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid rgba(47,82,133,0.08)',
          borderRadius: 20,
          padding: isMobile ? '28px 24px' : '40px 48px',
          marginBottom: 24,
          boxShadow: '0 4px 24px rgba(47,82,133,0.06)',
        }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#7A6B72', marginBottom: 12,
          }}>
            Legal
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 28 : 36,
            fontWeight: 700, color: '#0A0A0A',
            letterSpacing: -0.5, marginBottom: 16,
          }}>
            Cookie Policy
          </h1>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 12, color: '#7A6B72', fontFamily: "'DM Mono', monospace" }}>
              Last updated: March 2026
            </span>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#A8BDD0' }} />
            <span style={{ fontSize: 12, color: '#7A6B72', fontFamily: "'DM Mono', monospace" }}>
              Applies to all platform users
            </span>
          </div>
        </div>

        <div style={{
          background: 'rgba(47,82,133,0.04)',
          border: '1px solid rgba(47,82,133,0.12)',
          borderLeft: '3px solid #2F5285',
          borderRadius: '0 12px 12px 0',
          padding: '16px 20px',
          marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#2F5285', marginBottom: 8, fontWeight: 600,
          }}>
            Summary
          </div>
          <p style={{
            fontSize: 13, color: '#5a6a7e', lineHeight: 1.7,
            fontFamily: "'DM Mono', monospace", margin: 0,
          }}>
            We use cookies and similar technologies to enhance user experience, analyze traffic, and personalize content. By continuing to use the platform, you agree to the use of cookies. Some cookies are essential for the operation of the service, while others are used for analytics and marketing purposes. You can manage or disable cookies through your browser settings, but this may affect functionality.
          </p>
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid rgba(47,82,133,0.08)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(47,82,133,0.06)',
        }}>
          {sections.map((section, i) => (
            <div key={section.title} style={{
              padding: isMobile ? '24px 24px' : '28px 48px',
              borderBottom: i < sections.length - 1
                ? '1px solid rgba(47,82,133,0.06)'
                : 'none',
            }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: '#A8BDD0',
                  letterSpacing: '0.1em', fontFamily: "'DM Mono', monospace",
                  marginTop: 4, flexShrink: 0, minWidth: 24,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isMobile ? 16 : 18,
                    fontWeight: 700, color: '#0A0A0A',
                    marginBottom: 10, letterSpacing: -0.2,
                  }}>
                    {section.title}
                  </h2>
                  <p style={{
                    fontSize: 13, color: '#5a6a7e',
                    lineHeight: 1.8, margin: 0,
                    fontFamily: "'DM Mono', monospace",
                  }}>
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Privacy Policy',   href: '/privacy' },
            { label: 'Security',         href: '/security' },
          ].map(link => (
            <div
              key={link.href}
              onClick={() => navigate(link.href)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 12, color: '#2F5285',
                fontFamily: "'DM Mono', monospace",
                cursor: 'pointer', padding: '8px 16px',
                background: 'rgba(47,82,133,0.06)',
                border: '1px solid rgba(47,82,133,0.12)',
                borderRadius: 8, transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(47,82,133,0.12)'
                e.currentTarget.style.borderColor = 'rgba(47,82,133,0.25)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(47,82,133,0.06)'
                e.currentTarget.style.borderColor = 'rgba(47,82,133,0.12)'
              }}
            >
              {link.label} →
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  )
}