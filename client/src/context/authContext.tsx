import { useContext, createContext, useEffect, useState } from 'react';
// make alias for greater readability
import { User as FirebaseUser } from 'firebase/auth';

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext({
  googleSignIn: () => {},
  logOut: () => {},
  user: null as FirebaseUser | null,
  createUser: (email: string, password: string) => {},
  signIn: (email: string, password: string) => {},
});
interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    // signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, user, createUser, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
