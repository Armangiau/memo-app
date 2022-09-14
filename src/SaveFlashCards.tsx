import { Component } from 'solid-js'
import { my_db, addFlashCardInDB } from './database'
import { saveAs } from 'file-saver'

const nouvelleSauvegarde = async () => {
  const FlashCards = await my_db.getAll('flash-cards')
  const textToDownload = JSON.stringify(FlashCards)
  const date = new Date()
  const deuxChiffres = (dateOrMonth: number): string => {
    if (dateOrMonth < 10) {
      return `0${dateOrMonth}`
    } else {
      return `${dateOrMonth}`
    }
  }

  const JSONfile = new File(
    [textToDownload],
    `sauvegarde des flash cards, du ${deuxChiffres(
      date.getDate()
    )}-${deuxChiffres(
      date.getMonth() + 1
    )}-${date.getFullYear()} à ${deuxChiffres(date.getHours())}h${deuxChiffres(
      date.getMinutes()
    )}min${deuxChiffres(date.getSeconds())}sec.json`,
    { type: 'application/json;charset=utf-8' }
  )
  saveAs(JSONfile)
  console.log('done')
}

const ajouterSauvegardeDB = async (sauvegardeJSON: string) => {
  const JSONparsed = JSON.parse(sauvegardeJSON)
  JSONparsed.forEach((FlashCard: any) => {
    console.log(FlashCard)
    addFlashCardInDB(FlashCard.name, false, FlashCard.questionsRéponses)
  })
  location.reload()
}

const lireSauvegarde = (evt: Event) => {
  const files = (evt.target as HTMLInputElement).files
  if (!files) {
    console.error('aucun de fichier de sauvegarde détecté')
    return
  }
  const file = files[0]
  console.log(file)
  const reader = new FileReader()

  reader.addEventListener('load', event => {
    let JSONcontent = ''
    if (event.target?.result) {
      JSONcontent = event.target?.result as string
    }
    ajouterSauvegardeDB(JSONcontent)
  })

  reader.readAsText(file)
}

const SaveFlashCards: Component = () => {
  return (
    <span
      class='absolute text-white h-20 w-8 bottom-32 -z-10'
      style='right: calc(10% - 2rem)'
    >
      <label
        class='relative rond-sky-500 h-8 w-8 cursor-pointer top-0 block flex-center'      >
        <input
          type='file'
          accept='.json,application/json'
          class='hidden'
          onChange={lireSauvegarde}
        />
        <svg fill='currentColor' class='h-6' viewBox='0 0 16 16'>
          <path d='M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z' />
          <path d='M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z' />
        </svg>
      </label>

      <button
        class='relative rond-sky-500 h-8 w-8 top-8 flex-center'
        onClick={nouvelleSauvegarde}
      >
        <svg fill='currentColor' class='h-6' viewBox='0 0 16 16'>
          <path d='M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z' />
          <path d='M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z' />
        </svg>
      </button>
    </span>
  )
}

export default SaveFlashCards
