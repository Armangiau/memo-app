import { style } from '@vanilla-extract/css'
import { rPadding, rHeightWidth, color, textColor } from '../styles/vars'

export const btn = style(
  {
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    height: rHeightWidth('md'),
    padding: rPadding('md'),
    borderRadius: '.5rem',
    fontWeight: 600,
    color: textColor('white'),
    background: color('primary')?.dark,
    transition: 'filter 0.15s ease-out, transform 0.15s ease-out',
    ':hover': {
      filter: 'saturate(95%) brightness(95%)'
    },
    ':active': {
      transform: 'scale(.95)'
    }
  },
)
