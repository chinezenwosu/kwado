import { useState } from 'react'
import axios from 'axios'
import LoginForm from './forms/LoginForm'
import { useAuth } from './hooks/useAuth'
import { config } from './utils/config'

const Login = () => {
  const { login } = useAuth()
  const [error, setError] = useState('')
  
  const handleLogin = async ({ email, password }: { email: string, password: string }) => {
    try {
      await axios.post(`${config.url.api}/users/login`, {
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
      <LoginForm handleLogin={handleLogin} error={error} />
    </div>
  )
}

export default Login
