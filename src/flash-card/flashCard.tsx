import { Component, For, lazy } from 'solid-js'
import { useParams } from '@solidjs/router'
import PlusSVGlg from '../ui/svg/plusSVGlg'
import DeleteQestRep from './components/deleteQestRep'
import flashCardStore from './flashCardStore'

const Lecture = lazy(() => import('./components/Lecture'))

const flashCard: Component = () => {
  const flashCardName = useParams().name
  const store = new flashCardStore(flashCardName)
  store.loadQuestionsRéponses()

  const questionsRéponses = store.passStore

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
                    store.mise_à_jour_qest(index(), evt.currentTarget.value)
                  }}
                />
                <DeleteQestRep
                  class='relative top-2 left-4'
                  store={store}
                  indexItemToDelete={index()}
                />
                <textarea
                  class='textarea textarea-secondary w-full sm:w-4/5 mb-4 ml-2 sm:ml-20'
                  placeholder='réponse'
                  onChange={evt => {
                    store.mise_à_jour_rép(index(), evt.currentTarget.value)
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
          onClick={store.nouvelles_questionRéponse}
        >
          <PlusSVGlg />
        </button>
        <div class='h-96 w-sreen'></div>
        {/* add an empty space under questions and responeces*/}
      </div>
      <Lecture flashCardName={flashCardName} />
    </>
  )
}

export default flashCard
