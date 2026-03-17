import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Dashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}')

  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/login')
  }

  return (
    <div style={{ maxWidth: 800, margin: '60px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{t('dashboard.title')}</h1>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <LanguageSwitcher />
          <button
            onClick={handleLogout}
            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #333', color: '#fff', borderRadius: 4, cursor: 'pointer' }}
          >
            {t('dashboard.logout')}
          </button>
        </div>
      </div>
      <p style={{ marginTop: 16, color: '#5a6a7e' }}>
        {t('dashboard.welcome')},{' '}
        <span style={{ color: '#00d4a8' }}>{userData.name}</span>
      </p>
    </div>
  )
}