import { Component, ComponentProps } from 'solid-js'
import PlusSVGlg from '../svg/plusSVGlg'
import BtnCircle from './btnCircle'
import deleteItem from './deleteItem.css'
import { ColorsAndSizes, xs } from '../styles/vars'

type deleteMenuProps = ComponentProps<'button'> & ColorsAndSizes

const DeleteItem: Component<deleteMenuProps> = (props: deleteMenuProps) => { 
  return (
      <BtnCircle
        {...props}
        class={deleteItem + ' ' + props?.class}
        size={xs}
      >
        <PlusSVGlg />
      </BtnCircle>
  )
}

export default DeleteItem
