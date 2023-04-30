import { signupAPI, gernrateOTP, loginAPI } from '@/api';

const LOGIN = 'LOGIN';
const SIGNUP = 'SIGNUP';
const OTPGENERATE = 'OTPGENERATE';
const OTPLOADING = 'OTPLOADING';
const ISLOGGEDIN = 'ISLOGGEDIN';
const ERROR = 'ERROR';

// cabReducer.js

const initialState = {
  isLoggedIn: false,
  user: null,
  authKey: null,
  loading: false,
  isOTPLoading: false,
  isSignedUp:false,
  errorMessage: '',
};

export const setError =  (message) => {
  return (dispatch) => {
    dispatch({
      type: ERROR,
      payload: message
    })
  }
}

export const OTPGeneration = (user,userDetail) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: OTPLOADING,
        isOTPLoading:true,
      })
      await gernrateOTP(user, userDetail);
      dispatch({
        type: OTPGENERATE,
        payload: { isOTPLoading: false},
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const signup = (user, userDetail) => {
  return async (dispatch) => {
    try{
      await signupAPI(user,userDetail);
      dispatch({
        type: SIGNUP,
        payload: {isSignedUp:true },
      })
    }catch(err){
      console.log(err)
    }
  }
}
export const logout = () => {
  return dispatch => {
    localStorage.clear();
    dispatch({
      type: ISLOGGEDIN,
      payload: false
    })
  }
}

export const login = (user,userDetail) => {
  return async (dispatch) => {
    try {
      const authToken = await loginAPI(user, userDetail);
      console.log(authToken.data)
      localStorage.setItem('namma_data',JSON.stringify({auth:authToken.data.token, name: authToken.data[`${user}Name`], type: user}));
      dispatch({
        type: LOGIN,
        payload: {isLoggedIn: true},
      })
    } catch (error) {
      console.log(error.response.data.message)
      dispatch({
        type: ERROR,
        payload: error.response.data.message
      })
    }
  }
}

const cabReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case SIGNUP:
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload,
      };
    case OTPGENERATE:   
      return {
        ...state,
        ...action.payload
      }
    case OTPLOADING:
      return {
        ...state,
        isOTPLoading: action.payload,
      }
    case ISLOGGEDIN: 
      return {
        ...state,
        isLoggedIn: action.payload
      }
    case ERROR: 
      return {
        ...state,
        errorMessage: action.payload
      }
    default:
      return state;
  }
};

export default cabReducer;
