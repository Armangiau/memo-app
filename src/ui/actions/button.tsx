import { Component, ComponentProps} from 'solid-js';
import { btn } from './button.css'
import { color, textColorFill, ColorsAndSizes, rHeightWidth, rText } from '../styles/vars';

type ButtonProps = ComponentProps<'button'> & ColorsAndSizes

const Button: Component<ButtonProps> = (props: ButtonProps) => {
  return (
    <button {...props} class={`${btn} ${props?.class}`} style={{
      background: color(props.color, props.fill),
      color: textColorFill(props.fill),
      height: rHeightWidth(props.size),
      "font-size": rText(props.size)
    }}>
      {props.children}
    </button>
  )
}

export default Button;


