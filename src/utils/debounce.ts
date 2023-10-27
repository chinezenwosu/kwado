const debounce = (func: (...args: unknown[]) => void, timeout = 1000) => {
	let timer: number

	return (...args: unknown[]) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

const debounceLeading = (
	func: (...args: unknown[]) => void,
	timeout = 1000,
) => {
	let timer: number | undefined

	return (...args: unknown[]) => {
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
