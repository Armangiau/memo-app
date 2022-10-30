import { Component, ComponentProps} from 'solid-js';
import { btn } from './button.css'
import { color, Colors } from '../styles/vars';

type ButtonProps = ComponentProps<'button'> & {
  color? : Colors
}

const Button: Component<ButtonProps> = (props: ButtonProps) => {
  return (
    <button {...props} class={btn + ' ' + props.class} style={{
      background: color(props.color)?.dark,
    }}>
      {props.children}
    </button>
  )
}

export default Button;


