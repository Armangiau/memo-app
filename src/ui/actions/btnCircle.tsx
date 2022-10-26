import { Component, ComponentProps, splitProps } from 'solid-js';
import { color, rHeightWidth, Sizes, Colors } from "../styles/vars";
import btn from './btnCircle.css'

interface btnCircleProps extends ComponentProps<'button'> {
  color?: Colors,
  size?: Sizes,
}

const BtnCircle: Component<btnCircleProps> = (props: btnCircleProps) => {
  return (
    <button {...props} class={btn + ' ' + props?.class} style={{
      background: color(props.color)?.dark,
      height: rHeightWidth(props.size),
      width: rHeightWidth(props.size),
    }}
    >
      {props.children}
    </button>
  )
}

export default BtnCircle;