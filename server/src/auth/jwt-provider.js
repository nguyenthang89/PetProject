import _ from "lodash";
import jwt from "jsonwebtoken";

const CLV_ISSUER = "CLV";
const ACTIVED_ALGORITHM = process.env.AUTH_JWT_ALGORITHM || "HS512";

export const getToken = (claims = {}) => {
  return jwt.sign(claims, process.env.AUTH_JWT_SECRET, {
    algorithm: ACTIVED_ALGORITHM,
    expiresIn: '1h',
    issuer: CLV_ISSUER
  });
};

export const isNoneValid = token => !isValid(token);

export const isValid = token => {
  if (_.isEmpty(token)) return false;
  try {
    jwt.verify(token, process.env.AUTH_JWT_SECRET, {
      algorithms: [ ACTIVED_ALGORITHM ],
      issuer: CLV_ISSUER,
      complete: false
    });
    return true;
  } catch(err) {
    console.debug("Invalid token: " + token, err);
    return false;
  }
}

export const getClaims = token => {
  try {
    return jwt.decode(token, {
      algorithms: [ ACTIVED_ALGORITHM ],
      issuer: CLV_ISSUER
    });
  } catch(err) {
    console.debug("Invalid token: " + token, err);
    return {};
  }
}