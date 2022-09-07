import { Component, For, createSignal } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { useParams } from '@solidjs/router'
import { my_db, mise_à_jour_flashCard } from './database'
import PlusSVGlg from './plusSVGlg'

const db = my_db
const [questionsRéponses, setQuestionsRéponses] = createStore([
  {
    question: '',
    réponse: ''
  }
])

const rechercheQuestionsRéponses = async (flashCardName: string) => {
  console.log(flashCardName)
  const flashCard = await db.getFromIndex('flash-cards', 'name', flashCardName)
  setQuestionsRéponses(flashCard.questionsRéponses)
}

const mise_à_jour_qest = (
  insex: number,
  newVal: string,
  flashCardName: string
) =>
  mise_à_jour_flashCard(flashCardName, (questRép: any) => {
    questRép.questionsRéponses[insex].question = newVal
    return questRép
  })

const mise_à_jour_rép = (
  insex: number,
  newVal: string,
  flashCardName: string
) =>
  mise_à_jour_flashCard(flashCardName, (questRép: any) => {
    questRép.questionsRéponses[insex].réponse = newVal
    return questRép
  })

const nouvelles_questionRéponse = (flashCardName: string) => {
  mise_à_jour_flashCard(flashCardName, (questRép: any) => {
    questRép.questionsRéponses.push({
      question: '',
      réponse: ''
    })
    return questRép
  })

  setQuestionsRéponses(
    produce(flashCards => {
      flashCards.push({
        question: '',
        réponse: ''
      })
    })
  )
}


const flashCard: Component = () => {
  console.log('pas de prob en fait');
  const flashCardName = useParams().name

  rechercheQuestionsRéponses(flashCardName)

  return (
    <>
      <div class='m-5 text-center'>
        <For each={questionsRéponses}>
          {(questionRéponse, index) => {
            const { question, réponse } = questionRéponse
            console.log('store : ', questionRéponse, question, réponse)
            return (
              <>
                <input
                  type='text'
                  class='input input-bordered input-primary w-full sm:w-4/5 max-w-4xl mb-4 '
                  placeholder='question'
                  value={question}
                  onChange={evt => {
                    mise_à_jour_qest(
                      index(),
                      evt.currentTarget.value,
                      flashCardName
                    )
                  }}
                />
                <br />
                <textarea
                  class='textarea textarea-secondary w-full sm:w-4/5 max-w-4xl mb-4 ml-2 sm:ml-20'
                  placeholder='réponse'
                  onChange={evt => {
                    mise_à_jour_rép(
                      index(),
                      evt.currentTarget.value,
                      flashCardName
                    )
                  }}
                >
                  {réponse}
                </textarea>
                <br />
              </>
            )
          }}
        </For>
        <div
          class='h-14 w-14 bottom-20 right-10 bg-gray-100 modal-button mx-auto text-gray-600'
          style='border-radius: 50%'
          onClick={() => nouvelles_questionRéponse(flashCardName)}
        >
          <PlusSVGlg />
        </div>
        <div class='h-96 w-sreen'></div>
      </div>
      <span
        class='fixed  h-20 w-20 bottom-32 bg-sky-500 modal-button text-white cursor-pointer -smh:hidden'
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
