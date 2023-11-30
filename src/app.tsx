import { Background } from './components/Background'
import './styles.css'
import { styled } from './lib/styled'
import { UI } from './components/UI'
import { useEffect, useState } from 'preact/hooks'
import { Color } from './lib/types'
import { content } from './lib/content'
import { BlurryImageLoad } from './lib/blurryLoad'
import { Logos2 } from './components/Logo2'

export function App() {
  const [color, setColor] = useState<Color>([50, 50, 50])

  useEffect(() => {
    const blurryImageLoad = new BlurryImageLoad()
    blurryImageLoad.load()
  }, [])

  return (
    <Container>
      <Background color={color} />
      {content.releases.length > 1 && <Logos2 />}
      <UI setColor={setColor} />
    </Container>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
})
