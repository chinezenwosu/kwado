export interface User {
  firstName: string
  lastName: string
  email: string
}

export interface LoggedInUser {
  email: string
  password: string
}

export interface SignedUpUser extends User {
  password: string
}
