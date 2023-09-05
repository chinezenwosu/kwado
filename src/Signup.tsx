import axios from 'axios'
import SignupForm from './forms/Signup'
import { config } from './utils/config'
import { useAuth } from './hooks/useAuth'

const Signup = () => {
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
    catch(e) {
      console.log('Signup error', e)
      throw new Error('Signup error')
    }
  }

  return (
    <div>
      <SignupForm handleSignup={handleSignup} />
    </div>
  )
}

export default Signup
