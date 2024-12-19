import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);
    const[userLoggedIn,setUserLoggedIn] = useState(false);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,initializeUser);
    }, [])
}