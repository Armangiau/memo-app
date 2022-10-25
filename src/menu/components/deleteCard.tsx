import { Component, ComponentProps } from 'solid-js'
import { deleteFlashCardInDB } from '../../web_api/database'
import menuStore from '../menuStore'
import DeleteItem from '../../ui/actions/deleteItem'

interface deleteMenuItemProps extends ComponentProps<any> {
  flashCardToDelete: string
}

const DeleteCard: Component<deleteMenuItemProps> = (
  props: deleteMenuItemProps
) => {
  return (
    <>
      <DeleteItem
        onClick={() => {
          deleteFlashCardInDB(props.flashCardToDelete)
          menuStore.updateMenu(props.flashCardToDelete)
        }}
      />
    </>
  )
}

export default DeleteCard