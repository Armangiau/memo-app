import { style } from '@vanilla-extract/css'
import { palette, sizes } from '../styles/var.css'

const btnCircle = style({
  color: palette.text.white,
  background: palette.whiteBgText.primary,
  height: sizes.buttons.heights.sm,
  width: sizes.buttons.heights.sm,
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'filter 0.15s ease-out',
  ':hover': {
    filter: 'saturate(95%) brightness(90%) '
  }
})

export default btnCircle
