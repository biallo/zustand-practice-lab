import type { LessonCode } from '../types'

export const subscribeWithSelectorCode: LessonCode = {
  title: '精确监听字段变化',
  snippet: `import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type PlayerState = {
  playing: boolean
  volume: number
  setPlaying: (playing: boolean) => void
  setVolume: (volume: number) => void
}

export const usePlayerStore = create<PlayerState>()(
  subscribeWithSelector((set) => ({
    playing: false,
    volume: 0.8,
    setPlaying: (playing) => set({ playing }),
    setVolume: (volume) => set({ volume }),
  })),
)

const unsubscribe = usePlayerStore.subscribe(
  (state) => state.volume,
  (volume, previousVolume) => {
    // 只有 volume 变化时触发；playing 变化不会执行这里。
    console.info('volume changed', previousVolume, '->', volume)
  },
)`,
}
