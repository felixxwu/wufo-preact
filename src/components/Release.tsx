import { useState } from 'preact/hooks'
import { BORDER_RADIUS, BOX_SHADOW, TEXT_COLOR } from '../lib/consts'
import { styled } from '../lib/styled'
import { IRelease, ISong } from '../lib/types'
import { PlayPause } from './PlayPause'
import { Song } from './Song'
import { Link } from './Link'
import { Spotify } from '../icons/spotify'
import { Apple } from '../icons/apple'
import { SoundCloud } from '../icons/soundcloud'
import { YouTube } from '../icons/youtube'
import { css } from '@emotion/css'

const IMAGE_SIZE = 120
export const ANIMATION_INTERVAL = 0.3

export function Release({
  release,
  index,
  songLinkPlaying,
  onSongClick,
}: {
  release: IRelease
  index: number
  songLinkPlaying: string | null
  onSongClick: (song: ISong) => void
}) {
  const [hovering, setHovering] = useState<number | null>(null)

  return (
    <Container
      style={{
        animationDelay: `${2 + index * ANIMATION_INTERVAL}s`,
        ...(index === 0
          ? { gridTemplateAreas: `'image' 'title' 'divider' 'songs'`, gridTemplateColumns: '1fr' }
          : {}),
      }}
    >
      <Image style={index === 0 ? { width: '100%', margin: 'auto' } : {}} src={release.cover} />
      <TitleAndLinks>
        <Title onClick={() => onSongClick(release.songs[0])}>
          <PlayPause playing={false} color={release.color} />
          {release.title}
        </Title>
        <Links>
          <Link name='Spotify' Icon={Spotify} href={release.spotify} />
          <Link name='SoundCloud' Icon={SoundCloud} href={release.soundcloud} />
          <Link name='YouTube' Icon={YouTube} href={release.youtube} />
          <Link name='Apple' Icon={Apple} href={release.apple} />
        </Links>
      </TitleAndLinks>
      <Divider />
      <Songs>
        {release.songs.map((song, i) => (
          <Song
            song={song}
            index={i}
            hovering={hovering === i}
            playing={songLinkPlaying === song.link}
            pointerenter={() => setHovering(i)}
            pointerleave={() => setHovering(null)}
            onclick={() => onSongClick(song)}
          />
        ))}
      </Songs>
    </Container>
  )
}

const Container = styled(
  'div',
  {
    display: 'grid',
    gap: '20px',
    color: TEXT_COLOR,
    margin: '0 20px',

    opacity: '0',
    animationName: 'fade-in',
    animationDuration: '1s',
    animationFillMode: 'forwards',
  },
  css`
    grid-template-columns: ${IMAGE_SIZE}px 1fr;
    grid-template-areas: 'image title' 'divider divider' 'songs songs';

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      grid-template-areas: 'image' 'title' 'divider' 'songs';
    }
  `
)

const Image = styled('img', {
  gridArea: 'image',
  width: `${IMAGE_SIZE}px`,
  maxWidth: '100%',
  aspectRatio: '1/1',
  objectFit: 'cover',
  borderRadius: `${BORDER_RADIUS}px`,
  boxShadow: BOX_SHADOW,
})

const TitleAndLinks = styled('div', {
  gridArea: 'title',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
})

const Title = styled(
  'div',
  {
    fontSize: '30px',
    letterSpacing: '-1px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  css`
    &:hover {
      text-decoration: underline;
    }
  `
)

const Links = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  opacity: '0.9',
})

const Divider = styled('div', {
  gridArea: 'divider',
  width: '100%',
  height: '1px',
  backgroundColor: TEXT_COLOR,
  opacity: '0.8',
})

const Songs = styled('div', {
  gridArea: 'songs',
  display: 'flex',
  flexDirection: 'column',
})
