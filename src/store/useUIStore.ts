import { create } from 'zustand'

type UIState = {
  isMusicPlaying: boolean
  toggleMusic: () => void
  setMusicPlaying: (playing: boolean) => void
  isEnvelopeOpen: boolean
  setEnvelopeOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isMusicPlaying: false,
  toggleMusic: () => set((state) => ({ isMusicPlaying: !state.isMusicPlaying })),
  setMusicPlaying: (playing) => set({ isMusicPlaying: playing }),
  isEnvelopeOpen: false,
  setEnvelopeOpen: (open) => set({ isEnvelopeOpen: open }),
}))
