import { useState, useEffect } from 'react'
import firebase from './clientApp';

const formatAuthUser = (user: { uid: any; email: any; }) => ({
  uid: user.uid,
  email: user.email
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setLoading(false)
      return;
    }

    setLoading(true)

    const formattedUser = formatAuthUser(authState);

    setAuthUser(formattedUser as any);

    setLoading(false);

  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInWithEmailAndPassword = (email: any, password: any) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email: any, password: any) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

  const signOut = () =>
    firebase.auth().signOut().then(clear);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
  };
}