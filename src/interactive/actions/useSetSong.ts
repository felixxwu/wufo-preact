import { config } from '../lib/config.ts'
import { useLoopRequested, useSongNum } from '../lib/store.ts'
import { useStop } from './useStop.ts'

export function useSetSong() {
  const stop = useStop()

  return (songNum: number) => {
    if (songNum < 0 || songNum >= config.length) return

    useLoopRequested.set(1)
    useSongNum.set(songNum)
    stop()
  }
}
