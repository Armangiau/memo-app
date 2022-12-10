import { createDeferred, createSignal} from 'solid-js'
import {
  createStore,
  createMutable,
  modifyMutable,
  StoreNode,
  Store,
  SetStoreFunction,
} from 'solid-js/store'
import { ErrorDB } from '../defaultToast'

const createDB = (DBName: string, storeName: string) => new Promise<IDBDatabase>((resolve, reject) => {
  const DBConnection = indexedDB.open(DBName)

  const upgradeneeded = () => DBConnection.result.createObjectStore(storeName)
  DBConnection.addEventListener('upgradeneeded', upgradeneeded)

  const error = (err: Event) => {
    ErrorDB(err)
    reject(err)
  }
  DBConnection.addEventListener('error', error)
  // DBConnection.addEventListener('blocked', error)

  const success = () => resolve(DBConnection.result)
  DBConnection.addEventListener('success', success)
})


const DBPersistantStore = (DBName = 'Flash-Cards', storeName = 'Persistant-Store') => {
  
  const getStore = async () => {
    const store = (await createDB(DBName, storeName))
      .transaction(storeName, 'readwrite')
      .objectStore(storeName)
    return store
  }

  const set = (key: string, value: any) => {
    getStore().then(store => {
      store.put(value, key)
      store.transaction.addEventListener('error', ErrorDB)
    })
  }

  const remove = (key: string) => {
    getStore().then(store => {
      store.delete(key)
      store.transaction.addEventListener('error', ErrorDB)
    })
  }

  const getRequest = async (key: string) => {
    const store = await getStore()
    const request = store.get(key)
    request.addEventListener('error', ErrorDB)
    return request
  }

  const getSignal = (key: string) => {
    const [result, setResult] = createSignal()
    getRequest(key).then(req => {
      req.addEventListener('success', () => setResult(req.result))
    })
    return createDeferred(result)
  }

  const getPromise = async (key: string) => {
    const req = await getRequest(key)
    return new Promise<any>(resolve => {
      req.addEventListener('success', () => resolve(req.result))
    })
  }

  return { set, remove, getSignal, getPromise }
}

export const { set, remove, getSignal, getPromise } = DBPersistantStore()

export const createPersistantStore = <T extends StoreNode>(
  state: T | Store<T>,
  name?: string
): [Store<T>, (setter: (store: T) => T) => void, (setter: (store: T) => T) => void] => {
  const [store, setStore] = createStore(state, { name })

  const discriminant = (name || setStore.prototype.Symbol) + ' ' + typeof state

  getPromise(discriminant).then(res => {
    if (res) {
      setStore(res)
    } else {
      set(discriminant, state)
    }
  })

  const setPersistantStore = (setter: (store: T) => T) => {
    const value = createMutable(store)
    modifyMutable(value, setter)
    const copy = JSON.parse(JSON.stringify(value))
    setStore(copy)
    set(discriminant, copy)
  }

  const setInDB = (setter: (store: T) => T) => {
    const value = createMutable(store)
    modifyMutable(value, setter)
    const copy = JSON.parse(JSON.stringify(value))
    set(discriminant, copy)
  }
  return [
    store,
    setPersistantStore as SetStoreFunction<T>,
    setInDB
  ]
}
