import { useAppStore } from './store/useAppStore'
import BottomNav from './components/layout/BottomNav'
import WelcomeScreen from './screens/WelcomeScreen'
import ChatScreen from './screens/ChatScreen'
import CareNavigatorScreen from './screens/CareNavigatorScreen'
import DrugAvailabilityScreen from './screens/DrugAvailabilityScreen'
import ThriveHubScreen from './screens/ThriveHubScreen'

const SCREENS = {
  welcome: WelcomeScreen,
  chat: ChatScreen,
  navigator: CareNavigatorScreen,
  drugs: DrugAvailabilityScreen,
  thrive: ThriveHubScreen,
}

export default function App() {
  const activeScreen = useAppStore((s) => s.activeScreen)
  const Screen = SCREENS[activeScreen] || WelcomeScreen

  // Chat needs its own internal scroll — all others are simple scrollable pages
  const isChatScreen = activeScreen === 'chat'

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: '#1a3a2e',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 430,
          height: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          background: '#F8F4EF',
          boxShadow: '0 0 60px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}
      >
        {/* Screen area */}
        {isChatScreen ? (
          // Chat manages its own internal scroll
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Screen />
          </div>
        ) : (
          // All other screens: simple scrollable page
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Screen />
          </div>
        )}

        {/* Bottom nav — always at the bottom, never overlaps content */}
        <BottomNav />
      </div>
    </div>
  )
}
