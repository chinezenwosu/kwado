import React, { useState } from 'react'

interface LoginFormProps {
  handleLogin: ({
    email,
    password,
  }: {
    email: string,
    password: string
  }) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLogin }) => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)
    try {
      handleLogin({ email, password })
    }
    catch (err) {
      setError(err as string)
    }
    setIsLoading(false)
  }

  const onClick = async () => {
    setIsLoading(true)
    try {
      handleLogin({
        email: 'chineze@yahoo.com',
        password: 'afttdsy',
      })
    }
    catch (err) {
      setError(err as string)
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <p>Loading</p>
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange}/>

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange}/>

        <button type="submit">Submit</button>
        <p>{ error }</p>
      </form>
      <button onClick={onClick}>Test login</button>
    </>
  )
}

export default LoginForm