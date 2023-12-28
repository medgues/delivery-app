import React, { createContext, useContext, useReducer } from "react";

export const stateContex = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <stateContex.Provider value={useReducer(reducer, initialState)}>
    {children}
  </stateContex.Provider>
);

export const useStateValue = () => useContext(stateContex);
