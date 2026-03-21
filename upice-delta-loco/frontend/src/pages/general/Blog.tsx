import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import RichEditor from '../../components/RichEditor'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { blogApi, BlogPost } from '../../api/blog'

function stripHtml(html: string): string {
  return html
    .replace(/<h([1-6])[^>]*>(.*?)<\/h\1>/gi, '<strong>$2</strong>. ')
    
    .replace(/<\/(p|div|li)>/gi, '. ')
    .replace(/<br\s*\/?>/gi, '. ')
    
    .replace(/<(?!\/?strong\b)[^>]*>/g, '')
    
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\.\s*\./g, '.')
    .trim()
}

function excerpt(html: string, maxLength = 200): string {
  const text = stripHtml(html)
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

export default function Blog() {
  const navigate = useNavigate()
  const { isMobile } = useBreakpoint()

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isLoggedIn = !!token

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  useEffect(() => {
    blogApi.list()
      .then(r => setPosts(r.data))
      .catch(() => setError('Failed to load posts.'))
      .finally(() => setLoading(false))
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
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

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 12, color: '#7A6B72', marginBottom: 40,
        }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.color = '#2F5285'}
            onMouseLeave={e => e.currentTarget.style.color = '#7A6B72'}
          >Home</span>
          <span style={{ color: '#A8BDD0' }}>›</span>
          <span style={{ color: '#0A0A0A' }}>Blog</span>
        </div>

        <div style={{
          background: '#fff',
          border: '1px solid rgba(47,82,133,0.08)',
          borderRadius: 20,
          padding: isMobile ? '28px 24px' : '40px 48px',
          marginBottom: 32,
          boxShadow: '0 4px 24px rgba(47,82,133,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <div style={{
              fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#7A6B72', marginBottom: 12,
            }}>
              Upis Delta
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 28 : 36,
              fontWeight: 700, color: '#0A0A0A',
              letterSpacing: -0.5, margin: 0,
            }}>
              Blog
            </h1>
          </div>
          {user.permission_level >= 1 && (
            <div
              onClick={() => navigate('/blog/new')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, color: '#2F5285',
                fontFamily: "'DM Mono', monospace",
                cursor: 'pointer', padding: '10px 20px',
                background: 'rgba(47,82,133,0.08)',
                border: '1px solid rgba(47,82,133,0.15)',
                borderRadius: 10, transition: 'all 0.15s',
                fontWeight: 600,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(47,82,133,0.14)'
                e.currentTarget.style.borderColor = 'rgba(47,82,133,0.28)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(47,82,133,0.08)'
                e.currentTarget.style.borderColor = 'rgba(47,82,133,0.15)'
              }}
            >
              + New Post
            </div>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: '#7A6B72' }}>
            <div style={{
              width: 24, height: 24, border: '2px solid rgba(47,82,133,0.2)',
              borderTopColor: '#2F5285', borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
              margin: '0 auto 16px',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            Loading...
          </div>
        ) : error ? (
          <div style={{
            background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 12, padding: '16px 20px', fontSize: 13, color: '#dc2626',
          }}>
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div style={{
            background: '#fff', border: '1px solid rgba(47,82,133,0.08)',
            borderRadius: 20, padding: '60px 40px', textAlign: 'center',
            boxShadow: '0 4px 24px rgba(47,82,133,0.04)',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>✍️</div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20, fontWeight: 700, color: '#0A0A0A', marginBottom: 8,
            }}>
              No posts yet
            </div>
            <div style={{ fontSize: 13, color: '#7A6B72' }}>
              Check back soon.
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {posts.map(post => (
              <div
                key={post.id}
                className="post-card"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <div style={{
                  fontSize: 11, color: '#7A6B72', letterSpacing: '0.08em',
                  textTransform: 'uppercase', marginBottom: 10,
                }}>
                  {formatDate(post.created_at)}
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? 20 : 24,
                  fontWeight: 700, color: '#0A0A0A',
                  letterSpacing: -0.3, marginBottom: 12,
                }}>
                  {post.title}
                </h2>
                <RichEditor
                  content={excerpt(post.content || '')}
                  onChange={() => {}}
                  readOnly={true}
                />
                <div style={{
                  marginTop: 16, fontSize: 12, color: '#2F5285',
                  fontWeight: 600,
                }}>
                  Read more →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}