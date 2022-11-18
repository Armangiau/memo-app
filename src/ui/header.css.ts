import { style } from '@vanilla-extract/css'
import { color, rHeightWidth, rText, textColor } from './styles/vars'

export const header = style({
  width: '100vw',
  height: `clamp(0rem, 25vw, ${rHeightWidth('3xl')})`,
  textAlign: 'center',
  borderBottom: `2px solid ${textColor('black')}`,
})

export const heading = style({
  fontSize: `clamp(${rText('2xl')}, 9vw, ${rText('6xl')})`,
  fontWeight: 600,
  background: `linear-gradient(to right,  ${color('action')} 0%, ${color('action')} 16.5%, ${color('primary')} 16.5%, ${color('primary')} 49.5%,  ${color('secondary')} 49.5%, ${color('secondary')} 82.5%, ${color('action')} 82.5%, ${color('action')} 100%)`,
  WebkitTextFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  backgroundSize: '400%',
})