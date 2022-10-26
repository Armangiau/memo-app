import { Component, ComponentProps, splitProps } from 'solid-js';
import { palette, colors, sizes, metrics } from "../styles/var.css";
import btn from './btnCircle.css'

interface btnCircleProps extends ComponentProps<'button'> {
  color?: colors,
  size?: metrics,
}

const BtnCircle: Component<btnCircleProps> = (props: btnCircleProps) => {
  const [rules, oProps] = splitProps(props, ['color', 'size'])
  const bg = rules.color ? palette.dark[rules.color] : undefined
  const size = rules.size ? sizes.buttons.heights[rules.size] : undefined
  return (
    <button {...oProps} class={btn + ' ' + oProps?.class} style={{
      background: bg,
      height: size,
      width: size,
    }}
    >
      {oProps.children}
    </button>
  )
}

export default BtnCircle;