import { User } from '../hooks/useUser'

const formatString = {
  hyphenToUpperCamelCase: (str: String) => {
    return str
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  },
  getUserFullName: (user: User | null) => {
    const { firstName = '', lastName = '' } = user || {}
    return `${firstName} ${lastName}`.trim()
  },
}

export default formatString
