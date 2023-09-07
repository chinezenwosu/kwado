import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

// NOTE: optimally move this into a separate file
export interface User {
  firstName: string
  lastName: string
  email: string
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const { setItem, setItemWithExpiry } = useLocalStorage()

  const addUser = (user: User) => {
    setUser(user)
    setItemWithExpiry('user', user)
  }

  const removeUser = () => {
    setUser(null)
    setItem('user', '')
  }

  return { user, addUser, removeUser }
}
