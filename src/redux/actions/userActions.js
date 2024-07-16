// userActions.js

// Mock data
let users = [
  { id: 1, firstName: 'Samer', lastName: 'Farhat', email: 'Samer@example.com', phone: '+1111111',age:'20' ,Address:'Beirut',nbrServicesSub:'2' },
  { id: 2, firstName: 'Samer', lastName: 'Farhat', email: 'Samer@example.com', phone: '+1111112',age:'20' ,Address:'Beirut',nbrServicesSub:'2' },
  { id: 3, firstName: 'Samer', lastName: 'Farhat', email: 'Samer@example.com', phone: '+1111113',age:'20' ,Address:'Beirut',nbrServicesSub:'2' },
];

// Generate unique ID for new users
let nextId = users.length + 1;

// Action Types
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

// Action Creators
export const fetchUsersSuccess = () => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const addUserSuccess = (newUser) => ({
  type: ADD_USER_SUCCESS,
  payload: newUser,
});

export const editUserSuccess = (userId, updatedUserData) => ({
  type: EDIT_USER_SUCCESS,
  payload: { userId, updatedUserData },
});

export const deleteUserSuccess = (userId) => ({
  type: DELETE_USER_SUCCESS,
  payload: userId,
});

// Thunk Action Creators
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      // Simulate delay for loading effect (optional)
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(fetchUsersSuccess());
    } catch (error) {
      console.error('Error fetching users', error);
      // Handle error as needed (e.g., show error message)
    }
  };
};

export const addUser = (newUser) => {
  return async (dispatch) => {
    try {
      // Simulate delay for loading effect (optional)
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userWithId = { ...newUser, id: nextId++ };
      users.push(userWithId);
      console.log(newUser)
      console.log(users)
      dispatch(addUserSuccess(userWithId));
    } catch (error) {
      console.error('Error adding user', error);
      // Handle error as needed (e.g., show error message)
    }
  };
};

export const editUser = (userId, updatedUserData) => {
  return async (dispatch) => {
    try {
      // Simulate delay for loading effect (optional)
      await new Promise(resolve => setTimeout(resolve, 1000));
      users = users.map(user =>
        user.id === userId ? { ...user, ...updatedUserData } : user
      );
      dispatch(editUserSuccess(userId, updatedUserData));
    } catch (error) {
      console.error(`Error editing user with ID ${userId}`, error);
      // Handle error as needed (e.g., show error message)
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      // Simulate delay for loading effect (optional)
      await new Promise(resolve => setTimeout(resolve, 1000));
      users = users.filter(user => user.id !== userId);
      dispatch(deleteUserSuccess(userId));
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}`, error);
      // Handle error as needed (e.g., show error message)
    }
  };
};
