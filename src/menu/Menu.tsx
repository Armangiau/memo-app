import { Component } from 'solid-js'
import { For } from 'solid-js/web'
import { Link } from '@solidjs/router'
import SaveFlashCards from './components/SaveFlashCards'
import PlusSVGlg from '../ui/svg/plusSVGlg'
import DeleteCard from './components/deleteCard'
import Modal from '../ui/actions/Modal'
import menuStore from './menuStore'
import BtnCircle from '../ui/actions/btnCircle'
import Input from '../ui/data_input/input'

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
            <div class='active:scale-95'>
              <Link
                href={`/flashCard/${flashCardName}`}
                class='h-32 w-32 hover:bg-primary-light text-gray-700 p-5 rounded-2xl border-primary border-2 font-bold text-lg flex-center'
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
          <BtnCircle color='action' size='lg' title='Ajoutez une novelle flash card'>
            <PlusSVGlg />
          </BtnCircle>
        }
        class='fixed h-16 w-16 bottom-32'
        style='right: 10%'
        btn1='Ajouter'
        onSubmitBtn1={async () => {
          if (userTitle) {
            if (!userTitle.value.trim()) return
            await store.addFlashCard(userTitle.value)
            userTitle.value = ''
          }
        }}
      >
        <Input
          type='text'
          class='w-full my-4'
          ref={userTitle}
        />
      </Modal>

      <SaveFlashCards />
    </>
  )
}

export default Menu
