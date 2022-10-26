import { Component, ComponentProps } from 'solid-js';
import { Colors, color, rHeightWidth, rPadding, Sizes, rText } from '../styles/vars';
import style from './input.css'

interface inputProps extends ComponentProps<'input'> {
  color?: Colors,
  size?: Sizes,
}

const Input: Component<inputProps> = (props: inputProps) => {
  const colorComp = color(props.color)?.dark
  return (
    <input {...props} class={style + ' ' + props?.class} style={{
      "border-color": colorComp,
      outline: `2px solid ${colorComp}`,
      "font-size": rText(props.size),
      height: rHeightWidth(props.size),
      padding: `0 ${rPadding(props.size)}`
    }}/>
  )
}

export default Input;