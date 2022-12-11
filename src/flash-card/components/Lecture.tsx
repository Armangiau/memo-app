import {
  Component,
  ComponentProps,
  createSignal,
  Show,
  For,
  createEffect
} from 'solid-js'
import { frenchVoices, speak, synth } from '../../web_api/speechSynethsis'
import { my_db } from '../../web_api/database'
import { ErrorDB } from '../../defaultToast'
import Modal from '../../ui/actions/Modal'
import BtnCircle from '../../ui/actions/btnCircle'
import Select from '../../ui/data_input/select'
import { action, lg } from '../../ui/styles/vars'

interface LectureProps extends ComponentProps<any> {
  flashCardName: string
}

const Lecture: Component<LectureProps> = (props: LectureProps) => {
  const [modeLectureCards, setModeLectureCards] = createSignal(false)
  const [questionOuRéponseEnCours, setquestionOuRéponseEnCours] = createSignal(
    ''
  )

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
      
      document.addEventListener('touchend', resolve)
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
    if (flashCard) {
      const questionsRéponses = flashCard.questionsRéponses
      const lang = selectLang.selectedOptions[0].getAttribute('data-name')
      for (const questionRéponse of questionsRéponses) {
        for (const key in questionRéponse) {
          if (!modeLectureCards()) {
            break
          }
          const questionOuRéponse =
            questionRéponse[key as keyof typeof questionRéponse]
          setquestionOuRéponseEnCours(questionOuRéponse)
          if (lang) {
            speak(questionOuRéponse, lang)
          }
          await attendToucheEntrée()
        }
      }
      stopLecture()
    } else {
      ErrorDB()
    }
  }
  
  const openModalBtn = 
    <BtnCircle
        color={action}
        size={lg}
        style='right: 10%'
        class='fixed bottom-32'
      >
        <svg fill='currentColor' viewBox='0 0 16 16'>
          <path d='M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z' />
        </svg>
    </BtnCircle>;

  let selectLang: HTMLSelectElement | undefined
  return (
    <>
      <Modal
        title = 'Choisir votre voix :'
        action = {openModalBtn}
        onSubmitBtn1={() => {
          setModeLectureCards(true)
          if (selectLang) {
            lecture_questionRéponse(props.flashCardName, selectLang)
          }
        }}
        btn1='Choisir'
      >
        <>
          <Select
            ref={selectLang}
            class='w-full my-4'
          >
            <For each={frenchVoices}>
              {frenchVoice => (
                <option
                  data-lang={frenchVoice.lang}
                  data-name={frenchVoice.name}
                >
                  {frenchVoice.name} LANGUE : {frenchVoice.lang}
                </option>
              )}
            </For>
          </Select>
        </>
      </Modal>
      <Show when={modeLectureCards()}>
        <div class='w-screen h-screen bg-white text-2xl md:text-4xl flex justify-center items-center z-50 fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
          <span>{questionOuRéponseEnCours()}</span>
        </div>
      </Show>
    </>
  )
}

export default Lecture
