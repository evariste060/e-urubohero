import { create } from 'zustand'

export const useAppStore = create((set, get) => ({
  // Navigation
  activeScreen: 'welcome',
  setScreen: (screen) => set({ activeScreen: screen }),

  // Chat
  messages: [],
  isTyping: false,
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  setTyping: (val) => set({ isTyping: val }),
  clearChat: () => set({ messages: [] }),

  // Care Navigator
  userLocation: '',
  selectedInsurance: '',
  selectedCareType: '',
  setLocation: (v) => set({ userLocation: v }),
  setInsurance: (v) => set({ selectedInsurance: v }),
  setCareType: (v) => set({ selectedCareType: v }),
  clinicResults: [],
  setClinicResults: (v) => set({ clinicResults: v }),

  // Drug search
  drugQuery: '',
  drugResults: [],
  setDrugQuery: (v) => set({ drugQuery: v }),
  setDrugResults: (v) => set({ drugResults: v }),
}))
