import { Component, ComponentProps } from 'solid-js';
import { inputStyle } from './communDynStyle';
import { ColorsAndSizes } from '../styles/vars';
import { inputs, input } from './inputs.css'

type selectProps = ColorsAndSizes & ComponentProps<'select'>

const Select: Component<selectProps> = (props: selectProps) => {
  return (
    <select {...props} class={`${inputs} ${input} ${props?.class}`} style={inputStyle(props)}>{props.children}</select>
  )
}

export default Select;