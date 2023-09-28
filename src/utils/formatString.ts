const formatString = {
  hyphenToUpperCamelCase: (str: String) => {
    return str
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  }
}

export default formatString
