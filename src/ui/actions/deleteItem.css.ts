import { style } from "@vanilla-extract/css";
import { rHeightWidth, textColor, color } from "../styles/vars";

const deleteItem = style({
  height: rHeightWidth('xs'),
  width: rHeightWidth('xs'),
  transform: 'rotate(45deg)',
  color: textColor('white'),
  background: color('primary')?.dark,
  borderRadius: '50%',
})

export default deleteItem