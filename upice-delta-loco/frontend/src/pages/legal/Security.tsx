import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useBreakpoint } from '../../hooks/useBreakpoint'

export default function Security() {
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
    title: 'Platform Security Measures',
    content: 'We implement a layered, defense-in-depth security architecture to protect user accounts and platform infrastructure. This includes encrypted data transmission (TLS), secure password storage using strong hashing algorithms (e.g., bcrypt), and token-based authentication with expiration and revocation mechanisms. Access to internal systems is restricted through role-based controls and the principle of least privilege. We continuously monitor systems, apply security patches, and conduct periodic reviews and audits to identify and mitigate potential vulnerabilities.',
  },
  {
    title: 'User Credential Responsibility',
    content: 'Users are solely responsible for maintaining the security of their credentials, including passwords, two-factor authentication codes, and API keys connected to third-party services. You must ensure that your devices, browsers, and environments are secure and free from malware. Never share your credentials with anyone, including platform staff. We will never request your password or sensitive authentication data.',
  },
  {
    title: 'API Key Security',
    content: 'You are responsible for securely configuring API keys connected to third-party services such as brokers and exchanges. API keys should be restricted to the minimum permissions required (e.g., read-only or trade-only). Withdrawal or transfer permissions should be disabled unless absolutely necessary. You must regularly review, rotate, and revoke API keys when no longer in use. Misconfigured or exposed API keys may result in unauthorized actions beyond our control.',
  },
  {
    title: 'Limitation of Liability',
    content: 'The platform is provided on an "as is" and "as available" basis without guarantees of uninterrupted or error-free operation. We are not liable for any unauthorized access, misuse, or financial losses resulting from compromised credentials, insecure configurations, phishing attacks, user-defined automation logic, or third-party service failures. By using the platform, you acknowledge and accept these risks.',
  },
  {
    title: 'Reporting Security Issues',
    content: 'If you discover a potential security vulnerability or suspect unauthorized access to your account, you must report it immediately through official communication channels. Responsible disclosure is required. You agree not to exploit, abuse, or publicly disclose vulnerabilities before we have had a reasonable opportunity to investigate and resolve the issue.',
  },
  {
    title: 'Account Monitoring',
    content: 'We monitor platform activity for suspicious behavior, anomalies, and potential security threats. This may include automated detection systems and manual review processes. In cases of suspected compromise or policy violations, we may temporarily restrict or suspend access to protect users and the platform. Notifications will be sent to your registered contact details when applicable.',
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
          <span style={{ color: '#0A0A0A' }}>Security Policy</span>
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
            Security Policy
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
          background: 'rgba(227,24,55,0.03)',
          border: '1px solid rgba(227,24,55,0.12)',
          borderLeft: '3px solid #E31837',
          borderRadius: '0 12px 12px 0',
          padding: '16px 20px',
          marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#E31837', marginBottom: 8, fontWeight: 600,
          }}>
            Important Notice
          </div>
          <p style={{
            fontSize: 13, color: '#5a6a7e', lineHeight: 1.7,
            fontFamily: "'DM Mono', monospace", margin: 0,
          }}>
            We implement industry-standard security measures to protect user accounts, data, and platform infrastructure. However, no system can be guaranteed to be completely secure. Users are solely responsible for maintaining the security of their credentials, including API keys connected to third-party services. You must ensure that API keys are configured with appropriate permissions and restrictions, and regularly monitor their usage. We are not liable for any unauthorized access, misuse, or losses resulting from compromised credentials, insecure configurations, or third-party integrations beyond our control. By using the platform, you acknowledge and accept these risks.
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
            { label: 'Cookie Policy',    href: '/cookies' },
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