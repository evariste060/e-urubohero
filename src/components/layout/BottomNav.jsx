import { Home, MessageCircle, MapPin, Pill, Star } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

const NAV = [
  { id: 'welcome', icon: Home, label: 'Home' },
  { id: 'chat', icon: MessageCircle, label: 'Agasaza' },
  { id: 'navigator', icon: MapPin, label: 'Clinics' },
  { id: 'drugs', icon: Pill, label: 'Drugs' },
  { id: 'thrive', icon: Star, label: 'Thrive' },
]

export default function BottomNav() {
  const { activeScreen, setScreen } = useAppStore()

  return (
    <nav
      className="w-full bg-white border-t border-gray-100 flex-shrink-0"
      style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}
    >
      <div className="flex" style={{ height: '64px' }}>
        {NAV.map(({ id, icon: Icon, label }) => {
          const active = activeScreen === id
          return (
            <button
              key={id}
              onClick={() => setScreen(id)}
              className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors"
              style={{ color: active ? '#2D6A4F' : '#9ca3af' }}
            >
              <Icon
                size={21}
                strokeWidth={active ? 2.5 : 1.8}
                fill={active && id === 'thrive' ? '#2D6A4F' : 'none'}
              />
              <span
                className="text-[10px] font-semibold tracking-wide"
                style={{ color: active ? '#2D6A4F' : '#9ca3af' }}
              >
                {label}
              </span>
              {active && (
                <div
                  className="absolute bottom-0 rounded-full"
                  style={{ width: '4px', height: '4px', background: '#2D6A4F' }}
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
