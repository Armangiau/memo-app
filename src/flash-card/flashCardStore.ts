import { createStore, produce } from 'solid-js/store'
import { my_db, mise_à_jour_flashCard } from '../web_api/database'
import { ErrorDB } from '../defaultToast'
import {
  createContext,
  createEffect,
  createResource,
  useContext
} from 'solid-js'
import { Context } from 'solid-js'

type QestRep = {
  question: string
  réponse: string
}[]

const emptyQuestRep = {
  réponse: '',
  question: ''
}

export const flashCardStore = (flashCardName: string) => {

  const load = async () =>
    (await my_db.getFromIndex('flash-cards', 'name', flashCardName))
      ?.questionsRéponses

  const [ressouce] = createResource(load)
  const [questionsRéponses, setQuestionsRéponses] = createStore([] as QestRep)

  createEffect(() => {
    if (!ressouce.loading) {
      if (ressouce() && !ressouce.error) {
        setQuestionsRéponses(ressouce() as QestRep)
      } else {
        ErrorDB(`${ressouce.error}, ressource: ${ressouce()}`)
      }
    }
  })

  const store = {
    questionsRéponses,
    mise_à_jour_qest (insex: number, newVal: string) {
      mise_à_jour_flashCard(flashCardName, questRép => {
        questRép.questionsRéponses[insex].question = newVal
        return questRép
      })
    },
    mise_à_jour_rép (insex: number, newVal: string) {
      mise_à_jour_flashCard(flashCardName, questRép => {
        questRép.questionsRéponses[insex].réponse = newVal
        return questRép
      })
    },
    nouvelles_questionRéponse () {
      mise_à_jour_flashCard(flashCardName, questRép => {
        questRép.questionsRéponses.push(emptyQuestRep)
        return questRép
      })
      setQuestionsRéponses(produce(flashCard => flashCard.push(emptyQuestRep)))
    },
    deleteQestRep (indexItemToDelete: number) {
      mise_à_jour_flashCard(flashCardName, questRép => {
        questRép.questionsRéponses.splice(indexItemToDelete, 1)
        return questRép
      })
      setQuestionsRéponses(
        produce(flashCard => flashCard.splice(indexItemToDelete, 1))
      )
    }
  }

  return store
}
type DataContext = ReturnType<typeof flashCardStore>
export const FlashCardContex = createContext<DataContext>() as Context<DataContext>
export const useFlashCard = () => useContext(FlashCardContex)
