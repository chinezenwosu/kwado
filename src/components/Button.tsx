import styles from './Button.module.css'

type ButtonProps = {
  label: String,
  onClick: () => void,
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>{ label }</button>
  )
}

export default Button
