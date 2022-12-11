import { Accessor, createDeferred, createEffect, createSignal, Setter, observable } from 'solid-js'
import { from } from "rxjs";
import { ErrorDB } from '../defaultToast'

const createDB = (DBName: string, StoreName: string) =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const DBConnection = indexedDB.open(DBName)

    const upgradeneeded = () => DBConnection.result.createObjectStore(StoreName)
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

const DBPersistantStore = (
  DBName = 'Flash-Cards',
  StoreName = 'Persistant-Store'
) => {
  const getStore = async () => {
    const Store = (await createDB(DBName, StoreName))
      .transaction(StoreName, 'readwrite')
      .objectStore(StoreName)
    return Store
  }

  const set = (key: string, value: any) => {
    getStore().then(Store => {
      Store.put(value, key)
      Store.transaction.addEventListener('error', ErrorDB)
    })
  }

  const remove = (key: string) => {
    getStore().then(Store => {
      Store.delete(key)
      Store.transaction.addEventListener('error', ErrorDB)
    })
  }

  const getRequest = async (key: string) => {
    const Store = await getStore()
    const request = Store.get(key)
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


export const createPersistantSignal = <T>(
  state: T,
  name?: string
): [
  Accessor<T>,
  Setter<T>,
] => {
  const [signal, setSignal] = createSignal(state, { name })
  const discriminant = (name || setSignal.prototype.Symbol) + ' ' + typeof state

  getPromise(discriminant).then(res => {
    if (res) {
      setSignal(res)
    } else {
      set(discriminant, state)
    }
  })

  createEffect(() => {
    set(discriminant, JSON.parse(JSON.stringify(signal())))
  })

  return [createDeferred(signal), setSignal]
}


export const createLocalStorageSignal = <T extends object>(state: T, name?: string): [Accessor<T>, Setter<T>] => {
  const [value, setValue] = createSignal<T>(state, { name });
  const discriminant = (name || setValue.prototype.Symbol) + ' ' + typeof state

  getPromise(discriminant).then(res => {
    if (res) {
      setValue(res)
    } else {
      set(discriminant, state)
    }
  })

  const newSetValue = (newValue: T | ((v: T) => T)): T => {
    const _val: T = typeof newValue === 'function' ? newValue(value()) : newValue
    setValue(_val as any);
    set(discriminant, JSON.parse(JSON.stringify(_val)))
    return _val;
  };

  return [value, newSetValue as Setter<T>];
}

export const load = (name: string) => getSignal(name)
export const persistent = <T>(value: T, name: string) => set(name, JSON.parse(JSON.stringify(value)))