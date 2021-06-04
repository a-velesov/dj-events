import {createContext, useState} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const register = async (user) => {

    };

    const login = async ({email: identifier, password}) => {

    };

    const logout = async ({email, password}) => {

    };

    return (
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;