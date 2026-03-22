import { useState } from 'react'
import { useNavigate, useParams, Outlet } from 'react-router-dom'
import { useTranslation } from '../../../node_modules/react-i18next'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import logoSvg from '../../assets/upisdelta.svg'
import SidebarUserMenu from '../../components/SidebarUserMenu'

export interface Strategy {
  id: string
  name: string
  pair: string
  broker: string
  status: 'active' | 'paused' | 'draft'
  conditionCount: number
  updatedAt: string
}

// TODO
export const MOCK_STRATEGIES: Strategy[] = []

export const STATUS_STYLES: Record<Strategy['status'], { bg: string; color: string; label: string }> = {
  active:   { bg: 'rgba(34,197,94,0.12)',   color: '#16a34a', label: 'ACTIVE' },
  paused: { bg: 'rgba(168,189,208,0.20)', color: '#7A6B72', label: 'PAUSED' },
  draft:  { bg: 'rgba(245,158,11,0.12)',  color: '#f59e0b', label: 'DRAFT' },
}

export default function DashboardLayout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { strategyId } = useParams()
  const { isMobile, isTablet } = useBreakpoint()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const [strategies] = useState<Strategy[]>(MOCK_STRATEGIES)
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isCompact = isMobile || isTablet

  const filtered = strategies.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.pair.toLowerCase().includes(search.toLowerCase())
  )
  const activeStrategies = filtered.filter(s => s.status === 'active' || s.status === 'paused')
  const draftStrategies = filtered.filter(s => s.status === 'draft')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleStrategyClick = (id: string) => {
    navigate(`/dashboard/strategy/${id}`)
    if (isCompact) setSidebarOpen(false)
  }

  const handleNewStrategy = () => {
    navigate('/dashboard')
    if (isCompact) setSidebarOpen(false)
  }

  const sidebarContent = (
    <>

      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid rgba(47,82,133,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
          onClick={() => navigate('/')}
        >
          <img src={logoSvg} height={26} style={{ display: 'block' }} />
        </div>
        {isCompact && (
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontSize: 18, color: '#7A6B72', padding: 4,
            }}
          >
            ✕
          </button>
        )}
      </div>


      <div style={{ padding: '16px 16px 8px' }}>
        <div
          onClick={handleNewStrategy}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'rgba(108,168,24,0.5)',
            border: '1px solid rgba(227,253,208,0.5)',
            borderRadius: 30, padding: '11px 20px',
            fontSize: 13, color: '#fff', fontWeight: 600,
            fontFamily: "'DM Mono', monospace",
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(108,168,24,0.4)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(108,168,24,0.5)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {t('dashboard.new_strategy', 'New Strategy')}
        </div>
      </div>


      <div style={{ padding: '8px 16px 12px' }}>
        <div style={{ position: 'relative' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8BDD0" strokeWidth="2" strokeLinecap="round"
            style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder={t('dashboard.search', 'Search strategies...')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(47,82,133,0.04)',
              border: '1px solid rgba(47,82,133,0.10)',
              borderRadius: 10, padding: '9px 12px 9px 34px',
              fontSize: 12, fontFamily: "'DM Mono', monospace",
              color: '#0A0A0A', outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(47,82,133,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(47,82,133,0.06)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(47,82,133,0.10)'; e.currentTarget.style.boxShadow = 'none' }}
          />
        </div>
      </div>


      <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px' }}>
        {activeStrategies.length > 0 && (
          <>
            <div style={{
              padding: '8px 12px 6px', fontSize: 10, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#A8BDD0', fontWeight: 600,
            }}>
              {t('dashboard.active', 'Active')}
            </div>
            {activeStrategies.map(s => (
              <StrategyItem
                key={s.id} strategy={s}
                isActive={s.id === strategyId}
                onClick={() => handleStrategyClick(s.id)}
              />
            ))}
          </>
        )}
        {draftStrategies.length > 0 && (
          <>
            <div style={{
              padding: '12px 12px 6px', fontSize: 10, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#A8BDD0', fontWeight: 600, marginTop: 4,
            }}>
              {t('dashboard.drafts', 'Drafts')}
            </div>
            {draftStrategies.map(s => (
              <StrategyItem
                key={s.id} strategy={s}
                isActive={s.id === strategyId}
                onClick={() => handleStrategyClick(s.id)}
              />
            ))}
          </>
        )}
        {filtered.length === 0 && (
          <div style={{ padding: '24px 12px', textAlign: 'center', fontSize: 12, color: '#A8BDD0' }}>
            {t('dashboard.no_strategies', 'No strategies found')}
          </div>
        )}
      </div>


      <SidebarUserMenu user={user} onLogout={handleLogout} />
    </>
  )

  return (
    <div style={{
      height: '100vh', display: 'flex',
      background: '#F4F6FA',
      fontFamily: "'DM Mono', monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>


      {!isCompact && (
        <div style={{
          width: 280, minWidth: 280,
          background: '#fff',
          borderRight: '1px solid rgba(47,82,133,0.08)',
          display: 'flex', flexDirection: 'column',
        }}>
          {sidebarContent}
        </div>
      )}


      {isCompact && sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(10,10,10,0.3)',
              backdropFilter: 'blur(4px)',
              zIndex: 60,
            }}
          />
          <div style={{
            position: 'fixed', top: 0, left: 0, bottom: 0,
            width: 300, background: '#fff',
            boxShadow: '0 8px 40px rgba(47,82,133,0.15)',
            zIndex: 61,
            display: 'flex', flexDirection: 'column',
            animation: 'slideIn 0.2s ease',
          }}>
            {sidebarContent}
          </div>
        </>
      )}


      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Outlet context={{ isCompact, setSidebarOpen, strategies }} />
      </div>
    </div>
  )
}

function StrategyItem({ strategy, isActive, onClick }: {
  strategy: Strategy; isActive: boolean; onClick: () => void
}) {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState(false)
  const st = STATUS_STYLES[strategy.status]

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '12px 14px', borderRadius: 12, marginBottom: 4, cursor: 'pointer',
        border: `1px solid ${isActive ? 'rgba(47,82,133,0.20)' : 'transparent'}`,
        background: isActive
          ? 'rgba(47,82,133,0.10)'
          : hovered ? 'rgba(47,82,133,0.05)' : 'transparent',
        transition: 'all 0.15s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          fontSize: 13, fontWeight: 600, color: '#0A0A0A',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          maxWidth: 160,
        }}>
          {strategy.name}
        </div>
        <div style={{
          padding: '2px 8px', borderRadius: 20,
          background: st.bg, color: st.color,
          fontSize: 10, fontWeight: 700,
          fontFamily: "'DM Mono', monospace",
        }}>
          {st.label}
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#7A6B72', marginTop: 4 }}>
        {strategy.pair} · {strategy.broker}
      </div>
      <div style={{ fontSize: 10, color: '#A8BDD0', marginTop: 2 }}>
        {t('dashboard.edited')} {strategy.updatedAt}
      </div>
    </div>
  )
}