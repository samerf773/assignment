import { FETCH_USERS_SUCCESS, ADD_USER_SUCCESS, EDIT_USER_SUCCESS, DELETE_USER_SUCCESS } from '../actions/userActions';

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case EDIT_USER_SUCCESS:
      const { userId, updatedUserData } = action.payload;
      return {
        ...state,
        users: state.users.map(user =>
          user.id === userId ? { ...user, ...updatedUserData } : user
        ),
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export default usersReducer;
