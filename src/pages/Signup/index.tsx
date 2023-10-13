import { useState } from 'react'
import SignupForm from './components/Form'
import { useAuth } from '../../hooks/useAuth'
import { SignupDetails } from '../../api/auth'

const Signup = () => {
  const [error, setError] = useState('')
  const { signup } = useAuth()

  const handleSignup = async ({ firstName, lastName, email, password }: SignupDetails) => {
    const { error } = await signup({
      firstName,
      lastName,
      email,
      password,
    })

    if (error) {
      setError(error?.response?.data)
    } else {
      window.location.reload()
    }
  }

  return (
    <div>
      <SignupForm handleSignup={handleSignup} error={error} />
    </div>
  )
}

export default Signup
