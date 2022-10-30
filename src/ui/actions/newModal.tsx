import {
  Component,
  Show,
} from 'solid-js'
import { ModalProps, stateModal } from './Modal'
import { Portal } from 'solid-js/web'
import Button from './button'
import DeleteItem from './deleteItem'
import * as ml from './modal.css'


interface newModalProps extends ModalProps {
  state: stateModal
}

const NewModal: Component<newModalProps> = (props: newModalProps) => {
  const toggle = (evt: MouseEvent, onSubmitfn?: (() => void) | undefined) => {
    evt.stopPropagation()
    if (onSubmitfn) {
      onSubmitfn()
    }
    props.state.toggleModal()
  }

  return (
    <Portal>
      <div
        class={ml.container}
        classList={{ [ml.active]: props.state.openClose() }}
      >
        <div class={ml.overlay} onClick={evt => toggle(evt)}></div>

        <div class={ml.modal}>
          <DeleteItem class={ml.close} onClick={props.state.toggleModal} />
          <h1 class={ml.title}>{props.title}</h1>
          <p class={ml.content}>{props.children}</p>

          <div class={ml.modalAction}>
            <Button
              color='primary'
              onClick={evt => toggle(evt, props.onSubmitBtn1)}
            >
              {props.btn1 || 'Envoyer'}
            </Button>

            <Show when={props.btn2}>
              <Button
                color='secondary'
                onClick={evt => toggle(evt, props.onSubmitBtn2)}
              >
                {props.btn2}
              </Button>
            </Show>
          </div>
          
        </div>
      </div>
    </Portal>
  )
}

export default NewModal