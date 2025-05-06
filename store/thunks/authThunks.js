// store/thunks/authThunks.js
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import { _getUsers } from '../../utils/_DATA';

export const login = (username, password) => async (dispatch) => {
  dispatch(loginStart());
  
  try {
    const users = await _getUsers();
    const user = users[username];
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (user.password !== password) {
      throw new Error('Incorrect password');
    }
    
    dispatch(loginSuccess(user));
    return user;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};
