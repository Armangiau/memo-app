import { Component, ComponentProps } from 'solid-js'
import PlusSVGlg from '../svg/plusSVGlg'
import BtnCircle from './btnCircle'
import deleteItem from './deleteItem.css'
import { colors } from '../styles/var.css'

interface deleteMenuProps extends ComponentProps<'button'> {
  class?: string,
  color?: colors
}

const DeleteItem: Component<deleteMenuProps> = (props: deleteMenuProps) => { 
  return (
      <BtnCircle
        {...props}
        class={deleteItem + ' ' + props?.class}
        size='xs'
      >
        <PlusSVGlg />
      </BtnCircle>
  )
}

export default DeleteItem
