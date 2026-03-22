import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../../node_modules/react-i18next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useBreakpoint } from '../../hooks/useBreakpoint'

interface ApiKey {
  id: string
  broker: string
  apiKey: string
  isActive: boolean
  createdAt: string
}

// TODO
const MOCK_API_KEYS: ApiKey[] = [
  { id: '1', broker: 'Binance',   apiKey: 'aBcD••••••••efGh', isActive: true,  createdAt: '2025-12-10' },
  { id: '2', broker: 'OKX',       apiKey: 'xYzW••••••••qRsT', isActive: true,  createdAt: '2026-01-05' },
  { id: '3', broker: 'Alpaca', apiKey: 'mNkL••••••••pQrS', isActive: false, createdAt: '2026-02-18' },
  { id: '4', broker: 'Interactive Brokers', apiKey: 'mNkL••••••••pQrS', isActive: false, createdAt: '2026-02-18' },
]

const BROKERS = ['Binance', 'OKX', 'Interactive Brokers', 'Alpaca']

export default function Settings() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isMobile, isTablet } = useBreakpoint()

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isLoggedIn = !!token

  const [name, setName]   = useState(user.name || '')
  const [email]           = useState(user.email || '')
  const [phone, setPhone] = useState(user.phone_number || '')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword]         = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPw, setShowCurrentPw]     = useState(false)
  const [showNewPw, setShowNewPw]             = useState(false)

  const [apiKeys, setApiKeys]           = useState<ApiKey[]>(MOCK_API_KEYS)
  const [showAddKey, setShowAddKey]     = useState(false)
  const [newBroker, setNewBroker]       = useState(BROKERS[0])
  const [newApiKey, setNewApiKey]       = useState('')
  const [newApiSecret, setNewApiSecret] = useState('')

  const [activeSection, setActiveSection] = useState('profile')
  const [saving, setSaving]               = useState(false)
  const [success, setSuccess]             = useState('')
  const [error, setError]                 = useState('')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) setActiveSection(hash)
  }, [])

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash) setActiveSection(hash)
    }

    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const showFeedback = (msg: string, isError = false) => {
    if (isError) { setError(msg); setSuccess('') }
    else { setSuccess(msg); setError('') }
    setTimeout(() => { setSuccess(''); setError('') }, 4000)
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    // TODO
    await new Promise(r => setTimeout(r, 800))
    const updated = { ...user, name, phone_number: phone }
    localStorage.setItem('user', JSON.stringify(updated))
    showFeedback(t('settings.profile_updated'))
    setSaving(false)
  }

  const handleChangePassword = async () => {
    if (newPassword.length < 8) { showFeedback(t('settings.password_min_length'), true); return }
    if (!/[A-Z]/.test(newPassword)) { showFeedback(t('settings.password_uppercase'), true); return }
    if (!/[0-9]/.test(newPassword)) { showFeedback(t('settings.password_number'), true); return }
    if (!/[^a-zA-Z0-9]/.test(newPassword)) { showFeedback(t('settings.password_special'), true); return }
    if (newPassword !== confirmPassword) { showFeedback(t('settings.passwords_not_match'), true); return }

    setSaving(true)
    // TODO
    await new Promise(r => setTimeout(r, 800))
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('')
    showFeedback(t('settings.password_changed'))
    setSaving(false)
  }

  const handleAddApiKey = async () => {
    if (!newApiKey.trim() || !newApiSecret.trim()) { showFeedback(t('settings.api_key_required'), true); return }

    setSaving(true)
    // TODO
    await new Promise(r => setTimeout(r, 800))
    const key: ApiKey = {
      id: `${Date.now()}`,
      broker: newBroker,
      apiKey: newApiKey.slice(0, 4) + '••••••••' + newApiKey.slice(-4),
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
    }
    setApiKeys(prev => [...prev, key])
    setNewApiKey(''); setNewApiSecret(''); setShowAddKey(false)
    showFeedback(t('settings.api_key_added'))
    setSaving(false)
  }

  const handleToggleKey = (id: string) => {
    setApiKeys(prev => prev.map(k => k.id === id ? { ...k, isActive: !k.isActive } : k))
  }

  const handleDeleteKey = (id: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id))
    showFeedback(t('settings.api_key_removed'))
  }

  const isCompact = isMobile || isTablet
  const px = isMobile ? '20px' : '40px'

  const sections = [
    { key: 'profile',  label: t('settings.profile', 'Profile'),          icon: '👤' },
    { key: 'password', label: t('settings.password', 'Password'),        icon: '🔒' },
    { key: 'apikeys',  label: t('settings.api_keys', 'API Keys'),        icon: '🔑' },
    { key: 'prefs',    label: t('settings.preferences', 'Preferences'),  icon: '⚙️' },
    { key: 'danger',   label: t('settings.danger_zone', 'Danger Zone'),  icon: '⚠️' },
  ]

  const strengthChecks = [
    { label: t('settings.strength_length'),    ok: newPassword.length >= 8 },
    { label: t('settings.strength_uppercase'), ok: /[A-Z]/.test(newPassword) },
    { label: t('settings.strength_number'),    ok: /[0-9]/.test(newPassword) },
    { label: t('settings.strength_special'),   ok: /[^a-zA-Z0-9]/.test(newPassword) },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6FA', fontFamily: "'DM Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        .st-input {
          width: 100%;
          background: #fff;
          border: 1px solid rgba(47,82,133,0.15);
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 13px;
          font-family: 'DM Mono', monospace;
          color: #0A0A0A;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .st-input:focus {
          border-color: rgba(47,82,133,0.4);
          box-shadow: 0 0 0 3px rgba(47,82,133,0.06);
        }
        .st-input::placeholder { color: #A8BDD0; }
        .st-input:disabled {
          background: rgba(47,82,133,0.03);
          color: #7A6B72;
          cursor: not-allowed;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Navbar isLoggedIn={isLoggedIn} username={user.name || ''} onLogout={handleLogout} />

      <div style={{
        maxWidth: 900, margin: '0 auto',
        padding: `120px ${px} 80px`,
      }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 12, color: '#7A6B72', marginBottom: 32,
        }}>
          <span style={{ color: 'rgb(122, 107, 114)' }}>{t('breadcrumb.user')}</span>
          <span style={{ color: '#A8BDD0' }}>›</span>
          <span style={{ color: '#0A0A0A' }}>{t('settings.title', 'Settings')}</span>
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid rgba(47,82,133,0.08)',
          borderRadius: 20, padding: isMobile ? '28px 24px' : '40px 48px',
          marginBottom: 24,
          boxShadow: '0 4px 24px rgba(47,82,133,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2F5285, #A8BDD0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 22, fontWeight: 700,
              flexShrink: 0,
            }}>
              {(user.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? 24 : 30, fontWeight: 700,
                color: '#0A0A0A', letterSpacing: -0.5, margin: 0,
              }}>
                {t('settings.title', 'Settings')}
              </h1>
              <div style={{ fontSize: 12, color: '#7A6B72', marginTop: 4 }}>
                {email} · {user.plan_code === 2 ? t('settings.plan_enterprise_label') : user.plan_code === 1 ? t('settings.plan_pro_label') : t('settings.plan_free_label')} {t('settings.plan_suffix')}
              </div>
            </div>
          </div>
        </div>

        {(success || error) && (
          <div style={{
            background: success ? 'rgba(22,163,74,0.06)' : 'rgba(239,68,68,0.06)',
            border: `1px solid ${success ? 'rgba(22,163,74,0.2)' : 'rgba(239,68,68,0.2)'}`,
            borderRadius: 12, padding: '12px 18px', marginBottom: 20,
            fontSize: 13, color: success ? '#16a34a' : '#dc2626',
            animation: 'fadeIn 0.2s ease',
          }}>
            {success || error}
          </div>
        )}

        <div style={{
          display: isCompact ? 'flex' : 'grid',
          gridTemplateColumns: '200px 1fr',
          flexDirection: isCompact ? 'column' : undefined,
          gap: 20,
        }}>

          <div style={{
            display: 'flex',
            flexDirection: isCompact ? 'row' : 'column',
            gap: isCompact ? 6 : 4,
            overflowX: isCompact ? 'auto' : undefined,
            paddingBottom: isCompact ? 4 : 0,
          }}>
            {sections.map(s => (
              <div
                key={s.key}
                onClick={() => {
                  setActiveSection(s.key)
                  window.location.hash = s.key
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: isCompact ? '8px 14px' : '10px 14px',
                  borderRadius: 10, cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: activeSection === s.key ? 'rgba(47,82,133,0.10)' : 'transparent',
                  border: `1px solid ${activeSection === s.key ? 'rgba(47,82,133,0.20)' : 'transparent'}`,
                  fontSize: 13, fontWeight: activeSection === s.key ? 600 : 400,
                  color: activeSection === s.key ? '#2F5285' : '#7A6B72',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  if (activeSection !== s.key) e.currentTarget.style.background = 'rgba(47,82,133,0.04)'
                }}
                onMouseLeave={e => {
                  if (activeSection !== s.key) e.currentTarget.style.background = 'transparent'
                }}
              >
                <span style={{ fontSize: 15 }}>{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(47,82,133,0.08)',
            borderRadius: 20,
            padding: isMobile ? '24px 20px' : '32px 40px',
            boxShadow: '0 4px 24px rgba(47,82,133,0.06)',
            animation: 'fadeIn 0.2s ease',
          }}>

            {activeSection === 'profile' && (
              <div>
                <SectionHeader title={t('settings.profile')} subtitle={t('settings.profile_subtitle')} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <FieldGroup label={t('settings.display_name')}>
                    <input className="st-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('settings.name_placeholder')} />
                  </FieldGroup>

                  <FieldGroup label={t('settings.email_address')}>
                    <input className="st-input" type="email" value={email} disabled />
                    <div style={{ fontSize: 11, color: '#A8BDD0', marginTop: 4 }}>
                      {t('settings.email_cannot_change')}
                    </div>
                  </FieldGroup>

                  <FieldGroup label={t('settings.phone_number')}>
                    <input className="st-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+90 5XX XXX XX XX" />
                  </FieldGroup>

                  <FieldGroup label={t('settings.account_plan')}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px', borderRadius: 10,
                      background: 'rgba(47,82,133,0.03)',
                      border: '1px solid rgba(47,82,133,0.08)',
                    }}>
                      <div style={{
                        padding: '4px 12px', borderRadius: 20,
                        background: user.plan_code >= 1 ? 'rgba(47,82,133,0.12)' : 'rgba(168,189,208,0.20)',
                        color: user.plan_code >= 1 ? '#2F5285' : '#7A6B72',
                        fontSize: 11, fontWeight: 700,
                      }}>
                        {user.plan_code === 2 ? t('settings.plan_enterprise') : user.plan_code === 1 ? t('settings.plan_pro') : t('settings.plan_free')}
                      </div>
                      <span style={{ fontSize: 12, color: '#7A6B72' }}>
                        {user.plan_code === 0 ? t('settings.upgrade_for_more') : t('settings.active_subscription')}
                      </span>
                      {user.plan_code === 0 && (
                        <span
                          style={{
                            marginLeft: 'auto', fontSize: 12, color: '#2F5285',
                            cursor: 'pointer', fontWeight: 600, textDecoration: 'underline',
                          }}
                        >
                          {t('settings.upgrade')}
                        </span>
                      )}
                    </div>
                  </FieldGroup>

                  <SaveButton loading={saving} onClick={handleSaveProfile} label={t('settings.save_changes')} />
                </div>
              </div>
            )}

            {activeSection === 'password' && (
              <div>
                <SectionHeader title={t('settings.password')} subtitle={t('settings.password_subtitle')} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <FieldGroup label={t('settings.current_password')}>
                    <div style={{ position: 'relative' }}>
                      <input
                        className="st-input"
                        type={showCurrentPw ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{ paddingRight: 40 }}
                      />
                      <EyeToggle show={showCurrentPw} onToggle={() => setShowCurrentPw(s => !s)} />
                    </div>
                  </FieldGroup>

                  <FieldGroup label={t('settings.new_password')}>
                    <div style={{ position: 'relative' }}>
                      <input
                        className="st-input"
                        type={showNewPw ? 'text' : 'password'}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder={t('settings.min_characters')}
                        style={{ paddingRight: 40 }}
                      />
                      <EyeToggle show={showNewPw} onToggle={() => setShowNewPw(s => !s)} />
                    </div>
                  </FieldGroup>

                  {newPassword.length > 0 && (
                    <div style={{
                      background: 'rgba(47,82,133,0.03)',
                      border: '1px solid rgba(47,82,133,0.08)',
                      borderRadius: 8, padding: '10px 14px',
                    }}>
                      {strengthChecks.map(check => (
                        <div key={check.label} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          fontSize: 11, color: check.ok ? '#16a34a' : '#A8BDD0', marginBottom: 4,
                        }}>
                          <span>{check.ok ? '✓' : '○'}</span>
                          <span>{check.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <FieldGroup label={t('settings.confirm_new_password')}>
                    <input
                      className="st-input"
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder={t('settings.repeat_password')}
                      style={{
                        borderColor: confirmPassword && newPassword !== confirmPassword
                          ? 'rgba(239,68,68,0.5)' : undefined,
                      }}
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                      <div style={{ fontSize: 11, color: '#dc2626', marginTop: 4 }}>
                        {t('settings.passwords_not_match')}
                      </div>
                    )}
                  </FieldGroup>

                  <SaveButton loading={saving} onClick={handleChangePassword} label={t('settings.change_password')} />
                </div>
              </div>
            )}

            {activeSection === 'apikeys' && (
              <div>
                <SectionHeader title={t('settings.api_keys')} subtitle={t('settings.api_keys_subtitle')} />

                <div style={{
                  background: 'rgba(245,158,11,0.06)',
                  border: '1px solid rgba(245,158,11,0.15)',
                  borderRadius: 10, padding: '12px 16px', marginBottom: 24,
                  fontSize: 12, color: '#92400e', lineHeight: 1.7,
                }}>
                  {t('settings.api_warning_prefix')} <strong>{t('settings.api_warning_bold')}</strong> {t('settings.api_warning_suffix')}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {apiKeys.map(key => (
                    <div key={key.id} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 18px', borderRadius: 12,
                      background: 'rgba(47,82,133,0.02)',
                      border: '1px solid rgba(47,82,133,0.08)',
                      flexWrap: 'wrap',
                    }}>
                      <div style={{ flex: 1, minWidth: 140 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A' }}>
                          {key.broker}
                        </div>
                        <div style={{ fontSize: 11, color: '#A8BDD0', fontFamily: "'DM Mono', monospace", marginTop: 2 }}>
                          {key.apiKey}
                        </div>
                      </div>
                      <div style={{ fontSize: 10, color: '#A8BDD0' }}>
                        {t('settings.added_date', { date: key.createdAt })}
                      </div>
                      <div
                        onClick={() => handleToggleKey(key.id)}
                        style={{
                          padding: '4px 12px', borderRadius: 20, cursor: 'pointer',
                          fontSize: 10, fontWeight: 700,
                          background: key.isActive ? 'rgba(34,197,94,0.12)' : 'rgba(168,189,208,0.20)',
                          color: key.isActive ? '#16a34a' : '#7A6B72',
                          transition: 'all 0.15s',
                        }}
                      >
                        {key.isActive ? t('settings.status_active') : t('settings.status_disabled')}
                      </div>
                      <div
                        onClick={() => handleDeleteKey(key.id)}
                        style={{
                          width: 28, height: 28, borderRadius: 8,
                          background: 'rgba(239,68,68,0.06)',
                          border: '1px solid rgba(239,68,68,0.15)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.12)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.06)')}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </div>
                    </div>
                  ))}

                  {apiKeys.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '24px 0', fontSize: 13, color: '#A8BDD0' }}>
                      {t('settings.no_api_keys')}
                    </div>
                  )}
                </div>

                {!showAddKey ? (
                  <div
                    onClick={() => setShowAddKey(true)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '12px 20px', borderRadius: 12,
                      border: '1px dashed rgba(47,82,133,0.20)',
                      background: 'rgba(47,82,133,0.02)',
                      color: '#2F5285', fontSize: 13, fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(47,82,133,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(47,82,133,0.02)')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    {t('settings.add_api_key')}
                  </div>
                ) : (
                  <div style={{
                    padding: '20px 24px', borderRadius: 14,
                    background: 'rgba(47,82,133,0.02)',
                    border: '1px solid rgba(47,82,133,0.10)',
                    display: 'flex', flexDirection: 'column', gap: 14,
                    animation: 'fadeIn 0.2s ease',
                  }}>
                    <FieldGroup label={t('settings.broker')}>
                      <select
                        value={newBroker}
                        onChange={e => setNewBroker(e.target.value)}
                        className="st-input"
                        style={{ cursor: 'pointer' }}
                      >
                        {BROKERS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </FieldGroup>

                    <FieldGroup label={t('settings.api_key_label')}>
                      <input className="st-input" type="text" value={newApiKey} onChange={e => setNewApiKey(e.target.value)} placeholder={t('settings.api_key_placeholder')} />
                    </FieldGroup>

                    <FieldGroup label={t('settings.api_secret')}>
                      <input className="st-input" type="password" value={newApiSecret} onChange={e => setNewApiSecret(e.target.value)} placeholder={t('settings.api_secret_placeholder')} />
                    </FieldGroup>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <SaveButton loading={saving} onClick={handleAddApiKey} label={t('settings.save_key')} />
                      <div
                        onClick={() => { setShowAddKey(false); setNewApiKey(''); setNewApiSecret('') }}
                        style={{
                          padding: '11px 24px', borderRadius: 30,
                          border: '1px solid rgba(47,82,133,0.15)',
                          background: 'transparent', color: '#7A6B72',
                          fontSize: 13, fontWeight: 600, cursor: 'pointer',
                          fontFamily: "'DM Mono', monospace", transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(47,82,133,0.04)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        {t('settings.cancel')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'prefs' && (
              <div>
                <SectionHeader title={t('settings.preferences')} subtitle={t('settings.prefs_subtitle')} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <ToggleRow
                    label={t('settings.pref_email_notif')}
                    description={t('settings.pref_email_notif_desc')}
                    defaultOn={true}
                  />
                  <Divider />
                  <ToggleRow
                    label={t('settings.pref_auto_activate')}
                    description={t('settings.pref_auto_activate_desc')}
                    defaultOn={false}
                  />
                  <Divider />
                  <ToggleRow
                    label={t('settings.pref_performance')}
                    description={t('settings.pref_performance_desc')}
                    defaultOn={true}
                  />
                  <Divider />
                  <ToggleRow
                    label={t('settings.pref_dark_mode')}
                    description={t('settings.pref_dark_mode_desc')}
                    defaultOn={false}
                    disabled={true}
                  />
                </div>
              </div>
            )}

            {activeSection === 'danger' && (
              <div>
                <SectionHeader title={t('settings.danger_zone')} subtitle={t('settings.danger_subtitle')} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <DangerRow
                    title={t('settings.danger_deactivate_title')}
                    description={t('settings.danger_deactivate_desc')}
                    buttonLabel={t('settings.danger_deactivate_btn')}
                    onClick={() => showFeedback(t('settings.danger_deactivate_feedback'))}
                  />
                  <Divider />
                  <DangerRow
                    title={t('settings.danger_delete_keys_title')}
                    description={t('settings.danger_delete_keys_desc')}
                    buttonLabel={t('settings.danger_delete_keys_btn')}
                    onClick={() => { setApiKeys([]); showFeedback(t('settings.danger_delete_keys_feedback')) }}
                  />
                  <Divider />
                  <DangerRow
                    title={t('settings.danger_delete_account_title')}
                    description={t('settings.danger_delete_account_desc')}
                    buttonLabel={t('settings.danger_delete_account_btn')}
                    onClick={() => showFeedback(t('settings.danger_delete_account_feedback'), true)}
                    severe
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 22, fontWeight: 700, color: '#0A0A0A',
        margin: 0, marginBottom: 4,
      }}>
        {title}
      </h2>
      <p style={{ fontSize: 12, color: '#7A6B72', margin: 0, lineHeight: 1.6 }}>
        {subtitle}
      </p>
    </div>
  )
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{
        display: 'block', fontSize: 11, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: '#7A6B72', marginBottom: 6,
        fontFamily: "'DM Mono', monospace",
      }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function SaveButton({ loading, onClick, label }: { loading: boolean; onClick: () => void; label: string }) {
  const { t } = useTranslation()
  return (
    <div
      onClick={!loading ? onClick : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: loading ? 'rgba(108,168,24,0.3)' : 'rgba(108,168,24,0.5)',
        border: '1px solid rgba(227,253,208,0.5)',
        borderRadius: 30, padding: '11px 32px',
        fontSize: 13, color: '#fff', fontWeight: 600,
        fontFamily: "'DM Mono', monospace",
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'rgba(108,168,24,0.4)' }}
      onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'rgba(108,168,24,0.5)' }}
    >
      {loading ? (
        <>
          <div style={{
            width: 14, height: 14,
            border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: '#fff', borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }} />
          {t('settings.saving')}
        </>
      ) : label}
    </div>
  )
}

function EyeToggle({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      style={{
        position: 'absolute', right: 12, top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer', color: '#A8BDD0',
        display: 'flex', alignItems: 'center',
        transition: 'color 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = '#2F5285')}
      onMouseLeave={e => (e.currentTarget.style.color = '#A8BDD0')}
    >
      {show ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </div>
  )
}

function ToggleRow({ label, description, defaultOn, disabled = false }: {
  label: string; description: string; defaultOn: boolean; disabled?: boolean
}) {
  const [on, setOn] = useState(defaultOn)

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      gap: 16, opacity: disabled ? 0.5 : 1,
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#0A0A0A' }}>{label}</div>
        <div style={{ fontSize: 12, color: '#7A6B72', marginTop: 2 }}>{description}</div>
      </div>
      <div
        onClick={() => { if (!disabled) setOn(o => !o) }}
        style={{
          width: 44, height: 24, borderRadius: 12,
          background: on ? '#2F5285' : 'rgba(168,189,208,0.30)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
          position: 'relative', flexShrink: 0,
        }}
      >
        <div style={{
          width: 18, height: 18, borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          position: 'absolute', top: 3,
          left: on ? 23 : 3,
          transition: 'left 0.2s',
        }} />
      </div>
    </div>
  )
}

function DangerRow({ title, description, buttonLabel, onClick, severe = false }: {
  title: string; description: string; buttonLabel: string; onClick: () => void; severe?: boolean
}) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      gap: 16, flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: severe ? '#dc2626' : '#0A0A0A' }}>{title}</div>
        <div style={{ fontSize: 12, color: '#7A6B72', marginTop: 2, lineHeight: 1.6 }}>{description}</div>
      </div>
      <div
        onClick={onClick}
        style={{
          padding: '8px 20px', borderRadius: 10,
          background: severe ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.04)',
          border: `1px solid ${severe ? 'rgba(239,68,68,0.30)' : 'rgba(239,68,68,0.15)'}`,
          color: '#dc2626', fontSize: 12, fontWeight: 600,
          fontFamily: "'DM Mono', monospace",
          cursor: 'pointer', transition: 'all 0.15s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = severe ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.08)')}
        onMouseLeave={e => (e.currentTarget.style.background = severe ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.04)')}
      >
        {buttonLabel}
      </div>
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: 'rgba(47,82,133,0.06)' }} />
}