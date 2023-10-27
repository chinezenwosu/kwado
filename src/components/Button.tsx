import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick: () => void
}

const Button = (props: ButtonProps) => {
  const { children, onClick, className } = props

  return (
    <button
      {...props}
      className={`${styles.button} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
