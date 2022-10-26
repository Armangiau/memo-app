import { Component, ComponentProps} from 'solid-js';
import { btn } from './button.css'
import { palette, colors } from '../styles/var.css';

interface ButtonProps extends ComponentProps<'button'> {
  color? : colors
}

const Button: Component<ButtonProps> = (props: ButtonProps) => {
  const {children, color,...otherProps} = props
  const bgcolor = color ? palette.dark[color] : undefined

  return (
    <button class={btn + ' ' + otherProps.class} {...otherProps} style={{
      background: bgcolor,
    }}>
      {children}
    </button>
  )
}

export default Button;


