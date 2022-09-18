import { Component, For, lazy } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { useParams } from '@solidjs/router'
import { my_db, mise_à_jour_flashCard } from '../web_api/database'
import PlusSVGlg from '../components/plusSVGlg'
import { DeleteFlashCardBlock } from '../components/deleteItem'
import { ErrorDB } from "../defaultToast"

const Lecture = lazy(() => import('../components/Lecture'))

export const [questionsRéponses, setQuestionsRéponses] = createStore([
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
  if (flashCard) {
    setQuestionsRéponses(flashCard.questionsRéponses)
  } else {
    ErrorDB()
  }
}

const mise_à_jour_qest = (
  insex: number,
  newVal: string,
  flashCardName: string
) =>
  mise_à_jour_flashCard(flashCardName, questRép => {
    questRép.questionsRéponses[insex].question = newVal
    return questRép
  })

const mise_à_jour_rép = (
  insex: number,
  newVal: string,
  flashCardName: string
) =>
  mise_à_jour_flashCard(flashCardName, questRép => {
    questRép.questionsRéponses[insex].réponse = newVal
    return questRép
  })

const nouvelles_questionRéponse = (flashCardName: string) => {
  mise_à_jour_flashCard(flashCardName, questRép => {
    questRép.questionsRéponses.push({
      question: '',
      réponse: ''
    })
    return questRép
  })

  setQuestionsRéponses(
    produce(flashCard => {
      flashCard.push({
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
      <h1 class='text-center text-4xl m-5'>{flashCardName}</h1>
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
                <span class='ml-2 inline-block'>
                  <DeleteFlashCardBlock
                    flashCard={flashCardName}
                    indexItemToDelete={index()}
                  />
                </span>
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
        <button
          class='h-14 w-14 bottom-20 right-10 bg-gray-100 modal-button mx-auto text-gray-600'
          style='border-radius: 50%'
          onClick={() => nouvelles_questionRéponse(flashCardName)}
        >
          <PlusSVGlg />
        </button>
        <div class='h-96 w-sreen'></div>
      </div>
      <Lecture flashCardName={flashCardName} />
    </>
  )
}

export default flashCard
