import localForage from 'localforage'

export const setLocalItem = (store, camp, list) => {
  localForage.setItem(`${store}-${camp}`, list)
}

export const getLocalItem = async (store, camp) => {
  const data = await localForage.getItem(`${store}-${camp}`)
  return data
}