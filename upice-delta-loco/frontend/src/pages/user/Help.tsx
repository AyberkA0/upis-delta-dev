import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import LanguageSwitcher from '../../components/LanguageSwitcher'

export default function Help() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <div style={{ maxWidth: 800, margin: '60px auto', padding: 24 }}>
      Help.tsx
    </div>
  )
}
