import { createStore, produce, SetStoreFunction} from 'solid-js/store'
import { my_db, addFlashCardInDB, DBValues } from '../web_api/database'

class methodStore {
  flashCards: string[]
  setFlashCards: SetStoreFunction<string[]>
  
  constructor(cards: DBValues[]) {
    [this.flashCards, this.setFlashCards] = createStore(cards.map(card => card.name).reverse())
  }
  
  addFlashCard = async (newTitle: string) => {
    if (await addFlashCardInDB(newTitle))
    this.setFlashCards(
      produce(flashCards => {
        flashCards.unshift(newTitle)
      })
    )
    console.log(this.flashCards);
  }

  updateMenu = async (flashCardToDelete: string) => {
    const indexFlashCardToDelete = this.flashCards.indexOf(flashCardToDelete)
    this.setFlashCards(
      produce(flashCards => {
        flashCards.splice(indexFlashCardToDelete, 1)
      })
    )
  }

  get passStore() {
    return this.flashCards
  }
}

const newMenuStore = async () => {
  const DBMenuCards = await my_db.getAll('flash-cards')
  return new methodStore(DBMenuCards)
}

export default (await newMenuStore())