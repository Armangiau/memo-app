import {
  Component,
  ComponentProps,
  createSignal,
  Show,
  For,
  createEffect
} from 'solid-js'
import { createStore } from 'solid-js/store'
import { frenchVoices, speak, synth } from './speechSynethsis'
import { my_db } from './database'

const [modeLectureCards, setModeLectureCards] = createSignal(false)
const [questionOuRéponseEnCours, setquestionOuRéponseEnCours] = createSignal('')

const stopLecture = () => {
  setModeLectureCards(false)
  setquestionOuRéponseEnCours('')
  synth.cancel()
}

document.addEventListener('keyup', evt => {
  if (evt.key === 'Escape') {
    stopLecture()
  }
})

const attendToucheEntrée = () =>
  new Promise<void>(resolve => {
    createEffect(() => {
      if (!modeLectureCards()) {
        resolve()
      }
    })

    document.addEventListener('keyup', evt => {
      if (evt.key === 'Enter') {
        resolve()
      }
    })
  })

const lecture_questionRéponse = async (
  flashCardName: string,
  selectLang: HTMLSelectElement
) => {
  const flashCard = await my_db.getFromIndex(
    'flash-cards',
    'name',
    flashCardName
  )

  const questionsRéponses = flashCard.questionsRéponses

  const lang = selectLang.selectedOptions[0].getAttribute('data-name')

  for (let index = 0; index < questionsRéponses.length; index++) {
    const questionRéponse = questionsRéponses[index]
    for (const key in questionRéponse) {
      if (!modeLectureCards()) {
        break
      }

      const questionOuRéponse = questionRéponse[key]
      setquestionOuRéponseEnCours(questionOuRéponse)
      if (lang) {
        speak(questionOuRéponse, lang)
      }
      await attendToucheEntrée()
    }
  }
  stopLecture()
}

interface LectureProps extends ComponentProps<any> {
  flashCardName: string
}

const Lecture: Component<LectureProps> = (props: LectureProps) => {
  let selectLang: HTMLSelectElement | undefined

  const [frenchVoicesStore, setFrenchVoicesStore] = createStore(frenchVoices)

  return (
    <>
      <label
        class='fixed h-16 w-16 bottom-32 rond-sky-500 modal-button -smh:hidden cursor-pointer'
        style='right: 10%'
        for='menu-modal'
      >
        <input type='checkbox' class='modal-toggle' id='menu-modal' />
        <div class='modal modal-middle'>
          <div class='modal-box'>
            <h3 class='font-bold text-lg'>Choisir votre voix :</h3>
            <select
              ref={selectLang}
              class='select select-bordered select-primary w-4/5 mt-4'
            >
              <For each={frenchVoicesStore}>
                {frenchVoice => (
                  <option
                    data-lang={frenchVoice.lang}
                    data-name={frenchVoice.name}
                  >
                    {frenchVoice.name} LANGUE : {frenchVoice.lang}
                  </option>
                )}
              </For>
            </select>
            <div class='modal-action'>
              <label
                for='menu-modal'
                class='btn btn-secondary'
                onClick={() => {
                  setModeLectureCards(true)
                  if (selectLang) {
                    lecture_questionRéponse(props.flashCardName, selectLang)
                  }
                }}
              >
                Choisir
              </label>
            </div>
          </div>
        </div>
        <span class='text-white'>
          <svg fill='currentColor' viewBox='0 0 16 16'>
            <path d='M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z' />
          </svg>
        </span>
      </label>
      <Show when={modeLectureCards()}>
        <div class='w-screen h-screen bg-white text-5xl md:text-7xl flex justify-center items-center z-50 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
          <span>{questionOuRéponseEnCours()}</span>
        </div>
      </Show>
    </>
  )
}

export default Lecture
