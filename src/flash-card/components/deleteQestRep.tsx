import { Component, ComponentProps } from 'solid-js'
import flashCardStore from '../flashCardStore'
import DeleteItem from '../../ui/actions/deleteItem'
import { flee } from '../../ui/animation/delete'


interface deleteQestRepProps extends ComponentProps<any> {
  store: flashCardStore
  indexItemToDelete: number
}

const deleteQestRep: Component<deleteQestRepProps> = (
  props: deleteQestRepProps
) => {
  const {store, indexItemToDelete, ...oProps} = props

  const deleteQR = async (evt: MouseEvent) => {
    await flee((evt.currentTarget as HTMLElement)?.parentElement)
    store.deleteQestRep(indexItemToDelete)
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
