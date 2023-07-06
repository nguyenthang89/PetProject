import _ from "lodash";
import express from "express";
import * as jwtProvider from './jwt-provider';

export const authRoutes = express.Router();

authRoutes.post('/login', (req, resp) => {
  const { username, password } = req.body;
  if (_.isEmpty(username) || _.isEmpty(password)) {
    return resp.status(400).send("Bad request!");
  }

  if (
    username !== process.env.AUTH_ADMIN_USER
    || password !== process.env.AUTH_ADMIN_PASSWORD
  ) {
    return resp.status(401).send("Invalid username or password!");
  }

  resp.status(200).send({
    user: username,
    token: jwtProvider.getToken({ user: username })
  });
});

export * from './middlewares';
