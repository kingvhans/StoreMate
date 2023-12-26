import { useState, useEffect} from "react";
import {  User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";


interface AuthState {
    user: User | undefined;
}

export function useAuthentication() : AuthState{
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? setUser(user) : setUser(undefined);
            return unsubscribe;
        }) 
    }, []);

    return {user};
}