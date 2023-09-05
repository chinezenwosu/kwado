import { useState } from 'react'

const ONE_HOUR = 1000 * 60 * 60

export const useLocalStorage = () => {
  const [value, setValue] = useState<string | null>(null)

  const setItem = (key: string, val: string) => {
    localStorage.setItem(key, val)
    setValue(val)
  }

  const getItem = (key: string) => {
    const item = localStorage.getItem(key)

    if (item && item !== 'undefined') {
      setValue(item)
      return item
    }

    return null
  }

  const setItemWithExpiry = (key: string, val: Object, ttl = ONE_HOUR) => {
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
      setValue(null)
      return null
    }

    const itemObject = JSON.parse(item)
    // compare the expiry time of the item with the current time
    if (Date.now() > itemObject.expiry) {
      removeItem(key)
      return null
    }

    const valueString = JSON.stringify(itemObject.value)
    setValue(valueString)
    return valueString || null
  }

  const removeItem = (key: string) => {
    localStorage.removeItem(key)
    setValue(null)
  }

  return {
    value,
    setItem,
    getItem,
    setItemWithExpiry,
    getItemWithExpiry,
    removeItem,
  }
}
