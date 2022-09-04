import { Component, ComponentProps } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { For } from 'solid-js/web'
import { openDB, deleteDB, wrap, unwrap } from 'idb'

const db = await openDB('flash-cards', 1, {
  upgrade (db) {
    db.createObjectStore('menu-cards')
  }
})

await db.put('menu-cards', 7, 'keyp').catch(e => console.log(e))
await db.put('menu-cards', 7, 'keye').catch(e => console.log(e))

const DBMenuCards = await db.getAll('menu-cards')

const [flashCards, setFlashCards] = createStore(DBMenuCards.reverse())

const addFlashCard = async (newTitle:string) => { 
  setFlashCards(
    produce((flashCards) => {
      flashCards.push(newTitle)
    }),
  )
  await db.put('menu-cards', newTitle, newTitle).catch(e => console.log(e))
}

const Menu = () => {
  let userTitle: HTMLInputElement | undefined
  return (
    <>
      <div
        class='mx-auto max-w-7xl grid gap-6 justify-center p-5'
        style='grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr))'
      >
        <For each={flashCards}>
          {flashCard => (
            <button class='h-40 hover:bg-sky-50 text-gray-700 p-5 rounded-2xl border-sky-300 border-2 font-bold text-lg active:focus:scale-95'>
              {flashCard}
            </button>
          )}
        </For>
      </div>

      <label
        class='fixed h-20 w-20 bottom-20 right-10 bg-sky-500 modal-button'
        style='border-radius: 50%'
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

        <svg
          fill='currentColor'
          viewBox='0 0 16 16'
          class='relative h-16 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white cursor-pointer'
        >
          <path d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z' />
        </svg>
      </label>
    </>
  )
}

export default Menu
