import { Component } from 'solid-js'
import { useParams } from '@solidjs/router'
import { open_my_DB } from './database'
import PlusSVGlg from './plusSVGlg'

const db = await open_my_DB()

const flashCard: Component = () => {
  const flashCardName = useParams().name

  const go = async () => {
    console.log(flashCardName)
    const flashCard = await db.getFromIndex(
      'flash-cards',
      'name',
      flashCardName
    )
    console.log(flashCard)
  }

  go()

  return (
    <>
      <div class='m-5 text-center'>
        <input
          type='text'
          class='input input-bordered input-primary w-full sm:w-4/5 max-w-4xl mb-4'
          placeholder='question'
        />
        <br />
        <textarea
          class='textarea textarea-secondary w-full sm:w-4/5 max-w-4xl mb-4 ml-2 sm:ml-20'
          placeholder='réponse'
        ></textarea>
        <div
          class='h-14 w-14 bottom-20 right-10 bg-gray-100 modal-button mx-auto text-gray-600'
          style='border-radius: 50%'
        >
          <PlusSVGlg />
        </div>
      </div>
      <span
        class='fixed h-20 w-20 bottom-32 bg-sky-500 modal-button text-white cursor-pointer'
        style='border-radius: 50%; right: 10%'
      >
        <svg fill='currentColor' viewBox='0 0 16 16'>
          <path d='M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z' />
        </svg>
      </span>
    </>
  )
}

export default flashCard
