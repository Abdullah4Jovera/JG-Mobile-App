import React, { createContext, useReducer, useState, useEffect } from 'react';

export const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem('userInfo')) || null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userInfo: action.payload,
      };
    // case 'LOGOUT':
    //   return {
    //     ...state,
    //     userInfo: null,
    //   };
    // case 'UPDATE_USER':
    //   return {
    //     ...state,
    //     user: action.payload,
    //   };
    //   case 'SET_INITIAL_USER':
    //   return {
    //     ...state,
    //     user: state.user || action.payload,
    //   };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
 const [state, dispatch] = useReducer(reducer, initialState);
 console.log(state,'stateProvider')
//   const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({ type: 'SET_INITIAL_USER', payload: JSON.parse(localStorage.getItem('userInfo')) });
  }, []);

   const login = (userData) => {
    dispatch({ type: 'LOGIN', payload: userData });
    localStorage.setItem('userInfo', JSON.stringify(userData));
};


//   const logout = () => {
//     dispatch({ type: 'LOGOUT' });
//     localStorage.removeItem('userInfo');
//   };

//   const updateUser = (userData) => {
//     dispatch({ type: 'UPDATE_USER', payload: userData });
//     localStorage.setItem('userInfo', JSON.stringify(userData));
//   };

  return (
    <AuthContext.Provider value={{login}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;