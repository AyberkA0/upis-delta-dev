import { useTranslation } from '../../../node_modules/react-i18next'
import { useNavigate } from 'react-router-dom'
import LanguageSwitcher from '../../components/LanguageSwitcher'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useBreakpoint } from '../../hooks/useBreakpoint'

export default function Overview() {
  const { t } = useTranslation()
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

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6FA', fontFamily: "'DM Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        .post-card {
          background: #fff;
          border: 1px solid rgba(47,82,133,0.08);
          border-radius: 16px;
          padding: ${isMobile ? '24px 20px' : '32px 36px'};
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 24px rgba(47,82,133,0.04);
        }
        .post-card:hover {
          border-color: rgba(47,82,133,0.2);
          box-shadow: 0 8px 32px rgba(47,82,133,0.10);
          transform: translateY(-2px);
        }
      `}</style>
      
      <Navbar isLoggedIn={isLoggedIn} username={user.name || ''} onLogout={handleLogout} />
      
      <div style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: `120px ${isMobile ? '20px' : '40px'} 80px`,
      }}>

      <div style={{ height: "250px" }} />
      Overview.tsx
      <div style={{ height: "250px" }} />

      </div>

      <Footer />
    </div>
  )
}
