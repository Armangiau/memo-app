import { Component, ComponentProps } from 'solid-js'
import flashCardStore from '../flashCardStore'
import DeleteItem from '../../ui/actions/deleteItem'


interface deleteQestRepProps extends ComponentProps<any> {
  store: flashCardStore
  indexItemToDelete: number
}

const deleteQestRep: Component<deleteQestRepProps> = (
  props: deleteQestRepProps
) => {
  const {store, indexItemToDelete, ...oProps} = props
  return (
    <>
      <DeleteItem
        onClick={() => {
          store.deleteQestRep(indexItemToDelete)
        }}
        {...oProps}
      />
    </>
  )
}

export default deleteQestRep
