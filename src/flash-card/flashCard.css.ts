import { style } from "@vanilla-extract/css"
import { rText } from '../ui/styles/vars'

export const titleSize = style({
  fontSize: `clamp(${rText('2xl')}, 7vw, ${rText('5xl')})`,
})