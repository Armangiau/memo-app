import { Component, ComponentProps } from 'solid-js'
import { mise_à_jour_flashCard, deleteFlashCardInDB } from './database'
import { createStore, produce } from 'solid-js/store'
import PlusSVGlg from './plusSVGlg'

interface deleteMenuProps extends ComponentProps<any> {
  onClick: () => void
}

const DeleteItem: Component<deleteMenuProps> = (props: deleteMenuProps) => {
  return (
    <button
      class='rond-sky-500 flex-center h-6 w-6 rotate-45'
      onClick={() => props.onClick()}
    >
      <PlusSVGlg />
    </button>
  )
}

const updateMenu = async (flashCardToDelete: string) => {
  const menu = await import('./Menu')
  const [flashCards, setFlashCards] = [menu.flashCards, menu.setFlashCards]
  const indexFlashCardToDelete = flashCards.indexOf(flashCardToDelete)
  setFlashCards(
    produce(flashCards => {
      flashCards.splice(indexFlashCardToDelete, 1)
    })
  )
}

interface deleteMenuItemProps extends ComponentProps<any> {
  flashCardToDelete: string
}

export const DeleteMenuItem: Component<deleteMenuItemProps> = (
  props: deleteMenuItemProps
) => {
  return (
    <>
      <DeleteItem
        onClick={() => {
          deleteFlashCardInDB(props.flashCardToDelete)
          updateMenu(props.flashCardToDelete)
        }}
      />
    </>
  )
}

const deleteBlockInFlashCard = (
  flashCard: string,
  indexItemToDelete: number
) => {
  mise_à_jour_flashCard(flashCard, questRép => {
    questRép.questionsRéponses.splice(indexItemToDelete, 1)
    return questRép
  })
}

const updateFlashCard = async (indexItemToDelete: number) => {
  const flashCard = await import('./flashCard')
  const setQuestionsRéponses = flashCard.setQuestionsRéponses
  setQuestionsRéponses(
    produce(flashCard => {
      flashCard.splice(indexItemToDelete, 1)
    })
  )
}

interface deleteFlashCardBlockProps extends ComponentProps<any> {
  flashCard: string
  indexItemToDelete: number
}

export const DeleteFlashCardBlock: Component<deleteFlashCardBlockProps> = (
  props: deleteFlashCardBlockProps
) => {
  return (
    <>
      <DeleteItem
        onClick={() => {
          deleteBlockInFlashCard(props.flashCard, props.indexItemToDelete)
          updateFlashCard(props.indexItemToDelete)
        }}
      />
    </>
  )
}
