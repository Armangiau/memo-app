import { color, rHeightWidth, rPadding, rText, ColorsAndSizes } from '../styles/vars';

export const inputStyle = (props: ColorsAndSizes) => {
  const colorComp = color(props.color)?.dark
  return {
    "border-color": colorComp,
    "outline-color": colorComp,
    "font-size": rText(props.size),
    height: rHeightWidth(props.size),
    padding: `0 ${rPadding(props.size)}`
  }
}