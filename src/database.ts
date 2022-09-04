import { openDB } from 'idb'

export const open_my_DB = async () => {
  return await openDB('flash-cards', 2, {
    upgrade (db) {
      // Create a store of objects
      const store = db.createObjectStore('flash-cards', {
        // The 'id' property of the object will be the key.
        keyPath: 'id',
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      });
      // Créez un index sur la propriété 'date' des objets.
      store.createIndex('name', 'name');
    }
  })
}