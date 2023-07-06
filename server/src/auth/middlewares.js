import _ from "lodash";
import * as jwtProvider from './jwt-provider';
import { HTTP_AUTH_BEARER_TYPE, HTTP_AUTH_HEADER_NAME } from "../utilities/constants";

const lookupToken = req => {
  const authInfo = req.get(HTTP_AUTH_HEADER_NAME);
  if (authInfo && _.startsWith(authInfo, HTTP_AUTH_BEARER_TYPE)) {
    return authInfo.substring(HTTP_AUTH_BEARER_TYPE.length);
  }
  return null;
}

export const authenticate = (req, resp, next) => {
  try {
    req.$token = lookupToken(req);
    if (jwtProvider.isNoneValid(req.$token)) {
      return resp.status(401).send('Unauthenticated');
    }
    next();
  } catch(err) {
    console.error('Failed to authenticate a request.', err);
    resp.status(500).send('Something failed!');
  }
};

export const bindAuthInfo = (req, resp, next) => {
  try {
    const token = req.$token || lookupToken(req);
    console.log(token);
    req.$auth = jwtProvider.getClaims(token) || {};
    next();
  } catch(err) {
    console.error('Failed to authenticate a request.', err);
    resp.status(500).send('Something failed!');
  }
}