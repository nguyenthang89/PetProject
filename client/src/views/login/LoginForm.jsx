import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, TextField } from "@mui/material";
import * as actions from '../../store/auth/actions';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [ identity, setIdentity ] = useState('');
  const [ password, setPassword ] = useState('');
  const isProcessing = useSelector(({ auth }) => auth.isProcessing);

  const handleLoginForm = () => {
    if (!identity || !password) return;
    dispatch(actions.requestLogin({ identity, password }));
  };

  return (
    <>
      <TextField
        value={identity}
        fullWidth
        size="small"
        label="Username or email"
        classes={{ root: "login-row" }}
        onChange={event => setIdentity(event.target.value)}
      />
      <TextField
        type="password"
        value={password}
        fullWidth
        size="small"
        label="Password"
        classes={{ root: "login-row" }}
        onChange={event => setPassword(event.target.value)}
      />
      <Button 
        fullWidth
        size="medium"
        disabled={isProcessing}
        variant="contained"
        onClick={handleLoginForm}
      >
        { isProcessing ? 'Loading ...' : 'Log in' }
      </Button>
    </>
  )
}