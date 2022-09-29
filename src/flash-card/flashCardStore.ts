import { createStore, produce, SetStoreFunction } from 'solid-js/store'
import { my_db, mise_à_jour_flashCard} from '../web_api/database'
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

  constructor () {
    [this.questionsRéponses, this.setQuestionsRéponses] = createStore([emptyQuestRep])
  }

  loadQuestionsRéponses = async (flashCardName: string) => {
    const flashCard = await my_db.getFromIndex(
      'flash-cards',
      'name',
      flashCardName
    )
    if (flashCard) {
      this.setQuestionsRéponses(flashCard.questionsRéponses)
    } else {
      ErrorDB()
    }
  }

  mise_à_jour_qest = (insex: number, newVal: string, flashCardName: string) => {
    mise_à_jour_flashCard(flashCardName, questRép => {
      questRép.questionsRéponses[insex].question = newVal
      return questRép
    })
  }
    

  mise_à_jour_rép = (insex: number, newVal: string, flashCardName: string) => {
    mise_à_jour_flashCard(flashCardName, questRép => {
      questRép.questionsRéponses[insex].réponse = newVal
      return questRép
    })
  }

  nouvelles_questionRéponse =(flashCardName: string) => {
    mise_à_jour_flashCard(flashCardName, questRép => {
      questRép.questionsRéponses.push(emptyQuestRep)
      return questRép
    })
    
    this.setQuestionsRéponses(
      produce(flashCard => flashCard.push(emptyQuestRep))
    )
  }

  deleteQestRep = (
    flashCard: string,
    indexItemToDelete: number
  ) => {
    mise_à_jour_flashCard (flashCard, questRép => {
      questRép.questionsRéponses.splice(indexItemToDelete, 1)
      return questRép
    })
    this.setQuestionsRéponses (
      produce(flashCard => flashCard.splice(indexItemToDelete, 1))
    )
  }

  passStore () {
    return this.questionsRéponses
  }

}

export default new methodStore()
