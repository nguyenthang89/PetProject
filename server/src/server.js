import './utilities/env';
import './db';

import path  from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import serveStatic from 'serve-static';
import cookieParser from 'cookie-parser';
import { userRoutes } from './user';
import { authenticate, authRoutes } from './auth';
import { isDevelopmentMode } from './utilities/env';
import cors from 'cors';

const app = express();

if (isDevelopmentMode) {
  app.use(cors({ origin: '*' }));
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', serveStatic(path.resolve(process.cwd(), 'public'), {
  index: false,
  maxAge: '30d'
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', authenticate, userRoutes);

app.use((err, req, resp, next) => {
  console.error(err.stack);
  if (isDevelopmentMode) {
    resp.status(500).json({ message: 'Something failed!', error: err.stack });
  } else {
    resp.status(500).send('Something failed!');
  }
});

app.listen(5000, () => {
  console.log(`Example app listening on port ${5000}`);
});