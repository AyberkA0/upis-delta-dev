import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import RichEditor from '../../components/RichEditor'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { blogApi } from '../../api/blog'

export default function NewBlogPost() {
  const navigate = useNavigate()
  const { isMobile } = useBreakpoint()

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isLoggedIn = !!token

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [slug, setSlug] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (val: string) => {
    setTitle(val)
    const newSlug = generateSlug(val)
    if (!slug || slug === generateSlug(title)) {
      setSlug(newSlug)
    }
  }

  const handleSlugChange = (val: string) => {
    setSlug(generateSlug(val))
  }

  const submit = async () => {
    setError('')

    if (!title.trim()) {
      setError('Title is required')
      return
    }
    if (!content.trim()) {
      setError('Content is required')
      return
    }
    if (!slug.trim()) {
      setError('Slug is required')
      return
    }

    setLoading(true)
    try {
      const post = await blogApi.create({
        title,
        content,
        slug,
        is_published: true
      })
      navigate(`/blog/${post.data.slug}`)
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })
          ?.response?.data?.error ?? 'Failed to create post.'
      setError(message)
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submit()
  }

  if ((user.permission_level ?? 0) < 1) {
    return (
      <div style={{ minHeight: '100vh', background: '#F4F6FA', fontFamily: "'DM Mono', monospace" }}>
        <Navbar isLoggedIn={isLoggedIn} username={user.name || ''} onLogout={handleLogout} />
        <div style={{
          maxWidth: 760, margin: '0 auto',
          padding: `120px ${isMobile ? '20px' : '40px'} 80px`,
          textAlign: 'center',
        }}>
            <br/><br/><br/><br/><br/>
            <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.3 }}>🔒</div>
            <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24, fontWeight: 700, color: '#0A0A0A', marginBottom: 8,
            }}>
                Access Denied
            </div>
            <div style={{ fontSize: 13, color: '#7A6B72' }}>
                You do not have permission to create blog posts.
            </div>
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6FA', fontFamily: "'DM Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        .np-input {
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
        .np-input:focus {
          border-color: rgba(47,82,133,0.4);
          box-shadow: 0 0 0 3px rgba(47,82,133,0.06);
        }
        .np-input::placeholder { color: #A8BDD0; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <Navbar isLoggedIn={isLoggedIn} username={user.name || ''} onLogout={handleLogout} />

      <div style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: `120px ${isMobile ? '20px' : '40px'} 80px`,
      }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 12, color: '#7A6B72', marginBottom: 40,
        }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
          <span style={{ color: '#A8BDD0' }}>›</span>
          <span onClick={() => navigate('/blog')} style={{ cursor: 'pointer' }}>Blog</span>
          <span style={{ color: '#A8BDD0' }}>›</span>
          <span style={{ color: '#0A0A0A' }}>New Post</span>
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
            Blog
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 26 : 32,
            fontWeight: 700, color: '#0A0A0A',
            letterSpacing: -0.5, margin: 0,
          }}>
            New Post
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            background: '#fff',
            border: '1px solid rgba(47,82,133,0.08)',
            borderRadius: 20,
            padding: isMobile ? '24px 20px' : '32px 40px',
            boxShadow: '0 4px 24px rgba(47,82,133,0.06)',
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 8, padding: '10px 14px',
                fontSize: 12, color: '#dc2626',
              }}>
                {error}
              </div>
            )}

            <div>
              <label style={{
                display: 'block', fontSize: 11, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#7A6B72', marginBottom: 6,
              }}>
                Title
              </label>
              <input
                className="np-input"
                type="text"
                placeholder="Post title"
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div>
              <label style={{
                display: 'block', fontSize: 11, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#7A6B72', marginBottom: 6,
              }}>
                Slug
              </label>
              <input
                className="np-input"
                type="text"
                placeholder="post-url-slug"
                value={slug}
                onChange={e => handleSlugChange(e.target.value)}
                required
              />
              <div style={{ fontSize: 11, color: '#A8BDD0', marginTop: 4 }}>
                URL: /blog/{slug || 'post-slug'}
              </div>
            </div>

            <div>
              <label style={{
                display: 'block', fontSize: 11, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#7A6B72', marginBottom: 6,
              }}>
                Content
              </label>
              <RichEditor content={content} onChange={setContent} />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: loading ? 'rgba(108, 168, 24, 0.3)' : 'rgba(108, 168, 24, 0.5)',
                  border: '1px solid rgba(227, 253, 208, 0.5)',
                  borderRadius: 30,
                  padding: '13px 36px',
                  fontSize: 14,
                  color: '#ffffff',
                  fontWeight: 600,
                  fontFamily: "'DM Mono', monospace",
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Saving...' : 'Publish Post'}
              </button>

              <div
                onClick={() => navigate('/blog')}
                style={{
                  padding: '13px 24px',
                  background: 'transparent',
                  border: '1px solid rgba(47,82,133,0.15)',
                  borderRadius: 30,
                  fontSize: 14,
                  color: '#7A6B72',
                  fontFamily: "'DM Mono', monospace",
                  cursor: 'pointer',
                }}
              >
                Cancel
              </div>
            </div>

          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}