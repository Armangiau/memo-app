import { style } from "@vanilla-extract/css";
import { palette, sizes } from "../styles/var.css";

const deleteItem = style({
  height: sizes.buttons.heights.xs,
  width: sizes.buttons.heights.xs,
  transform: 'rotate(45deg)',
  color: palette.text.white,
  background: palette.whiteBgText.primary,
  borderRadius: '50%',
})

export default deleteItem