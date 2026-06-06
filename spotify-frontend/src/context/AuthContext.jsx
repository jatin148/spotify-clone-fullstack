import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    async function register(data) {
        const res = await axios.post("/auth/register", data);
        setUser(res.data.user);
        return res.data;
    }

    async function login(data) {
        const res = await axios.post("/auth/login", data);
        setUser(res.data.user);
        return res.data;
    }

    async function logout() {
        await axios.post("/auth/logout");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}