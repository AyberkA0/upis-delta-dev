import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Color from '@tiptap/extension-color'
import { useEffect, useState, useRef } from 'react'

interface RichEditorProps {
  content: string
  onChange: (html: string) => void
  readOnly?: boolean
  onHeadingsReady?: (headings: { id: string; text: string; level: number }[]) => void
}

const FONTS = [
  { label: 'DM Mono', value: 'DM Mono' },
  { label: 'Playfair Display', value: 'Playfair Display' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Arial', value: 'Arial' },
  { label: 'Courier New', value: 'Courier New' },
]

const COLORS = [
  '#0A0A0A', '#2F5285', '#7A6B72', '#A8BDD0',
  '#16a34a', '#dc2626', '#f59e0b', '#8b5cf6',
]

export default function RichEditor({ content, onChange, readOnly = false, onHeadingsReady }: RichEditorProps) {
  const [imageUrl, setImageUrl] = useState('')
  const [showImageInput, setShowImageInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showLinkInput, setShowLinkInput] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cachedHeadingsRef = useRef<string>('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ allowBase64: true }),
      Link.configure({ openOnClick: false }),
      TextStyle,
      FontFamily,
      Color,
    ],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor || !readOnly || !onHeadingsReady) return

    const extractHeadings = () => {
      try {
        const dom = editor.view.dom
        const found: { id: string; text: string; level: number }[] = []
        dom.querySelectorAll('h1, h2, h3').forEach((el, i) => {
          const id = `heading-${i}`
          ;(el as HTMLElement).id = id
          found.push({
            id,
            text: el.textContent || '',
            level: parseInt(el.tagName[1]),
          })
        })

        const serialized = JSON.stringify(found)
        if (serialized !== cachedHeadingsRef.current) {
          cachedHeadingsRef.current = serialized
          onHeadingsReady(found)
        }
      } catch (e) {
        console.warn('Headings extraction failed', e)
      }
    }

    const initialTimer = setTimeout(extractHeadings, 200)

    const updateHandler = () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(extractHeadings, 500)
    }

    editor.on('update', updateHandler)

    return () => {
      clearTimeout(initialTimer)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      editor.off('update', updateHandler)
    }
  }, [editor, readOnly, onHeadingsReady])

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) return null

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
      setShowImageInput(false)
    }
  }

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
      setLinkUrl('')
      setShowLinkInput(false)
    }
  }

  if (readOnly) {
    return (
      <div className="rich-content">
        <EditorContent editor={editor} />
      </div>
    )
  }

  return (
    <div style={{
      border: '1px solid rgba(47,82,133,0.15)',
      borderRadius: 10,
      overflow: 'hidden',
      background: '#fff',
    }}>
      <style>{`
        .ProseMirror {
          padding: 16px;
          min-height: 400px;
          outline: none;
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          line-height: 1.8;
          color: #0A0A0A;
        }
        .ProseMirror h1 { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; margin: 24px 0 12px; }
        .ProseMirror h2 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin: 20px 0 10px; }
        .ProseMirror h3 { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; margin: 16px 0 8px; }
        .ProseMirror p { margin: 0 0 12px; }
        .ProseMirror ul, .ProseMirror ol { padding-left: 24px; margin: 0 0 12px; }
        .ProseMirror li { margin-bottom: 4px; }
        .ProseMirror blockquote { border-left: 3px solid #A8BDD0; padding-left: 16px; color: #7A6B72; margin: 16px 0; }
        .ProseMirror code { background: rgba(47,82,133,0.08); padding: 2px 6px; border-radius: 4px; font-family: 'DM Mono', monospace; font-size: 13px; }
        .ProseMirror pre { background: #0A0A0A; color: #A8BDD0; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0; }
        .ProseMirror pre code { background: none; color: inherit; padding: 0; }
        .ProseMirror img { max-width: 100%; border-radius: 8px; margin: 12px 0; }
        .ProseMirror a { color: #2F5285; text-decoration: underline; }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #A8BDD0;
          pointer-events: none;
          float: left;
          height: 0;
        }
        .rich-content .ProseMirror { padding: 0; min-height: unset; }
      `}</style>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 4,
        padding: '8px 12px',
        borderBottom: '1px solid rgba(47,82,133,0.08)',
        background: '#F4F6FA',
      }}>

        {[1, 2, 3].map(level => (
          <ToolbarBtn
            key={level}
            active={editor.isActive('heading', { level })}
            onClick={() => editor.chain().focus().toggleHeading({ level: level as 1|2|3 }).run()}
            title={`H${level}`}
          >
            H{level}
          </ToolbarBtn>
        ))}

        <Divider />

        <ToolbarBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
          <strong>B</strong>
        </ToolbarBtn>
        <ToolbarBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
          <em>I</em>
        </ToolbarBtn>
        <ToolbarBtn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strike">
          <s>S</s>
        </ToolbarBtn>
        <ToolbarBtn active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} title="Code">
          {'<>'}
        </ToolbarBtn>

        <Divider />

        <ToolbarBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">
          ≡
        </ToolbarBtn>
        <ToolbarBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered list">
          1.
        </ToolbarBtn>
        <ToolbarBtn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">
          "
        </ToolbarBtn>
        <ToolbarBtn active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code block">
          {'{}'}
        </ToolbarBtn>

        <Divider />

        <select
          onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}
          style={{
            background: '#fff', border: '1px solid rgba(47,82,133,0.15)',
            borderRadius: 6, padding: '3px 8px', fontSize: 11,
            fontFamily: "'DM Mono', monospace", color: '#0A0A0A',
            cursor: 'pointer',
          }}
        >
          {FONTS.map(f => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>

        <Divider />

        <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          {COLORS.map(color => (
            <div
              key={color}
              onClick={() => editor.chain().focus().setColor(color).run()}
              style={{
                width: 16, height: 16, borderRadius: '50%',
                background: color, cursor: 'pointer',
                border: '1px solid rgba(0,0,0,0.1)',
                transition: 'transform 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          ))}
        </div>

        <Divider />

        <div style={{ position: 'relative' }}>
          <ToolbarBtn active={false} onClick={() => setShowImageInput(s => !s)} title="Add image">
            🖼
          </ToolbarBtn>
          {showImageInput && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 4px)', left: 0,
              background: '#fff', border: '1px solid rgba(47,82,133,0.15)',
              borderRadius: 8, padding: 8, zIndex: 10,
              display: 'flex', gap: 6, minWidth: 280,
              boxShadow: '0 4px 16px rgba(47,82,133,0.1)',
            }}>
              <input
                type="text"
                placeholder="Image URL..."
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addImage()}
                style={{
                  flex: 1, border: '1px solid rgba(47,82,133,0.15)',
                  borderRadius: 6, padding: '4px 8px', fontSize: 12,
                  fontFamily: "'DM Mono', monospace", outline: 'none',
                }}
                autoFocus
              />
              <button onClick={addImage} style={{
                background: '#2F5285', color: '#fff', border: 'none',
                borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 11,
              }}>Add</button>
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <ToolbarBtn active={editor.isActive('link')} onClick={() => setShowLinkInput(s => !s)} title="Add link">
            🔗
          </ToolbarBtn>
          {showLinkInput && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 4px)', left: 0,
              background: '#fff', border: '1px solid rgba(47,82,133,0.15)',
              borderRadius: 8, padding: 8, zIndex: 10,
              display: 'flex', gap: 6, minWidth: 280,
              boxShadow: '0 4px 16px rgba(47,82,133,0.1)',
            }}>
              <input
                type="text"
                placeholder="https://..."
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addLink()}
                style={{
                  flex: 1, border: '1px solid rgba(47,82,133,0.15)',
                  borderRadius: 6, padding: '4px 8px', fontSize: 12,
                  fontFamily: "'DM Mono', monospace", outline: 'none',
                }}
                autoFocus
              />
              <button onClick={addLink} style={{
                background: '#2F5285', color: '#fff', border: 'none',
                borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 11,
              }}>Add</button>
            </div>
          )}
        </div>

        <Divider />

        <ToolbarBtn active={false} onClick={() => editor.chain().focus().undo().run()} title="Undo">
          ↩
        </ToolbarBtn>
        <ToolbarBtn active={false} onClick={() => editor.chain().focus().redo().run()} title="Redo">
          ↪
        </ToolbarBtn>

      </div>

      <EditorContent editor={editor} />
    </div>
  )
}

function ToolbarBtn({ children, active, onClick, title }: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
  title?: string
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: active ? 'rgba(47,82,133,0.15)' : 'transparent',
        border: `1px solid ${active ? 'rgba(47,82,133,0.3)' : 'transparent'}`,
        borderRadius: 6, padding: '3px 8px',
        cursor: 'pointer', fontSize: 12,
        fontFamily: "'DM Mono', monospace",
        color: active ? '#2F5285' : '#0A0A0A',
        transition: 'all 0.15s', minWidth: 28,
      }}
      onMouseEnter={e => {
        if (!active) e.currentTarget.style.background = 'rgba(47,82,133,0.06)'
      }}
      onMouseLeave={e => {
        if (!active) e.currentTarget.style.background = 'transparent'
      }}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div style={{ width: 1, height: 20, background: 'rgba(47,82,133,0.12)', margin: '0 2px' }} />
}