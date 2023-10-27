import fetch, { Response } from '../lib/fetch'
import { LoggedInUser, SignedUpUser } from '../types/User'

const login = async(data: LoggedInUser) => {
  let response: Response = {}
  const { email, password } = data

  try {
    const loginRes = await fetch.post('users/login', {
      email,
      password,
    })

    response.data = loginRes.data
    return response
  }
  catch(e) {
    return { error: e }
  }
}

const loginWithSession = async() => {
  let response: Response = {}

  try {
    const loginRes = await fetch.get('users/session')

    response.data = loginRes.data
    return response
  }
  catch(e) {
    return { error: e }
  }
}

const signup = async(data: SignedUpUser) => {
  let response: Response = {}
  const { firstName, lastName, email, password } = data

  try {
    const signupRes = await fetch.post('users/signup', {
      firstName,
      lastName,
      email,
      password,
    })

    response.data = signupRes.data
    return response
  }
  catch(e) {
    return { error: e }
  }
}

const logout = async() => {
  let response: Response = {}

  try {
    const logoutRes = await fetch.post('users/logout')

    response.data = logoutRes.data
    return response
  }
  catch(e) {
    return { error: e }
  }
}

export { login, loginWithSession, signup, logout }
