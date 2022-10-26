import { style } from '@vanilla-extract/css'
import { palette, sizes } from '../styles/var.css'

export const btn = style(
  {
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    height: sizes.buttons.heights.md,
    padding: sizes.buttons.paddings.md,
    borderRadius: '.5rem',
    fontWeight: 600,
    color: palette.text.white,
    background: palette.dark.primary,
    transition: 'filter 0.15s ease-out, transform 0.15s ease-out',
    ':hover': {
      filter: 'saturate(95%) brightness(95%)'
    },
    ':active': {
      transform: 'scale(.95)'
    }
  },
)
