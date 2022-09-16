import { Component } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { For } from 'solid-js/web'
import { my_db, addFlashCardInDB } from './database'
import { Link } from '@solidjs/router'
import SaveFlashCards from './SaveFlashCards'
import PlusSVGlg from './plusSVGlg'
import { DeleteMenuItem } from "./deleteItem";

const DBMenuCards = await my_db.getAll('flash-cards')

export const [flashCards, setFlashCards] = createStore(DBMenuCards.map(card => card.name).reverse())

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
                class='h-32 hover:bg-sky-50 text-gray-700 p-5 rounded-2xl border-sky-300 border-2 font-bold text-lg active:focus:scale-95 flex-center'
              >
                {flashCardName}
              </Link>
              <div class='relative -top-28 -right-24'>
                  <DeleteMenuItem flashCardToDelete={flashCardName}/>
              </div>
            </div>
          )}
        </For>
      </div>

      <label
        class='fixed h-16 w-16 bottom-32 rond-sky-500 modal-button'
        style='right: 10%'
        for='menu-modal'
      >
        <input type='checkbox' class='modal-toggle' id='menu-modal' />

        <div class='modal modal-bottom md:modal-middle'>
          <div class='modal-box '>
            <h3 class='font-bold text-lg'>Ajouter une nouvelle flash-card :</h3>
            <input
              type='text'
              class='input input-bordered input-primary w-full my-4'
              ref={userTitle}
            />
            <div class='modal-action'>
              <label
                for='menu-modal'
                class='btn btn-secondary'
                onClick={() => {
                  if (userTitle) {
                    if (!userTitle.value.trim()) return
                    addFlashCard(userTitle.value)
                    userTitle.value = ''
                  }
                }}
              >
                <button>Ajouter</button>
              </label>
            </div>
          </div>
        </div>
        <span class='text-white'>
          <PlusSVGlg />
        </span>
      </label>
      <SaveFlashCards />
    </>
  )
}

export default Menu
