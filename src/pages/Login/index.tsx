import { useState } from 'react'
import LoginForm from './components/Form'
import { useAuth } from '../../hooks/useAuth'
import { LoggedInUser } from '../../types/User'

const Login = () => {
  const { login } = useAuth()
  const [error, setError] = useState('')
  
  const handleLogin = async ({ email, password }: LoggedInUser) => {
    const { error } = await login({ email, password })

    if (error) {
      setError(error?.response?.data)
    } else {
      window.location.reload()
    }
  }

  return (
    <div>
      <LoginForm handleLogin={handleLogin} error={error} />
    </div>
  )
}

export default Login
