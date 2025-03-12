import { styled } from 'goober'
import { useSongConfig } from '../computed/useSongConfig.ts'
import { useCurrentLoopPlaying, useLoopRequested, useStarted } from '../lib/store.ts'
import { Arc } from './Arc.tsx'
import { PlayingAnimation } from '../../components/PlayingAnimation.tsx'

export function Stems() {
  const { files, stemOrder } = useSongConfig()
  const loopRequested = useLoopRequested.useState()
  const currentLoopPlaying = useCurrentLoopPlaying.useState()
  const started = useStarted.useState()

  const requestedStems = files[loopRequested].stems
  const playingStems = files[currentLoopPlaying].stems

  return (
    <Div>
      {stemOrder.map(stem => {
        const requested = requestedStems.includes(stem)
        const showArc = started && requestedStems.includes(stem) && !playingStems.includes(stem)
        const playing = started && playingStems.includes(stem)
        return (
          <Stem key={stem}>
            <Text active={requested}>{stem}</Text>
            {showArc ? (
              <ArcContainer>
                <Arc />
              </ArcContainer>
            ) : (
              <IconContainer active={playing}>
                {playing ? <PlayingAnimation /> : null}
              </IconContainer>
            )}
          </Stem>
        )
      })}
    </Div>
  )
}

const Div = styled('div')`
  position: fixed;
  display: flex;
  gap: 10px;
  bottom: 330px;
`

const Stem = styled('div')`
  width: 30px;
  height: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  justify-content: flex-end;
`

const IconContainer = styled('div')<{ active: boolean }>`
  opacity: ${p => (p.active ? 1 : 0.3)};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #555;
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 200ms;
`

const Text = styled('div')<{ active: boolean }>`
  opacity: ${p => (p.active ? 1 : 0.3)};
  text-align: left;
  text-transform: uppercase;
  position: fixed;
  transform-origin: 0 0;
  transform: translate(5px, -20px) rotate(-90deg);
  letter-spacing: 5px;
  white-space: nowrap;
  transition: 200ms;
`

const ArcContainer = styled('div')`
  position: fixed;
  transform: translate(6px, -23px);
`
