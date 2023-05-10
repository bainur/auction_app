import {
  LOGIN,
  LOGOUT,
} from "../actions/authActions";

const initialState = {
  authToken: ""
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN:
      console.log('LOGIN')
      return {
        ...state,
        authToken: action.authToken
      }
    case LOGOUT:
      console.log('LOGOUT')
      return {
        ...state,
        authToken: ""
      }
    default:
      return state
  }
}

export default reducer
