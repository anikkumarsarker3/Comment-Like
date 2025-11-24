import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { AuthContext } from './AuthContext';


const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    // const emailRef = useRef();
    let reactCounter = 0;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createuser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const createuserByGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const logoutUser = () => {
        setLoading(true)
        // window.onload();
        return signOut(auth);
    }
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateElement = async (profile) => {
        setLoading(true);
        return await updateProfile(auth.currentUser, profile);
    }
    const resetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email);

    }
    const emailVerification = () => {
        return sendEmailVerification(auth.currentUser)
    }


    const authInfo = {
        user,
        setUser,
        createuser,
        createuserByGoogle,
        logoutUser,
        logIn,
        loading,
        updateElement,
        resetPassword,
        setLoading,
        emailVerification,
        reactCounter,
        // emailRef,

    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log(currentUser);
                setUser(currentUser);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user])
    return (
        <AuthContext value={authInfo}>{children}</AuthContext>
    );
};

export default AuthProvider;