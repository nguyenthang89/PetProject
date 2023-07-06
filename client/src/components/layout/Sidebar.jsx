import { Link } from 'react-router-dom';
import styles from './layout.module.css';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}> SF </div>
      <p className={styles.link}>
        <Link to="/"> Dashboard </Link>
      </p>
      <p className={styles.link}>
        <Link to="/users"> Users </Link>
      </p>
      <p className={styles.link}>
        <Link to="/tasks"> Tasks </Link>
      </p>
      <p className={styles.link}>
        <Link to="/efforts"> Efforts </Link>
      </p>
    </div>
  )
}