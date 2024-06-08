import React, { createContext, useReducer, useState, useEffect } from 'react';

export const AuthContext = createContext();

const initialState = {
  userinfo: JSON.parse(localStorage.getItem('userinfo')) || null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userinfo: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        userinfo: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        userinfo: action.payload,
      };
      case 'SET_INITIAL_USER':
      return {
        ...state,
        userinfo: state.userinfo || action.payload, // Only set initial userinfo if not already set
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({ type: 'SET_INITIAL_USER', payload: JSON.parse(localStorage.getItem('userinfo')) });
  }, []);

  const login = (userData) => {
    dispatch({ type: 'LOGIN', payload: userData });
    localStorage.setItem('userinfo', JSON.stringify(userData));
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('userinfo');
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
    localStorage.setItem('userinfo', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ state, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
