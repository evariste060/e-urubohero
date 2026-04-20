import { useState, useRef, useEffect } from 'react'
import { Send, Leaf, MapPin, ArrowLeft, Phone } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { sendMessage, sendMessageDemo } from '../services/agasazaService'

function Avatar({ size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, #2D6A4F, #40916C)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(45,106,79,0.25)',
    }}>
      <Leaf size={Math.round(size * 0.42)} color="#E9C46A" />
    </div>
  )
}

function Bubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display: 'flex', gap: 10, alignItems: 'flex-end',
      flexDirection: isUser ? 'row-reverse' : 'row',
    }}>
      {!isUser && <Avatar size={30} />}
      <div style={{
        maxWidth: '75%', padding: '11px 15px', fontSize: 14, lineHeight: 1.55,
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser ? 'linear-gradient(135deg, #2D6A4F, #40916C)' : 'white',
        color: isUser ? 'white' : '#264653',
        boxShadow: isUser ? '0 3px 10px rgba(45,106,79,0.22)' : '0 2px 8px rgba(0,0,0,0.07)',
        border: isUser ? 'none' : '1px solid #eef5f1',
      }}>
        {msg.content}
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
      <Avatar size={30} />
      <div style={{
        padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
        background: 'white', border: '1px solid #eef5f1',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', height: 14 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="animate-bounce" style={{
              width: 6, height: 6, borderRadius: '50%', background: '#52B788',
              animationDelay: `${i * 0.16}s`,
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

const QUICK = [
  { text: 'I feel anxious', e: '😔' },
  { text: 'I need a clinic', e: '🏥' },
  { text: 'SRH question', e: '💊' },
  { text: 'I feel sad', e: '💙' },
]

export default function ChatScreen() {
  const { messages, isTyping, addMessage, setTyping, setScreen } = useAppStore()
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  async function send(text) {
    const content = (text ?? input).trim()
    if (!content) return
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    const history = [...messages, { role: 'user', content }]
    addMessage({ role: 'user', content })
    setTyping(true)
    try {
      const reply = await sendMessage(history)
      addMessage({ role: 'assistant', content: reply })
    } catch {
      try {
        const reply = await sendMessageDemo(content)
        addMessage({ role: 'assistant', content: reply })
      } catch {
        addMessage({ role: 'assistant', content: 'Mbabarira, habaye ikibazo. Gerageza nanone.' })
      }
    } finally {
      setTyping(false)
    }
  }

  // This screen fills the flex parent exactly (header | messages scroll | input)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* ── Header ── */}
      <div style={{
        flexShrink: 0,
        background: 'linear-gradient(160deg, #1B4332, #2D6A4F)',
        padding: '48px 16px 14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setScreen('welcome')}
            style={{
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ArrowLeft size={17} color="white" />
          </button>

          <Avatar size={38} />

          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>Agasaza</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#52B788' }} />
              <span style={{ color: '#95C4A1', fontSize: 11, fontWeight: 500 }}>AI Counselor · Always here</span>
            </div>
          </div>

          <button
            onClick={() => setScreen('navigator')}
            style={{
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            title="Find clinic"
          >
            <MapPin size={16} color="#95C4A1" />
          </button>
        </div>
      </div>

      {/* ── Messages — scrolls independently ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', background: '#F0F4F1' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', paddingTop: 24, paddingBottom: 20 }}>
            <Avatar size={56} />
            <div style={{ marginTop: 16, marginBottom: 4 }}>
              <span style={{ color: '#264653', fontWeight: 700, fontSize: 17 }}>Murakaza neza</span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.6, maxWidth: 240, margin: '0 auto 20px' }}>
              Share what's on your mind. I'm here to listen without judgment.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {QUICK.map(({ text, e }) => (
                <button
                  key={text}
                  onClick={() => send(text)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 14px', borderRadius: 20,
                    background: 'white', border: '1.5px solid #ddeee5',
                    color: '#2D6A4F', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                  }}
                >
                  <span>{e}</span><span>{text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m, i) => <Bubble key={i} msg={m} />)}
          {isTyping && <TypingDots />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* ── Input bar ── */}
      <div style={{
        flexShrink: 0, padding: '10px 14px 12px',
        background: 'white', borderTop: '1px solid #e8f5ec',
      }}>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'flex-end',
          background: '#F8F4EF', borderRadius: 20,
          border: '1.5px solid #ddeee5', padding: '8px 8px 8px 14px',
        }}>
          <textarea
            ref={textareaRef}
            value={input}
            rows={1}
            placeholder="Type in Kinyarwanda or English…"
            onChange={(e) => {
              setInput(e.target.value)
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
            }}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              resize: 'none', fontSize: 14, color: '#264653', lineHeight: 1.5,
              fontFamily: 'inherit', minHeight: 22,
            }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim()}
            style={{
              width: 36, height: 36, borderRadius: 12, flexShrink: 0, border: 'none',
              cursor: input.trim() ? 'pointer' : 'default',
              background: input.trim() ? 'linear-gradient(135deg, #2D6A4F, #40916C)' : '#e5e7eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: input.trim() ? '0 3px 10px rgba(45,106,79,0.28)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            <Send size={15} color="white" />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 7 }}>
          <Phone size={9} color="#b0b8c1" />
          <span style={{ color: '#b0b8c1', fontSize: 11 }}>
            Crisis? Call <strong style={{ color: '#2D6A4F' }}>114</strong> — Inshuti z'Ubuzima
          </span>
        </div>
      </div>
    </div>
  )
}
