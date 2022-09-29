import { Component, ComponentProps } from 'solid-js'
import flashCardStore from '../flashCardStore'
import DeleteItem from '../../ui/deleteItem'


interface deleteQestRepProps extends ComponentProps<any> {
  flashCard: string
  indexItemToDelete: number
}

const deleteQestRep: Component<deleteQestRepProps> = (
  props: deleteQestRepProps
) => {
  return (
    <>
      <DeleteItem
        onClick={() => {
          flashCardStore.deleteQestRep(props.flashCard, props.indexItemToDelete)
        }}
      />
    </>
  )
}

export default deleteQestRep
