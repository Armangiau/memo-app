import { Component, ComponentProps } from 'solid-js'
import DeleteItem from '../../ui/actions/deleteItem'
import { flee } from '../../ui/animation/delete'
import { useFlashCard } from '../flashCardStore'


interface deleteQestRepProps extends ComponentProps<any> {
  indexItemToDelete: number
}

const deleteQestRep: Component<deleteQestRepProps> = (
  props: deleteQestRepProps
) => {
  const { deleteQestRep } = useFlashCard()
  const {store, indexItemToDelete, ...oProps} = props

  const deleteQR = async (evt: MouseEvent) => {
    await flee((evt.currentTarget as HTMLElement)?.parentElement)
    deleteQestRep(indexItemToDelete)
  }
  
  return (
    <>
      <DeleteItem
        onClick={deleteQR}
        {...oProps}
      />
    </>
  )
}

export default deleteQestRep
