import { useEffect, useState } from 'react'
import { useUser } from './useUser'
import { useLocalStorage } from './useLocalStorage'
import * as authApi from '../api/auth'
import { LoggedInUser, SignedUpUser } from '../types/User'

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

	const login = async (user: LoggedInUser) => {
		const { data, error } = await authApi.login(user)
		if (!error) {
			setLoggedIn(true)
		}

		return { data, error }
	}

	const signup = async (user: SignedUpUser) => {
		const { data, error } = await authApi.signup(user)
		if (!error) {
			setLoggedIn(true)
		}

		return { data, error }
	}

	const loginWithSession = async () => {
		const { data } = await authApi.loginWithSession()
		if (data?.isLoggedIn) {
			addUser(data.user)
		}
	}

	const logout = async () => {
		const { data, error } = await authApi.logout()
		if (!error) {
			removeUser()
		}

		return { data, error }
	}

	return {
		isAuthInitialized,
		user,
		login,
		signup,
		logout,
		loginWithSession,
		loggedIn,
	}
}
