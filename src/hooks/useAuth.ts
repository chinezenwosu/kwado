import { useEffect, useState } from 'react'
import { useUser, User } from './useUser'
import { useLocalStorage } from './useLocalStorage'

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser()
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [isAuthInitialized, setIsAuthInitialized] = useState(false)
  const { getItemWithExpiry } = useLocalStorage()

  useEffect(() => {
    const userItem = getItemWithExpiry('user')
    
    if (userItem) {
      addUser(JSON.parse(userItem))
    }
    setIsAuthInitialized(true)
  }, [])

  const login = () => {
    setLoggedIn(true)
  }

  const loginWithUser = (user: User) => {
    addUser(user)
  }

  const logout = () => {
    removeUser()
  }

  return { isAuthInitialized, user, login, logout, loginWithUser, loggedIn }
}
