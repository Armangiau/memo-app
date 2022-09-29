import { openDB, DBSchema } from 'idb/with-async-ittr'
import { ErrorDB } from "../defaultToast";

export type DBValues = {
  name: string
  questionsRéponses: {
    question: string
    réponse: string
  }[]
}

interface MyFlashCardsDB extends DBSchema {
  'flash-cards': {
    value: DBValues
    key: number
    indexes: { name: string }
  }
}

const open_my_DB = async () => {
  return await openDB<MyFlashCardsDB>('flash-cards', 1, {
    upgrade (db) {
      // Create a store of objects
      const store = db.createObjectStore('flash-cards', {
        // La propriétée 'id' de l'objet va être la clef.
        keyPath: 'id',
        // Si ce n'est pas explisite ajouter, création d'une valeur par incrémentation.
        autoIncrement: true
      })
      // Créez un index sur la propriété 'name' des objets.
      store.createIndex('name', 'name')
    }
  })
}

export const my_db = await open_my_DB()

export const mise_à_jour_flashCard = async (
  flashCardName: string,
  modifyQuestionsRéponses: (questRép: DBValues) => DBValues
) => {
  try {
    const tx = my_db.transaction('flash-cards', 'readwrite')
    const index = tx.store.index('name')

    for await (const cursor of index.iterate(flashCardName)) {
      let questRép = { ...cursor.value }

      questRép = modifyQuestionsRéponses(questRép)

      cursor.update(questRép)
    }
    await tx.done
  } catch (err) {
    ErrorDB(err)
  }
}

export const addFlashCardInDB = async (
  flashCardName: string,
  withDeletion = false,
  questionsRéponses = [
    {
      question: '',
      réponse: ''
    }
  ]
): Promise<boolean> => {
  const sameNameCard = await my_db.getFromIndex(
    'flash-cards',
    'name',
    flashCardName
  )

  let isAdded = true

  if (sameNameCard != undefined) {
    isAdded = false
    if (withDeletion) {
      const sameNameCardKey = await my_db.getKeyFromIndex(
        'flash-cards',
        'name',
        flashCardName
      )
      sameNameCardKey ? my_db.delete('flash-cards', sameNameCardKey) : isAdded
    } else {
      return isAdded
    }
  }

  await my_db
    .add('flash-cards', {
      name: flashCardName,
      questionsRéponses: questionsRéponses
    })
    .catch(err =>
      ErrorDB(`erreur lors de l'ajout de la flash card ${flashCardName} contenant ${questionsRéponses} : ${err}`)
    )
  return isAdded
}

export const deleteFlashCardInDB = async (flashCardToDelete: string) => {
  const key = await my_db.getKeyFromIndex(
    'flash-cards',
    'name',
    flashCardToDelete
  )
  if (key) {
    await my_db.delete('flash-cards', key)
  }
}
