import { SET_USERS, SET_USER, SET_LOGOUT } from "../constants/userConstants";

// ✅ Load user from sessionStorage on app start
const savedUser = JSON.parse(sessionStorage.getItem('user')) || null;

const initialState = {
  users: [],          // All users list
  user: savedUser,    // Logged-in user from sessionStorage
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };

    case SET_USER:
      // ✅ Save user to sessionStorage on login
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case SET_LOGOUT:
      // ✅ Clear user from sessionStorage and state
      sessionStorage.removeItem("user");
      return { ...state, user: null };

    default:
      return state;
  }
};
