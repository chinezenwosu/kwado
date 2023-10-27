import React, { ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonProps = {
	children: ReactNode
	onClick: () => void
	className: string
}

const Button = ({ children, onClick, className }: ButtonProps) => {
	return (
		<button className={`${styles.button} ${className}`} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
