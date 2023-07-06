import { useNavigate } from 'react-router-dom';
import * as actions from '../../store/auth/actions';
import { useDispatch, useSelector } from 'react-redux';

import styles from './layout.module.css';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(({ auth }) => auth.user);

  const handleLogout = () => {
    dispatch(actions.requestLogout());
    navigate('/login');
  };

  return (
    <div className={styles.header}>
      <div className={styles.userLabel} onClick={handleLogout}> 
        { currentUser } 
      </div>
    </div>
  )
}