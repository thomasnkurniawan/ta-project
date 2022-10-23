
import { createContext, useContext } from 'react'
import useAuthFirebase from '../firebase/useAuthFirebase';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async (email, password) => {},
  createUserWithEmailAndPassword: async (email, password) => {},
  signOut: async () => {}
});

export function AuthUserProvider({ children }): JSX.Element {
  const auth = useAuthFirebase();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);