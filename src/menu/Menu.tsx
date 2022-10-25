import { Component } from 'solid-js'
import { For } from 'solid-js/web'
import { Link } from '@solidjs/router'
import SaveFlashCards from './components/SaveFlashCards'
import PlusSVGlg from '../ui/svg/plusSVGlg'
import DeleteCard from './components/deleteCard'
import Modal from '../ui/actions/Modal'
import menuStore from './menuStore'
import BtnCircle from '../ui/actions/btnCircle'

const store = menuStore
const flashCards = store.passStore

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
                {flashCardName.length < 36
                  ? flashCardName
                  : flashCardName.slice(0, 36 - 3) + '...'}
              </Link>
              <div class='relative -top-28 -right-24'>
                <DeleteCard flashCardToDelete={flashCardName} />
              </div>
            </div>
          )}
        </For>
      </div>
      <Modal
        title='Ajouter une nouvelle flash-card :'
        action={
          <BtnCircle color='action' size='lg'>
            <PlusSVGlg />
          </BtnCircle>
        }
        class='fixed h-16 w-16 bottom-32'
        style='right: 10%'
        mainBtnTitle='Ajouter'
        onSubmitBtn={async () => {
          if (userTitle) {
            if (!userTitle.value.trim()) return
            await store.addFlashCard(userTitle.value)
            userTitle.value = ''
          }
        }}
      >
        <input
          type='text'
          class='input input-bordered input-primary w-full my-4'
          ref={userTitle}
        />
      </Modal>

      <SaveFlashCards />
    </>
  )
}

export default Menu
