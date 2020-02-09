import * as firebase from 'firebase/app';
import React from 'react';
import { auth } from '../firebase';

export const authInitialState = {
  isAuthenticated: !!auth.currentUser,
  permissions: [],
  user: auth.currentUser
};
console.log("auth state", authInitialState);
console.log("auth state", auth.currentUser);
console.log("auth state", firebase.auth().currentUser);
const AuthContext = React.createContext<IAuthContext>(authInitialState);
export interface IAuthContext {
  isAuthenticated: boolean;
  user: firebase.User | null;
  permissions: any[];
}

export default AuthContext;
