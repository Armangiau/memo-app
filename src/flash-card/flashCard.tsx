import { Component, ComponentProps, For, lazy } from 'solid-js'
import PlusSVGlg from '../ui/svg/plusSVGlg'
import DeleteQestRep from './components/deleteQestRep'
import Input from '../ui/data_input/input'
import Textarea from '../ui/data_input/textarea'
import BtnCircle from '../ui/actions/btnCircle'
import { useFlashCard } from './flashCardStore'

const Lecture = lazy(() => import('./components/Lecture'))

interface flashCardProps extends ComponentProps<any> {
  flashCardName: string
}

const flashCard: Component<flashCardProps>  = (props: flashCardProps) => {
  const {
    questionsRéponses,
    mise_à_jour_qest,
    mise_à_jour_rép,
    nouvelles_questionRéponse
  } = useFlashCard()
  return (
    <>
      <h1 class='text-center text-4xl m-5'>{props.flashCardName}</h1>
      <div class='my-5 mx-auto text-center max-w-4xl flex flex-col px-3'>
        <For each={questionsRéponses}>
          {(questionRéponse, index) => {
            const { question, réponse } = questionRéponse
            return (
              <div>
                <Input
                  type='text'
                  class='input input-bordered input-primary w-full sm:w-4/5 mb-4'
                  placeholder='question'
                  value={question}
                  onChange={evt => {
                    mise_à_jour_qest(index(), evt.currentTarget.value)
                  }}
                />
                <DeleteQestRep
                  class='relative top-2 left-4'
                  indexItemToDelete={index()}
                />
                <Textarea
                  class='w-full sm:w-4/5 mb-4 ml-2 sm:ml-20'
                  color='secondary'
                  placeholder='réponse'
                  onChange={evt => {
                    mise_à_jour_rép(index(), evt.currentTarget.value)
                  }}
                >
                  {réponse}
                </Textarea>
                <br />
              </div>
            )
          }}
        </For>
        <BtnCircle
          color='secondary'
          fill='light'
          size='lg'
          onClick={nouvelles_questionRéponse}
          class='bottom-20 right-10 mx-auto'
        >
          <PlusSVGlg />
        </BtnCircle>

        <div class='h-96 w-sreen'></div>
        {/* add an empty space under questions and responeces*/}
      </div>
      <Lecture flashCardName={props.flashCardName} />
    </>
  )
}

export default flashCard
