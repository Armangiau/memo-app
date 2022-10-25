import { createStore, produce, SetStoreFunction } from 'solid-js/store'
import { my_db, mise_à_jour_flashCard } from '../web_api/database'
import { ErrorDB } from '../defaultToast'

type QestRep = {
  question: string
  réponse: string
}[]

const emptyQuestRep = {
  réponse: '',
  question: ''
}

class methodStore {
  questionsRéponses: QestRep
  setQuestionsRéponses: SetStoreFunction<QestRep>
  flashCardName: string

  constructor (flashCardName: string) {
    this.flashCardName = flashCardName
    ;[this.questionsRéponses, this.setQuestionsRéponses] = createStore([
      emptyQuestRep
    ])
  }

  loadQuestionsRéponses = async () => {
    const flashCard = await my_db.getFromIndex(
      'flash-cards',
      'name',
      this.flashCardName
    )
    if (flashCard) {
      this.setQuestionsRéponses(flashCard.questionsRéponses)
    } else {
      ErrorDB()
    }
    return this
  }

  mise_à_jour_qest = (insex: number, newVal: string) => {
    mise_à_jour_flashCard(this.flashCardName, questRép => {
      questRép.questionsRéponses[insex].question = newVal
      return questRép
    })
  }

  mise_à_jour_rép = (insex: number, newVal: string) => {
    mise_à_jour_flashCard(this.flashCardName, questRép => {
      questRép.questionsRéponses[insex].réponse = newVal
      return questRép
    })
  }

  nouvelles_questionRéponse = () => {
    mise_à_jour_flashCard(this.flashCardName, questRép => {
      questRép.questionsRéponses.push(emptyQuestRep)
      return questRép
    })

    this.setQuestionsRéponses(
      produce(flashCard => flashCard.push(emptyQuestRep))
    )
  }

  deleteQestRep = (indexItemToDelete: number) => {
    mise_à_jour_flashCard(this.flashCardName, questRép => {
      questRép.questionsRéponses.splice(indexItemToDelete, 1)
      return questRép
    })
    this.setQuestionsRéponses(
      produce(flashCard => flashCard.splice(indexItemToDelete, 1))
    )
  }

  get passStore () {
    return this.questionsRéponses
  }
}

export default methodStore
