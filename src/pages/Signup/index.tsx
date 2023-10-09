import { useState } from 'react'
import axios from 'axios'
import SignupForm from './components/Form'
import { config } from '../../utils'
import { useAuth } from '../../hooks/useAuth'

const Signup = () => {
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSignup = async ({ firstName, lastName, email, password }: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  }) => {
    try {
      await axios.post(`${config.url.api}/users/signup`, {
        firstName,
        lastName,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      login()
      window.location.reload()
    }
    catch(err: any) {
      setError(err.response.data)
    }
  }

  return (
    <div>
      <SignupForm handleSignup={handleSignup} error={error} />
    </div>
  )
}

export default Signup
