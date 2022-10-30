import { style } from '@vanilla-extract/css'
import { textColor, color, rHeightWidth } from '../styles/vars'

const btnCircle = style({
  color: textColor('white'),
  background: color('primary'),
  height: rHeightWidth('sm'),
  width: rHeightWidth('sm'),
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'filter 0.15s ease-out',
  ':hover': {
    filter: 'saturate(95%) brightness(90%) '
  }
})

export default btnCircle
