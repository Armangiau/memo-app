import { Component, For, lazy } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { useParams } from '@solidjs/router'
import { my_db, mise_à_jour_flashCard } from '../web_api/database'
import PlusSVGlg from '../ui/plusSVGlg'
import DeleteQestRep from './components/deleteQestRep'
import flashCardStore from './flashCardStore'
import { ErrorDB } from '../defaultToast'

const Lecture = lazy(() => import('./components/Lecture'))

const questionsRéponses = flashCardStore.passStore()



const flashCard: Component = () => {
  const flashCardName = useParams().name

  flashCardStore.loadQuestionsRéponses(flashCardName)

  return (
    <>
      <h1 class='text-center text-4xl m-5'>{flashCardName}</h1>
      <div class='my-5 mx-auto text-center max-w-4xl flex flex-col px-3'>
        <For each={questionsRéponses}>
          {(questionRéponse, index) => {
            const { question, réponse } = questionRéponse
            return (
              <div>
                <input
                  type='text'
                  class='input input-bordered input-primary w-full sm:w-4/5 mb-4 '
                  placeholder='question'
                  value={question}
                  onChange={evt => {
                    flashCardStore.mise_à_jour_qest(
                      index(),
                      evt.currentTarget.value,
                      flashCardName
                    )
                  }}
                />
                <div
                  class='relative -top-12 z-50'
                  style={{
                    left: '93%'
                  }}
                >
                  <DeleteQestRep
                    flashCard={flashCardName}
                    indexItemToDelete={index()}
                  />
                </div>
                <textarea
                  class='textarea textarea-secondary w-full sm:w-4/5 mb-4 ml-2 sm:ml-20'
                  placeholder='réponse'
                  onChange={evt => {
                    flashCardStore.mise_à_jour_rép(
                      index(),
                      evt.currentTarget.value,
                      flashCardName
                    )
                  }}
                >
                  {réponse}
                </textarea>
                <br />
              </div>
            )
          }}
        </For>
        <button
          class='h-14 w-14 bottom-20 right-10 bg-gray-100 modal-button mx-auto text-gray-600'
          style='border-radius: 50%'
          onClick={() => flashCardStore.nouvelles_questionRéponse(flashCardName)}
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
