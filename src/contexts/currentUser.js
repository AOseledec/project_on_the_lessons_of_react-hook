import React, { createContext, useReducer } from 'react';

import * as type from '../utils/constants';

const initialState = {
  isLoading: false,
  isLoggedIn: null,
  currentUser: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case type.LOADING:
      return {...state, isLoading: true}
    case type.SET_AUTHORIZED:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: action.payload
      }
    case type.SET_UNAUTHORIZED:
      return {
        ...state,
        isLoggedIn: false
      }
    case type.LOGOUT:
      return {
        ...initialState,
        isLoggedIn: false,
      }
    default:
      return state
  }
}

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({children}) => {
  const value = useReducer(reducer, initialState)

  return (
      <CurrentUserContext.Provider value={value}>
        {children}
      </CurrentUserContext.Provider>
    );
};