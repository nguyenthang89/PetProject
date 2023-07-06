import styles from './not-found.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}> 
      <div className={styles.message}>
        Page not found
      </div>
    </div>
  )
}

export default NotFound;