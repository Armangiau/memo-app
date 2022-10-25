import {
  Component,
  ComponentProps,
  Accessor,
  Setter,
  JSX,
  splitProps,
  createSignal,
  lazy
} from 'solid-js'

export class stateModal {
  openClose: Accessor<boolean>
  setOpenClose: Setter<boolean>

  constructor () {
    ;[this.openClose, this.setOpenClose] = createSignal(false)
  }

  toggleModal = () => {
    console.log('change')
    this.setOpenClose(!this.openClose())
  }
}

export interface ModalProps extends ComponentProps<'div'> {
  title: string
  children: JSX.Element
  action?: JSX.Element
  mainBtnTitle?: string
  onSubmitBtn?: () => void
  secondBtnTitle?: string
  onSubmitSecondBtn?: () => void
}

const Modal: Component<ModalProps> = (props: ModalProps) => {
  const NewModal = lazy(() => import('./newModal'))

  const state = new stateModal()
  const [action, modalProps, oProps] = splitProps(
    props,
    ['action'],
    [
      'title',
      'children',
      'mainBtnTitle',
      'onSubmitBtn',
      'secondBtnTitle',
      'onSubmitSecondBtn'
    ]
  )

  return (
    <>
      <div
        onClick={() => {
          state.toggleModal()
        }}
        {...oProps}
      >
        {action?.action}
      </div>
      <NewModal {...modalProps} state={state}></NewModal>
    </>
  )
}

export default Modal
