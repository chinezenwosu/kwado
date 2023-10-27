const ONE_HOUR = 1000 * 60 * 60

export const useLocalStorage = () => {
  const setItem = (key: string, val: string) => {
    localStorage.setItem(key, val)
  }

  const getItem = (key: string) => {
    const item = localStorage.getItem(key)

    if (item && item !== 'undefined') {
      return item
    }

    return null
  }

  const setItemWithExpiry = (key: string, val: object, ttl = ONE_HOUR) => {
    const item = {
      value: val,
      expiry: Date.now() + ttl,
    }
    const valueString = JSON.stringify(item)

    setItem(key, valueString)
  }

  const getItemWithExpiry = (key: string) => {
    const item = getItem(key)

    if (!item) {
      return null
    }

    const itemObject = JSON.parse(item)
    // compare the expiry time of the item with the current time
    if (Date.now() > itemObject.expiry) {
      removeItem(key)
      return null
    }

    const valueString = JSON.stringify(itemObject.value)
    return valueString || null
  }

  const removeItem = (key: string) => {
    localStorage.removeItem(key)
  }

  return {
    setItem,
    getItem,
    setItemWithExpiry,
    getItemWithExpiry,
    removeItem,
  }
}
