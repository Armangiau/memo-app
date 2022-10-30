import { Component, ComponentProps } from 'solid-js';
import { color, rHeightWidth, ColorsAndSizes, textColorFill } from "../styles/vars";
import btn from './btnCircle.css'

type btnCircleProps = ComponentProps<'button'> & ColorsAndSizes

const BtnCircle: Component<btnCircleProps> = (props: btnCircleProps) => {
  return (
    <button {...props} class={`${btn} ${props?.class}`} style={{
      background: color(props.color, props.fill),
      height: rHeightWidth(props.size),
      width: rHeightWidth(props.size),
      color: textColorFill(props.fill)
    }}
    >
      {props.children}
    </button>
  )
}

export default BtnCircle;