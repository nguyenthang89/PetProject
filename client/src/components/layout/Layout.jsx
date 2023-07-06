import { Header } from './Header';
import styles from './layout.module.css';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.rightContainer}>
        <Header />
        <div className={styles.screenContainer}>
          { children }
        </div>
      </div>
    </div>
  )
}