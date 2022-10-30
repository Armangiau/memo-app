import { Component } from 'solid-js'
import { my_db, addFlashCardInDB } from '../../web_api/database'
import { DBValues } from '../../web_api/database'
import BtnCircle from '../../ui/actions/btnCircle'
import Archive from "../../ui/svg/archive";
import Download from '../../ui/svg/download';

const SaveFlashCards: Component = () => {
  const nouvelleSauvegarde = async () => {
    const fileSaver = import('file-saver')
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
      )}-${date.getFullYear()} à ${deuxChiffres(
        date.getHours()
      )}h${deuxChiffres(date.getMinutes())}min${deuxChiffres(
        date.getSeconds()
      )}sec.json`,
      { type: 'application/json;charset=utf-8' }
    )

    const saveAs = (await fileSaver).saveAs
    saveAs(JSONfile)
    console.log('done')
  }

  const ajouterSauvegardeDB = (sauvegardeJSON: string) => {
    const JSONparsed = JSON.parse(sauvegardeJSON) as DBValues[]
    JSONparsed.forEach(FlashCard => {
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

  let fileInput: HTMLInputElement | undefined
  return (
    <span class='save-flash-card'>
      <BtnCircle
        class='relative top-0 flex-center'
        title="exporter un fichier de sauvegarde de mes flash cards dans l'ordinateur"
        onClick={() => {
          if (fileInput) {
            fileInput.click()
          }
        }}
      >
        <Archive />
      </BtnCircle>

      <input
        type='file'
        accept='.json,application/json'
        class='hidden'
        onChange={lireSauvegarde}
        id='file-input'
        ref={fileInput}
      />

      <BtnCircle
        class='relative top-8 flex-center'
        title="importer un fichier de sauvegarde"
        onClick={nouvelleSauvegarde}
      >
        <Download />
      </BtnCircle>
    </span>
  )
}

export default SaveFlashCards
