// Define action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (authToken) => {
  return {
    type: LOGIN,
    authToken: authToken
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
