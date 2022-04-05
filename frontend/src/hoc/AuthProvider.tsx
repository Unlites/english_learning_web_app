import { createContext, useState } from 'react';

interface AuthContextInterface {
    isAuth: boolean;
    signIn: () => void;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({children} : any) => {
    const [isAuth, setUser] = useState(false);

    const signIn = () => {
        setUser(true);
    }
    const signOut = () => {
        setUser(false);
    }

    const value = {isAuth, signIn, signOut};

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}