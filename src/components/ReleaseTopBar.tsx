import { useState } from 'preact/hooks'
import { Back } from '../icons/back'
import { content } from '../lib/content'
import { styled } from '../lib/styled'
import { Button } from './Button'
import { Tick } from '../icons/tick'
import { Copy } from '../icons/copy'
import { sleep } from '../lib/sleep'
import { singleSongMode } from '../lib/singleSongMode'

export function ReleaseTopBar() {
  const [shared, setShared] = useState(false)

  const handleCopy = async () => {
    navigator.clipboard.writeText('https://wufo.uk/' + content.releases[0].slug)
    setShared(true)
    await sleep(2000)
    setShared(false)
  }

  if (!singleSongMode()) return null

  return (
    <Buttons>
      <Button label='All Releases' href='/' Icon={Back} />
      <Button
        label={shared ? 'Link Copied' : 'Copy Link'}
        Icon={shared ? Tick : Copy}
        onClick={handleCopy}
      />
    </Buttons>
  )
}

const Buttons = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',

  opacity: '0',
  animationName: 'fade-in',
  animationDuration: '2s',
  animationFillMode: 'forwards',
})
