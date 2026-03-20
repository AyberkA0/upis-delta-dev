import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useBreakpoint } from '../../hooks/useBreakpoint'

export default function Privacy() {
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
      title: 'Data We Collect',
      content: 'We collect account information (name, email address), usage data (platform interactions, feature usage patterns), and connected service credentials (broker API keys, exchange tokens) to provide and improve our services.',
    },
    {
      title: 'How We Use Your Data',
      content: 'Your data is used to operate the platform, authenticate your account, execute automated orders on your behalf, improve platform performance, and communicate service updates or critical alerts.',
    },
    {
      title: 'Data Sharing',
      content: 'Your data may be shared with third-party service providers and partners where necessary for platform functionality, analytics, and business operations. We do not sell your personal data to third parties for marketing purposes.',
    },
    {
      title: 'Aggregated Data',
      content: 'In certain cases, aggregated or anonymized data may be used or shared for commercial purposes, including market research, platform improvement, and business analytics. Such data cannot be used to identify you personally.',
    },
    {
      title: 'Your Consent',
      content: 'By using the platform, you consent to the data processing practices described in this policy. You may withdraw consent at any time by deleting your account, though this will terminate your access to the platform.',
    },
    {
      title: 'Data Security',
      content: 'We take reasonable technical and organizational measures to protect your data against unauthorized access, loss, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
    },
    {
      title: 'Data Retention',
      content: 'We retain your personal data for as long as your account is active or as needed to provide services. Upon account deletion, we will delete or anonymize your personal data within 30 days, unless retention is required by law.',
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, correct, or delete your personal data. You may also request a copy of your data or object to certain processing activities. To exercise these rights, contact us through the platform.',
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
          <span style={{ color: '#0A0A0A' }}>Privacy Policy</span>
        </div>

        {/* Header */}
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
            Privacy Policy
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
            We collect and process personal data such as account information, usage data, and connected service credentials to provide and improve our services. Your data may be shared with third-party service providers and partners where necessary for platform functionality, analytics, and business operations. In certain cases, aggregated or anonymized data may be used or shared for commercial purposes. By using the platform, you consent to such data processing practices. We take reasonable measures to protect your data, but cannot guarantee absolute security.
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
            { label: 'Cookie Policy',    href: '/cookies' },
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