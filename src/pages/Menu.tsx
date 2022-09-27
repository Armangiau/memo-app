import { Component } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { For } from 'solid-js/web'
import { my_db, addFlashCardInDB } from '../web_api/database'
import { Link } from '@solidjs/router'
import SaveFlashCards from '../components/SaveFlashCards'
import PlusSVGlg from '../components/plusSVGlg'
import { DeleteMenuItem } from '../components/deleteItem'
import Modale, { openModal } from '../components/Modale'

const DBMenuCards = await my_db.getAll('flash-cards')

export const [flashCards, setFlashCards] = createStore(
  DBMenuCards.map(card => card.name).reverse()
)

const addFlashCard = async (newTitle: string) => {
  if (await addFlashCardInDB(newTitle))
    setFlashCards(
      produce(flashCards => {
        flashCards.unshift(newTitle)
      })
    )
}

const Menu: Component = () => {
  let userTitle: HTMLInputElement | undefined

  return (
    <>
      <div
        class='mx-auto max-w-7xl grid gap-6 justify-center p-5'
        style='grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr))'
      >
        <For each={flashCards}>
          {flashCardName => (
            <div>
              <Link
                href={`/flashCard/${flashCardName}`}
                class='h-32 w-32 hover:bg-sky-50 text-gray-700 p-5 rounded-2xl border-sky-300 border-2 font-bold text-lg active:focus:scale-95 flex-center'
              >
                {flashCardName.length < 36 ? flashCardName : flashCardName.slice(0, 36 - 3) + '...'}
              </Link>
              <div class='relative -top-28 -right-24'>
                <DeleteMenuItem flashCardToDelete={flashCardName} />
              </div>
            </div>
          )}
        </For>
      </div>

      <Modale
        onSubmitModal={() => {
          if (userTitle) {
            if (!userTitle.value.trim()) return
            addFlashCard(userTitle.value)
            userTitle.value = ''
          }
        }}
        submitNameButton = 'Ajouter'
      >
        <>
          <h3 class='font-bold text-lg'>Ajouter une nouvelle flash-card :</h3>
          <input
            type='text'
            class='input input-bordered input-primary w-full my-4'
            ref={userTitle}
          />
        </>
      </Modale>

      <button
        class='fixed h-16 w-16 bottom-32 rond-sky-500 modal-button text-white'
        style='right: 10%'
        onClick={openModal}
      >
        <PlusSVGlg />
      </button>
      <SaveFlashCards />
    </>
  )
}

export default Menu
