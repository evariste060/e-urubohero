import { MessageCircle, Mic, MapPin, Leaf, Shield, Heart } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

export default function WelcomeScreen() {
  const setScreen = useAppStore((s) => s.setScreen)

  return (
    <div style={{ background: '#F8F4EF' }}>

      {/* ── Hero ── */}
      <div
        style={{
          background: 'linear-gradient(160deg, #1B4332 0%, #2D6A4F 100%)',
          padding: '56px 24px 40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative circle */}
        <div style={{
          position: 'absolute', width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, #52B788 0%, transparent 70%)',
          opacity: 0.15, top: -60, right: -50, pointerEvents: 'none',
        }} />

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: '#E9C46A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Leaf size={17} color="#1B4332" />
          </div>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>e-Urubohero</span>
        </div>

        {/* Headline */}
        <p style={{ color: '#95C4A1', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 8 }}>
          MURAKAZA NEZA 🌿
        </p>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: 28, lineHeight: 1.25, marginBottom: 12 }}>
          You are<br /><span style={{ color: '#E9C46A' }}>safe here.</span>
        </h1>
        <p style={{ color: '#B7DFC5', fontSize: 14, lineHeight: 1.6 }}>
          Share what's on your mind — in Kinyarwanda or English.
          Agasaza listens without judgment.
        </p>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '24px 20px 32px' }}>

        {/* Prompt card */}
        <div style={{
          background: 'white', borderRadius: 16, padding: '16px 18px',
          border: '1px solid #e8f5ec', marginBottom: 20,
          boxShadow: '0 2px 12px rgba(45,106,79,0.08)',
        }}>
          <p style={{ color: '#264653', fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
            What's been on your mind lately?
          </p>
          <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.6 }}>
            Everything you share stays private between you and Agasaza.
          </p>
        </div>

        {/* Primary CTA */}
        <button
          onClick={() => setScreen('chat')}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14,
            background: 'linear-gradient(135deg, #2D6A4F, #40916C)',
            borderRadius: 16, padding: '15px 18px', border: 'none', cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(45,106,79,0.3)', marginBottom: 12,
          }}
        >
          <div style={{
            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MessageCircle size={21} color="white" />
          </div>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>Type your concern</div>
            <div style={{ color: '#95C4A1', fontSize: 12, marginTop: 2 }}>Chat with AI Agasaza</div>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 20 }}>›</span>
        </button>

        {/* Secondary CTAs */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
          {[
            { icon: Mic, label: 'Voice note', sub: 'Speak freely', color: '#D8F3DC', iconColor: '#2D6A4F', border: '#e8f5ec', action: 'chat' },
            { icon: MapPin, label: 'Find clinic', sub: 'Near you', color: '#FEF3E2', iconColor: '#8B5E3C', border: '#fce8d0', action: 'navigator' },
          ].map(({ icon: Icon, label, sub, color, iconColor, border, action }) => (
            <button
              key={label}
              onClick={() => setScreen(action)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 8, background: 'white', borderRadius: 16, padding: '16px 12px',
                border: `1.5px solid ${border}`, cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12, background: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={19} color={iconColor} />
              </div>
              <div>
                <div style={{ color: '#264653', fontWeight: 600, fontSize: 13 }}>{label}</div>
                <div style={{ color: '#9ca3af', fontSize: 11, marginTop: 2 }}>{sub}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Trust row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
          {[
            { icon: Shield, text: 'Confidential' },
            { icon: Heart, text: 'Safe space' },
            { icon: Leaf, text: '24 / 7' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', background: '#D8F3DC',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={14} color="#2D6A4F" />
              </div>
              <span style={{ color: '#9ca3af', fontSize: 11, fontWeight: 500 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
