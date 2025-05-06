import { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/thunks/authThunks';
import { logout } from '../../store/slices/authSlice'; // Import from slice instead of thunk

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated, error, loading } = useSelector((state) => state.auth);
  
  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('employeePollsUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch({ type: 'auth/loginSuccess', payload: parsedUser });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('employeePollsUser');
      }
    }
  }, [dispatch]);
  
  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('employeePollsUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('employeePollsUser');
    }
  }, [user]);
  
  const handleLogin = async (username, password) => {
    try {
      return await dispatch(login(username, password));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
