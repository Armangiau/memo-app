import { Component, ComponentProps } from 'solid-js';
import { ColorsAndSizes } from '../styles/vars';
import { inputStyle } from './communDynStyle';
import { inputs, input } from './inputs.css'

type inputProps = ColorsAndSizes & ComponentProps<'input'>

const Input: Component<inputProps> = (props: inputProps) => {
  return (
    <input {...props} class={`${inputs} ${input} ${props?.class}`} style={inputStyle(props)}/>
  )
}

export default Input;