import { Heart, Users, Briefcase, BookOpen, ExternalLink, Star, Calendar, ArrowRight } from 'lucide-react'
import { STORIES, OPPORTUNITIES } from '../data/mockData'

const STORY_COLORS = {
  'Mental Health': { bg: '#D8F3DC', color: '#2D6A4F' },
  Recovery:        { bg: '#FEF3E2', color: '#8B5E3C' },
  Wellness:        { bg: '#E8F4FD', color: '#264653' },
}

const OPP_STYLES = {
  Scholarship: { bg: '#FEF3E2', color: '#8B5E3C', Icon: BookOpen },
  Training:    { bg: '#D8F3DC', color: '#2D6A4F', Icon: Star },
  Mentorship:  { bg: '#E8F4FD', color: '#264653', Icon: Users },
  Competition: { bg: '#FCE4EC', color: '#b91c1c', Icon: Briefcase },
}

function StoryCard({ story }) {
  const s = STORY_COLORS[story.category] || STORY_COLORS.Wellness
  return (
    <div style={{
      width: 220, flexShrink: 0,
      background: 'white', borderRadius: 16, padding: '16px',
      border: '1px solid #f0f0f0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      scrollSnapAlign: 'start',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: s.bg, color: s.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 15,
        }}>{story.name[0]}</div>
        <div>
          <div style={{ color: '#264653', fontWeight: 700, fontSize: 13 }}>{story.name}, {story.age}</div>
          <span style={{
            fontSize: 10, fontWeight: 600, borderRadius: 20,
            padding: '2px 8px', background: s.bg, color: s.color,
          }}>{story.category}</span>
        </div>
      </div>
      <p style={{ color: '#264653', fontWeight: 700, fontSize: 13, lineHeight: 1.4, marginBottom: 6 }}>
        {story.title}
      </p>
      <p style={{ color: '#9ca3af', fontSize: 12, lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {story.excerpt}
      </p>
      <button style={{
        marginTop: 10, display: 'flex', alignItems: 'center', gap: 4,
        color: '#2D6A4F', fontSize: 12, fontWeight: 700,
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
      }}>
        Read story <ArrowRight size={11} />
      </button>
    </div>
  )
}

function OpportunityCard({ opp }) {
  const { bg, color, Icon } = OPP_STYLES[opp.type] || OPP_STYLES.Training
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      background: 'white', borderRadius: 14, padding: '14px',
      border: '1px solid #f0f0f0', marginBottom: 10,
      boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 12, background: bg, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={17} color={color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#264653', fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>{opp.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
          <span style={{ background: bg, color, fontSize: 10, fontWeight: 700, borderRadius: 20, padding: '2px 8px' }}>
            {opp.type}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={10} color="#9ca3af" />
            <span style={{ color: '#9ca3af', fontSize: 11 }}>{opp.deadline}</span>
          </div>
        </div>
      </div>
      <ExternalLink size={15} color="#d1d5db" style={{ flexShrink: 0, cursor: 'pointer' }} />
    </div>
  )
}

export default function ThriveHubScreen() {
  return (
    <div style={{ background: '#F8F4EF' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #0f2d21, #264653)',
        padding: '52px 22px 32px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', width: 180, height: 180, borderRadius: '50%',
          background: 'radial-gradient(circle, #E9C46A 0%, transparent 70%)',
          opacity: 0.08, top: -50, right: -30, pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Star size={15} color="#E9C46A" fill="#E9C46A" />
          <span style={{ color: '#E9C46A', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>THRIVE HUB</span>
        </div>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: 24, lineHeight: 1.25, marginBottom: 8 }}>
          Recover → Rebuild →{' '}
          <span style={{ color: '#E9C46A' }}>Thrive</span>
        </h1>
        <p style={{ color: '#95C4A1', fontSize: 13, lineHeight: 1.6 }}>
          Stories, mentors, and opportunities to help you grow.
        </p>
      </div>

      <div style={{ padding: '20px 16px 36px' }}>

        {/* ── Resilience Stories ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Heart size={15} color="#2D6A4F" />
              <span style={{ color: '#264653', fontWeight: 800, fontSize: 15 }}>Resilience Stories</span>
            </div>
            <button style={{ color: '#2D6A4F', fontSize: 12, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
              See all
            </button>
          </div>

          <div style={{
            display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8,
            scrollSnapType: 'x mandatory', marginLeft: -16, marginRight: -16,
            paddingLeft: 16, paddingRight: 16,
          }}>
            {STORIES.map((s) => <StoryCard key={s.id} story={s} />)}
          </div>
        </div>

        {/* ── Mentorship Banner ── */}
        <div style={{
          borderRadius: 18, padding: '20px', marginBottom: 28,
          background: 'linear-gradient(135deg, #264653, #1B4332)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', width: 100, height: 100, borderRadius: '50%',
            background: 'radial-gradient(circle, #E9C46A, transparent)',
            opacity: 0.1, right: -20, top: -20, pointerEvents: 'none',
          }} />
          <div style={{
            width: 40, height: 40, borderRadius: 12, marginBottom: 12,
            background: 'rgba(233,196,106,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Users size={20} color="#E9C46A" />
          </div>
          <h3 style={{ color: 'white', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Connect with a Mentor</h3>
          <p style={{ color: '#95C4A1', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
            Young Rwandan leaders who've walked your path are ready to guide you.
          </p>
          <button style={{
            padding: '10px 20px', background: '#E9C46A',
            color: '#264653', fontWeight: 700, fontSize: 13,
            borderRadius: 12, border: 'none', cursor: 'pointer',
            boxShadow: '0 3px 10px rgba(233,196,106,0.35)',
          }}>
            Request Mentorship
          </button>
        </div>

        {/* ── Opportunities ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Briefcase size={15} color="#8B5E3C" />
            <span style={{ color: '#264653', fontWeight: 800, fontSize: 15 }}>Skills & Opportunities</span>
          </div>
          {OPPORTUNITIES.map((o) => <OpportunityCard key={o.id} opp={o} />)}
        </div>

        {/* ── Cultural quote ── */}
        <div style={{
          borderRadius: 16, padding: '18px 20px', textAlign: 'center',
          background: 'linear-gradient(135deg, #D8F3DC, #e8f9ec)',
          border: '1.5px solid #95C4A1',
        }}>
          <p style={{ color: '#2D6A4F', fontSize: 13, lineHeight: 1.7, fontStyle: 'italic' }}>
            "Urubohero" — a safe space where one heals, learns, grows, and is truly seen.
          </p>
          <p style={{ color: '#1B4332', fontWeight: 800, fontSize: 14, marginTop: 8 }}>You belong here.</p>
        </div>
      </div>
    </div>
  )
}
