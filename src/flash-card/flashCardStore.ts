import { produce, createStore } from 'solid-js/store'
import {
  createContext,
  createDeferred,
  createEffect,
  createSignal,
  useContext
} from 'solid-js'
import { Context } from 'solid-js'
import { createLocalStorageSignal, load, persistent } from '../web_api/storeInMemory'

type QestRep = {
  question: string
  réponse: string
}[]

const emptyQuestRep = {
  réponse: '',
  question: ''
}

export const flashCardStore = (flashCardName: string) => {
  const [questionsRéponses, setQuestionsRéponses] = createStore<QestRep>([emptyQuestRep])
  createEffect(() => load(flashCardName)() ? setQuestionsRéponses(load(flashCardName)() as QestRep) : undefined)
  createEffect(() => persistent(questionsRéponses, flashCardName))

  const store = {
    questionsRéponses,
    mise_à_jour_qest (insex: number, newVal: string) {
      setQuestionsRéponses(qestrep => {
        qestrep[insex].question = newVal
        return qestrep
      })
    },

    mise_à_jour_rép (insex: number, newVal: string) {
      setQuestionsRéponses(qestrep => {
        qestrep[insex].réponse = newVal
        return qestrep
      })
    },
    nouvelles_questionRéponse () {
      setQuestionsRéponses(qestrep => {
        console.log(qestrep)
        qestrep.push(emptyQuestRep)
        console.log(qestrep);
        
        return qestrep
      })
      console.log(questionsRéponses)
    },
    deleteQestRep(indexItemToDelete: number) {
      setQuestionsRéponses(qestrep => {
        qestrep.splice(indexItemToDelete)
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
