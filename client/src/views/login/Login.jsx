import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from './LoginForm';

import './login.scss';

const Login = () => {
  const navigate = useNavigate();
  const errorMessage = useSelector(({ auth }) => auth.errorMessage);
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [ isAuthenticated, navigate ]);
  
  return (
    <div className='container'> 
      <div className='login-card'>
        <div className='login-title'>Welcome to SF</div>
        <div className='login-form'>
          {
            !!errorMessage && (
              <p className='login-error-message'>
                { errorMessage }
              </p>
            )
          }
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login;