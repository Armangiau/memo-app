import { Component, ComponentProps } from 'solid-js';
import { color, rHeightWidth, ColorsAndSizes } from "../styles/vars";
import btn from './btnCircle.css'

type btnCircleProps = ComponentProps<'button'> & ColorsAndSizes

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