import { Component, ComponentProps } from 'solid-js';
import { color, ColorsAndSizes, rHeightWidth, rPadding, rText } from '../styles/vars';
import { inputs, textarea } from './inputs.css'

type textareaProps = ComponentProps<'textarea'> & ColorsAndSizes

const Textarea: Component<textareaProps> = (props: textareaProps) => {
  const colorComp = color(props.color)
  return (
    <textarea {...props} class={`${inputs} ${textarea} ${props?.class}`} style={{
      "border-color": colorComp,
      "outline-color": colorComp,
      "font-size": rText(props.size),
      "min-height": rHeightWidth(props.size),
      padding: `${rPadding(props.size, 0.5)} ${rPadding(props.size)}`
    }}>{props.children}</textarea>
  )
}
export default Textarea;