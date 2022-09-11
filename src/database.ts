import { openDB } from 'idb/with-async-ittr'

export const open_my_DB = async () => {
  return await openDB('flash-cards', 1, {
    upgrade (db) {
      // Create a store of objects
      const store = db.createObjectStore('flash-cards', {
        // The 'id' property of the object will be the key.
        keyPath: 'id',
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true
      })
      // Créez un index sur la propriété 'date' des objets.
      store.createIndex('name', 'name')
    }
  })
}

export const my_db = await open_my_DB()

export const mise_à_jour_flashCard = async (
  flashCardName: string,
  modifyQuestionsRéponses: BlobCallback
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
    console.log('error : ', err)
  }
}

export const addFlashCardInDB = async (
  flashCardName: string,
  withDeletion = false,
  questionsRéponses = [
    {
      question: '',
      reponse: ''
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
      console.error(
        `erreur lors de l'ajout de la flash card ${flashCardName} contenant ${questionsRéponses} : `,
        err
      )
    )
  return isAdded
}
