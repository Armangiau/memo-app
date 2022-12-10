import { produce } from 'solid-js/store'
import {
  createContext,
  useContext
} from 'solid-js'
import { Context } from 'solid-js'
import { createPersistantStore } from '../web_api/storeInMemory'

type QestRep = {
  question: string
  réponse: string
}[]

const emptyQuestRep = {
  réponse: '',
  question: ''
}

export const flashCardStore = (flashCardName: string) => {
  const [questionsRéponses, setQuestionsRéponses, setInDB] = createPersistantStore({qr: [emptyQuestRep]}, flashCardName)

  const store = {
    questionsRéponses,
    mise_à_jour_qest (insex: number, newVal: string) {
      setInDB(qestrep => {
        qestrep.qr[insex].question = newVal
        return qestrep
      })
    },
    mise_à_jour_rép (insex: number, newVal: string) {
      setInDB(qestrep => {
        qestrep.qr[insex].réponse = newVal
        return qestrep
      })
    },
    nouvelles_questionRéponse () {
      setQuestionsRéponses(qestrep => {
        console.log(qestrep)
        qestrep.qr.push(emptyQuestRep)
        console.log(qestrep);
        
        return qestrep
      })
      console.log(questionsRéponses)
    },
    deleteQestRep(indexItemToDelete: number) {
      setQuestionsRéponses(qestrep => {
        qestrep.qr.splice(indexItemToDelete)
        return qestrep
      })
      console.log(questionsRéponses)
    }
  }

  return store
}
type DataContext = ReturnType<typeof flashCardStore>
export const FlashCardContex = createContext<DataContext>() as Context<DataContext>
export const useFlashCard = () => useContext(FlashCardContex)
