import { Component, For, lazy } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { useParams } from '@solidjs/router'
import { my_db, mise_à_jour_flashCard } from './database'
import PlusSVGlg from './plusSVGlg'

const Lecture = lazy(() => import('./Lecture'))

const [questionsRéponses, setQuestionsRéponses] = createStore([
  {
    question: '',
    réponse: ''
  }
])

const rechercheQuestionsRéponses = async (flashCardName: string) => {
  const flashCard = await my_db.getFromIndex(
    'flash-cards',
    'name',
    flashCardName
  )
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
  const flashCardName = useParams().name

  rechercheQuestionsRéponses(flashCardName)

  return (
    <>
      <div class='m-5 text-center'>
        <For each={questionsRéponses}>
          {(questionRéponse, index) => {
            const { question, réponse } = questionRéponse
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
          tabIndex='1'
          onClick={() => nouvelles_questionRéponse(flashCardName)}
        >
          <PlusSVGlg />
        </div>
        <div class='h-96 w-sreen'></div>
      </div>
      <Lecture flashCardName={flashCardName} />
    </>
  )
}

export default flashCard
