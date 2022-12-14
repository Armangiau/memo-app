import { Component, ComponentProps, For, lazy } from 'solid-js'
import PlusSVGlg from '../ui/svg/plusSVGlg'
import DeleteQestRep from './components/deleteQestRep'
import Input from '../ui/data_input/input'
import Textarea from '../ui/data_input/textarea'
import BtnCircle from '../ui/actions/btnCircle'
import { titleSize } from './flashCard.css'
import { useFlashCard } from './flashCardStore'
import { body } from '../gloabalFuncUtilities'
import { lg, secondary } from '../ui/styles/vars'

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


  const isDraging = (target: HTMLElement) =>
    new Promise((resolve, reject) => {
      target.addEventListener('mouseup', () => reject('mouseup on drag'))
      setTimeout(resolve, 800)
    })

  let allQuestRepNode: HTMLDivElement | undefined
  let indexOfHover: number = 0

  const indexOfMousePosition = (childsNumb: number, height: number, hfromTop: number): number => {
    return 0
  }

  const changeIndex = (index: number): number => {
    return index
  }

  const mousemove = (e: MouseEvent) => {
    if (!allQuestRepNode) return
    const target = e.currentTarget as HTMLDivElement
    const x = e.clientX,
      y = e.clientY
    target.style.top = `${x}px`
    target.style.left = `${y}px`
    const index = indexOfMousePosition(allQuestRepNode.childElementCount, allQuestRepNode.offsetTop, target.clientHeight)
    indexOfHover = index === indexOfHover ? index : changeIndex(index)
  }

  const dragStart = (target: HTMLElement, evt: MouseEvent) => {
    target.style.cursor = 'grab'
    target.insertAdjacentHTML(
      'afterend',
      `<div class='opacity-60' id='gost-questRep'>${target.innerHTML}</div>`
    )
    body.insertAdjacentHTML(
      'beforeend',
      `<div
          id='draggingElement'
          class='absolute'
          style="top: ${evt.clientY}px; left: ${evt.clientX}px; transform: translate(-50%, -50%); height: ${target.clientHeight}px; width: ${target.clientWidth}px"
        ></div>`
    )
    const draggingElement = document.getElementById('draggingElement')
    if (!draggingElement) return
    draggingElement.innerHTML = target.innerHTML
    target.remove()

    draggingElement.addEventListener('mousemove', mousemove)
  }

  const dragEnd = (evt: MouseEvent) => {
    document.body.style.cursor = 'default'
    document
      .getElementById('draggingElement')
      ?.removeEventListener('mousemove', mousemove)
  }

  const prepareToDrag = async (evt: MouseEvent) => {
    const target = evt.currentTarget as HTMLElement | null
    if (!target) return
    isDraging(target)
      .then(() => {
        dragStart(target, evt)
        document.addEventListener('mouseup', dragEnd)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <h1 class={`font-title text-center ${titleSize} m-2 lg:m-4`}>{props.flashCardName}</h1>
      <div class='my-5 mx-auto text-center max-w-4xl flex flex-col px-3'>
        <For each={questionsRéponses}>
          {(questionRéponse, index) => {
            const { question, réponse } = questionRéponse
            return (
              <div>
                <Input
                  type='text'
                  class='w-10/12 sm:w-4/5 mb-2 lg:mb-4'
                  placeholder='question'
                  value={question}
                  onChange={evt => {
                    mise_à_jour_qest(index(), evt.currentTarget.value)
                  }}
                />
                <DeleteQestRep
                  class='relative top-2 left-2 sm:left-4'
                  indexItemToDelete={index()}
                />
                <Textarea
                  class='w-10/12 sm:w-4/5 mb-4 ml-2 sm:ml-20'
                  color={secondary}
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
          size={lg}
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
