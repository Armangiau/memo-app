import { Component, ComponentProps } from 'solid-js'
import PlusSVGlg from './plusSVGlg'

interface deleteMenuProps extends ComponentProps<any> {
  onClick: () => void
}

const DeleteItem: Component<deleteMenuProps> = (props: deleteMenuProps) => {
  return (
    <button
      class='rond-sky-500 flex-center h-6 w-6 rotate-45 text-white'
      onClick={() => props.onClick()}
    >
      <PlusSVGlg />
    </button>
  )
}

export default DeleteItem