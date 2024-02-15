import { AuthEnum } from '@/enums/authEnums';
import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserData = {
    name: string;
    email: string;
};

type AuthContextType = {
    token: string | null;
    user: UserData | null;
    login: (userData: UserData, token:string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (userData: UserData, token: string) => {
        setUser(userData);
        setToken(token);

        localStorage.setItem(AuthEnum.LOCAL_STORAGE_USER_KEY, JSON.stringify(userData));
        localStorage.setItem(AuthEnum.LOCAL_STORAGE_TOKEN_KEY, token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
