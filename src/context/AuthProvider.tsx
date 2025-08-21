'use client';

import { createContext, ReactNode, useContext } from 'react';
import { type UserProfileData } from '@/types/auth';

interface AuthContextType {
    user: UserProfileData | null;
}

// Este sirve para proporcionar el contexto de autenticación

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, user }: { children: ReactNode, user: UserProfileData | null }) {
    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};