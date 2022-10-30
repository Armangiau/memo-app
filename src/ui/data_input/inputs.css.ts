import { style } from '@vanilla-extract/css'
import {
  rPadding,
  rRadius,
  color,
  background,
  textColor,
  rHeightWidth,
  rText
} from '../styles/vars'

export const inputs = style({
  borderWidth: '1px',
  borderRadius: rRadius('md'),
  color: textColor('black'),
  fontSize: rText('md'),
  backgroundColor: background,
  borderColor: color('primary')?.dark,
  ':focus': {
    outline: `2px solid ${color('primary')?.dark}`,
    outlineOffset: '2px'
  }
})

export const input = style({
  height: rHeightWidth('md'),
  paddingLeft: rPadding('md'),
  paddingRight: rPadding('md'),
})

export const textarea = style({
  minHeight: rHeightWidth('md'),
  padding: `${rPadding('md', 0.5)} ${rPadding('md')}`,
})
