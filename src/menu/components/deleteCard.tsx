import { Component, ComponentProps } from 'solid-js'
import { deleteFlashCardInDB } from '../../web_api/database'
import menuStore from '../menuStore'
import DeleteItem from '../../ui/actions/deleteItem'
import { flee } from '../../ui/animation/delete'

interface deleteMenuItemProps extends ComponentProps<any> {
  flashCardToDelete: string
}

const DeleteCard: Component<deleteMenuItemProps> = (
  props: deleteMenuItemProps
) => {

  const deleteCard = async (evt: MouseEvent) => {
    await flee((evt.currentTarget as HTMLElement).parentElement?.parentElement)
    deleteFlashCardInDB(props.flashCardToDelete)
    menuStore.updateMenu(props.flashCardToDelete)
  }

  return (
    <>
      <DeleteItem
        onClick={deleteCard}
      />
    </>
  )
}

export default DeleteCard