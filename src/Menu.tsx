import { Component } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { For } from 'solid-js/web'
import { my_db, addFlashCardInDB } from './database'
import { Link } from '@solidjs/router'
import SaveFlashCards from './SaveFlashCards'
import PlusSVGlg from './plusSVGlg'

const DBMenuCards = await my_db.getAll('flash-cards')

const [flashCards, setFlashCards] = createStore(DBMenuCards.reverse())

const addFlashCard = async (newTitle: string) => {
  if (await addFlashCardInDB(newTitle))
  setFlashCards(
    produce(flashCards => {
      flashCards.unshift({ name: newTitle })
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
          {flashCard => (
            <Link
              href={`/flashCard/${flashCard.name}`}
              class='h-32 hover:bg-sky-50 text-gray-700 p-5 rounded-2xl border-sky-300 border-2 font-bold text-lg active:focus:scale-95 flex-center'
            >
              {flashCard.name}
            </Link>
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
                Ajouter
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
