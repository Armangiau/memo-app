import DeleteItem from './ui/actions/deleteItem'
import { createSignal } from 'solid-js'

export const ErrorDB = (error: any = undefined) => {
  const [close, setClose] = createSignal(false)
  const Toast = (
    <div
      class='fixed top-10 right-10 flex-center bg-white border-red-600 border-4 rounded-lg'
      style={{
        display: close() ? 'none' : ''
      }}
    >
      <div class='text-4xl p-5'>🚨</div>
      <div class='inline-block p-5'>
        <span class='text-lg font-bold'>Erreur en Base de donnée locale</span>
        <br />
        <span class='text-sm'>
          Il y a eu un problème lors de l'enregistrement ou la restitution des
          données que vous avez entré.
          <br />
          Veuillez actualiser ♻ votre page puis réessayez.
          <br />
          Si le problème persiste avec un navigateur récent veuillez nous
          contacter 🙏 !
        </span>
      </div>
      <div class='relative -top-10 right-5'>
        <DeleteItem onClick={() => setClose(true)} />
      </div>
    </div>
  )
  document.body.appendChild(Toast as Node)
  if (error) {
    console.error('ErrorDB: ', error)
  }
}
