/* eslint-disable */
import React, { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext();

const userInfoInitialState = {
  userId: "", userName: "", type: "", ethAddress: "", email: "", nickName: "", userRole: "", userIsAdmin: false, underlyingEthAddress: "", underlyingOrgId: "",underlyingOrgName: "", reviewers: [], addByOthersKey: "", uniqueId: ""
};

export const ContextProvider = ({ children }) => {
  
  return (
    <StateContext.Provider value={{

    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);