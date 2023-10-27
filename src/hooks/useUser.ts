import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { User } from '../types/User'

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
