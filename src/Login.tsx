import axios from 'axios'
import LoginForm from './forms/Login'
import { useAuth } from './hooks/useAuth'
import { config } from './utils/config'

const Login = () => {
  const { login } = useAuth()
  
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
    catch(e) {
      console.log('Login error', e)
      throw new Error('Login error')
    }
  }

  return (
    <div>
      <LoginForm handleLogin={handleLogin} />
    </div>
  )
}

export default Login
