import React, { useState } from 'react'

// TODO: add form verification
interface SignupFormProps {
  error: string,
  handleSignup: ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  }) => void
}

const SignupForm: React.FC<SignupFormProps> = ({ handleSignup, error }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const { firstName, lastName, email, password } = formData

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)
    handleSignup({ firstName, lastName, email, password })
    setIsLoading(false)
  }

  if (isLoading) {
    return <p>Loading</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>

      <label htmlFor="lastName">Last Name:</label>
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>

      <label htmlFor="email">Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange}/>

      <label htmlFor="password">Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange}/>

      <button type="submit">Submit</button>
      <p>{ error }</p>
    </form>
  )
}

export default SignupForm
