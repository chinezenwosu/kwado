import { routes } from '../../utils'
import styles from './404Page.module.css'

const PageNotFound = () => {
  return (
    <div className={styles.pageNotfound}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.actionText}>
        We know you&apos;re stuck. You can{' '}
        <a className={styles.homeLink} href={routes.getHome()}>
          go back home
        </a>{' '}
        now
      </p>
    </div>
  )
}

export default PageNotFound
