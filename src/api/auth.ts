import fetch, { Response } from '../lib/fetch'

export type LoginDetails = {
  email: string
  password: string
}

export type SignupDetails = {
  firstName: string
  lastName: string
  email: string
  password: string
}

const login = async(data: LoginDetails) => {
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

const signup = async(data: SignupDetails) => {
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
