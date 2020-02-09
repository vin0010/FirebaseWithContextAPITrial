import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import AuthContext, { authInitialState, IAuthContext } from './auth-context';

const AuthProvider: React.FC = props => {
  const [state, setState] = useState<IAuthContext>(authInitialState);
  console.log("Inside AuthProvider");
  useEffect(() => {
    auth.onAuthStateChanged( user => {
      console.log("Auth State changed and user is ----->", user);
      if (user) {
        console.log("User value updated to the context")
        setState({
            ...authInitialState,
          isAuthenticated:!!user,
          permissions:[],
          user:user
        });
      }
      const stateChange = {
        ...authInitialState,
        isAuthenticated: !!user,
        user
      };
      // if (!user) {
        return setState(stateChange);
      // }
    });
  }, []);
  console.log("Rendering AuthProvider", state);
  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
