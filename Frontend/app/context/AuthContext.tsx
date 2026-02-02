"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { SessionContext } from "../types"
import axios from "axios"

type AuthContextType = {
    user: SessionContext | null,
    setUser: React.Dispatch<React.SetStateAction<SessionContext | null>>
    loading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<SessionContext | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify`, {
            withCredentials: true,
        })
            .then(res => {
                setUser(res.data.user);
            })
            .catch(err => {
                console.log("No active session", err.response?.status);
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)