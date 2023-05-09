import {
  LOGIN,
  LOGOUT,
} from "../actions/authActions";

const initialState = {
  isLoggedIn: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN:
      console.log('LOGIN')
      return {
        ...state,
        isLoggedIn: true
      }
    case LOGOUT:
      console.log('LOGOUT')
      return {
        ...state,
        isLoggedIn: false
      }
    default:
      return state
  }
}

export default reducer
