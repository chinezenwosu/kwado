const debounce = (func: (...args: any[]) => void, timeout = 1000) => {
  let timer: number

  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

const debounceLeading = (func: (...args: any[]) => void, timeout = 1000) => {
  let timer: number | undefined

  return (...args: any[]) => {
    if (!timer) {
      func.apply(this, args)
    }

    clearTimeout(timer)

    timer = setTimeout(() => {
      timer = undefined
    }, timeout)
  }
}

export { debounce, debounceLeading }
