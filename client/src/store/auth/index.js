import * as TYPES from './types';

const initState = {
  user: null,
  isAuthenticated: false,
  isProcessing: null,
  errorMessage: null
}

export const authReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TYPES.UPDATE_AUTH_INFO: 
      return { 
        ...state, 
        ...payload, 
        errorMessage: null,
        isProcessing: false
    };
    case TYPES.REMOVE_AUTH_INFO: 
      return { 
        ...state, 
        user: null,
        isAuthenticated: false,
        errorMessage: null,
        isProcessing: false
      };
    case TYPES.LOGIN_FAILED: 
      return { 
        ...state, 
        errorMessage: payload
      };
    case TYPES.LOGIN_PROCESSING: 
      return { 
        ...state, 
        isProcessing: payload
      };
    default:
      return state;
  }
}