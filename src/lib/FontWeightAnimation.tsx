import { JSX } from 'preact/jsx-runtime'
import { styled } from 'goober'

export function FontWeightAnimation(props: {
  children: JSX.Element
  delay: number
  duration?: number
}) {
  return (
    <Container
      style={{
        animationDelay: `${props.delay}ms`,
        animationDuration: `${props.duration ?? 2000}ms`,
      }}
    >
      {props.children}
    </Container>
  )
}

const Container = styled('div')`
  font-weight: 750;
`
