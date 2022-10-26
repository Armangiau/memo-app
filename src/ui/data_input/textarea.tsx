import { Component, ComponentProps } from 'solid-js';
import { Colors, color, rHeightWidth, rPadding, Sizes, rText } from '../styles/vars';
import style from './textarea.css'

interface textareaProps extends ComponentProps<'textarea'> {
  color?: Colors,
  size?: Sizes,
}

const Textarea: Component<textareaProps> = (props: textareaProps) => {
  const colorComp = color(props.color)?.dark
  return (
    <textarea {...props} class={style + ' ' + props?.class} style={{
      "border-color": colorComp,
      "outline-color": colorComp,
      "font-size": rText(props.size),
      "min-height": rHeightWidth(props.size),
      padding: `${rPadding(props.size, 0.5)} ${rPadding(props.size)}`
    }}>{props.children}</textarea>
  )
}

export default Textarea;