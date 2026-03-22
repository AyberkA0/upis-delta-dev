import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from '../../../node_modules/react-i18next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import RichEditor from '../../components/RichEditor'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { blogApi, BlogPost as BlogPostType } from '../../api/blog'

interface Heading {
  id: string
  text: string
  level: number
}

function extractHeadings(html: string): Heading[] {
  const div = document.createElement('div')
  div.innerHTML = html
  const headings: Heading[] = []
  div.querySelectorAll('h1, h2, h3').forEach((el, i) => {
    const id = `heading-${i}`
    el.id = id
    headings.push({
      id,
      text: el.textContent || '',
      level: parseInt(el.tagName[1]),
    })
  })
  return headings
}

function injectIds(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  div.querySelectorAll('h1, h2, h3').forEach((el, i) => {
    el.id = `heading-${i}`
  })
  return div.innerHTML
}

export default function BlogPost() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const { isMobile } = useBreakpoint()
  const contentRef = useRef<HTMLDivElement>(null)

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isLoggedIn = !!token

  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [processedContent, setProcessedContent] = useState('')
  const [deleting, setDeleting] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const handleDelete = async () => {
    if (!post || !confirm(t('blog.delete_confirm', { title: post.title }))) return
    setDeleting(true)

    try {
      await blogApi.delete(post.id)
      navigate('/blog')
    } catch {
      alert(t('blog.delete_failed'))
      setDeleting(false)
    }
  }

  useEffect(() => {
    if (!slug) return
    blogApi.getOne(slug)
      .then(r => {
        setPost(r.data)
        if (r.data.content) {
          const injected = injectIds(r.data.content)
          setProcessedContent(injected)
          setHeadings(extractHeadings(r.data.content))
        }
      })
      .catch(() => setError(t('blog.post_error')))
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    )

    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings, processedContent])

  const scrollToHeading = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }
} 

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6FA', fontFamily: "'DM Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <Navbar isLoggedIn={isLoggedIn} username={user.name || ''} onLogout={handleLogout} />

      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: `120px ${isMobile ? '20px' : '40px'} 80px`,
      }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 12, color: '#7A6B72', marginBottom: 40,
        }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.color = '#2F5285'}
            onMouseLeave={e => e.currentTarget.style.color = '#7A6B72'}
          >{t('breadcrumb.home')}</span>
          <span style={{ color: '#A8BDD0' }}>›</span>
          <span onClick={() => navigate('/blog')} style={{ cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.color = '#2F5285'}
            onMouseLeave={e => e.currentTarget.style.color = '#7A6B72'}
          >{t('breadcrumb.blog')}</span>
          <span style={{ color: '#A8BDD0' }}>›</span>
          <span style={{ color: '#0A0A0A' }}>{post?.title || '...'}</span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: '#7A6B72' }}>
            <div style={{
              width: 24, height: 24, border: '2px solid rgba(47,82,133,0.2)',
              borderTopColor: '#2F5285', borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
              margin: '0 auto 16px',
            }} />
            {t('common.loading')}
          </div>
        ) : error ? (
          <div style={{
            background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 12, padding: '16px 20px', fontSize: 13, color: '#dc2626',
          }}>
            {error}
          </div>
        ) : post ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile || headings.length === 0 ? '1fr' : '1fr 240px',
            gap: 32,
            alignItems: 'start',
          }}>

            <article>
              <div style={{
                background: '#fff',
                border: '1px solid rgba(47,82,133,0.08)',
                borderRadius: 20,
                padding: isMobile ? '28px 24px' : '40px 48px',
                marginBottom: 24,
                boxShadow: '0 4px 24px rgba(47,82,133,0.06)',
              }}>
                <div style={{
                  fontSize: 11, color: '#7A6B72', letterSpacing: '0.08em',
                  textTransform: 'uppercase', marginBottom: 16,
                }}>
                  {formatDate(post.created_at)}
                </div>
                
                <h1 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? 28 : 40,
                  fontWeight: 800, color: '#0A0A0A',
                  letterSpacing: -0.8, lineHeight: 1.15,
                  margin: 0,
                }}>
                  {post.title}
                </h1>

                {user.permission_level >= 1 && (<br/>)}

                {user.permission_level >= 1 && (
                  <div
                    onClick={handleDelete}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 11, color: '#dc2626',
                      cursor: deleting ? 'not-allowed' : 'pointer',
                      padding: '6px 12px',
                      background: 'rgba(239,68,68,0.06)',
                      border: '1px solid rgba(239,68,68,0.15)',
                      borderRadius: 8, transition: 'all 0.15s',
                      opacity: deleting ? 0.5 : 1,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(239,68,68,0.12)'
                      e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(239,68,68,0.06)'
                      e.currentTarget.style.borderColor = 'rgba(239,68,68,0.15)'
                    }}
                  >
                    {deleting ? t('blog.deleting') : t('blog.delete_post')}
                  </div>
                )}
              </div>

              <div
                ref={contentRef}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(47,82,133,0.08)',
                  borderRadius: 20,
                  padding: isMobile ? '28px 24px' : '40px 48px',
                  boxShadow: '0 4px 24px rgba(47,82,133,0.06)',
                }}
              >
                <RichEditor
                  content={processedContent}
                  onChange={() => {}}
                  readOnly={true}
                  onHeadingsReady={setHeadings}
                />
              </div>

              <div style={{ marginTop: 24 }}>
                <div
                  onClick={() => navigate('/blog')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 12, color: '#2F5285',
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
                  {t('blog.back_to_blog')}
                </div>
              </div>
            </article>

            {!isMobile && headings.length > 0 && (
              <div style={{
                position: 'sticky',
                top: 100,
                background: '#fff',
                border: '1px solid rgba(47,82,133,0.08)',
                borderRadius: 16,
                padding: '20px 0',
                boxShadow: '0 4px 24px rgba(47,82,133,0.04)',
              }}>
                <div style={{
                  fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: '#A8BDD0', fontWeight: 600, padding: '0 20px',
                  marginBottom: 12,
                }}>
                  {t('blog.on_this_page')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {headings.map(h => (
                    <div
                      key={h.id}
                      onClick={() => scrollToHeading(h.id)}
                      style={{
                        padding: `7px ${h.level === 1 ? '20px' : h.level === 2 ? '28px' : '36px'}`,
                        fontSize: 12,
                        color: activeId === h.id ? '#2F5285' : '#7A6B72',
                        cursor: 'pointer',
                        fontFamily: "'DM Mono', monospace",
                        fontWeight: activeId === h.id ? 600 : 400,
                        borderLeft: `2px solid ${activeId === h.id ? '#2F5285' : 'transparent'}`,
                        transition: 'all 0.15s',
                        lineHeight: 1.4,
                      }}
                      onMouseEnter={e => {
                        if (activeId !== h.id) e.currentTarget.style.color = '#2F5285'
                      }}
                      onMouseLeave={e => {
                        if (activeId !== h.id) e.currentTarget.style.color = '#7A6B72'
                      }}
                    >
                      {h.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : null}
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Footer />
    </div>
  )
}