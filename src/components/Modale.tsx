import {
  Component,
  ComponentProps,
  createEffect,
  JSX,
  createSignal
} from 'solid-js'

interface ModaleProps extends ComponentProps<any> {
  children: JSX.Element
  onSubmitModal: () => void
  submitNameButton: string
}

const [isOpen, setModalActive] = createSignal(false)

export const openModal = () => {
  setModalActive(true)
}

const closeModal = () => {
  setModalActive(false)
}

const Modale: Component<ModaleProps> = (props: ModaleProps) => {
  let checkBoxModal: HTMLInputElement | undefined

  createEffect(() => {
    if (checkBoxModal) {
      if (isOpen()) {
        checkBoxModal.checked = true
      } else {
        checkBoxModal.checked = false
      }
    }
  })

  return (
    <>
      <input type='checkbox' class='modal-toggle' ref={checkBoxModal} />
      <div class='modal modal-bottom md:modal-middle'onClick={closeModal}>
        <div class='modal-box' onclick={(e) => e.stopPropagation()}>
          {props.children}
          <div class='modal-action'>
            <button
              class='btn btn-secondary'
              onClick={() => {
                props.onSubmitModal()
                closeModal()
              }}
            >
              {props.submitNameButton}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modale
