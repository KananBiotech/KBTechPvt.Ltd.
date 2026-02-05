import React, { useContext } from "react";
import axios from "axios";
import { AuthContext, useAuth } from "../context/AuthContext";

const Logout = () => {

    const { setUser } = useAuth()

    const handleLogout = async () => {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout/`,
                { withCredentials: true }
            );

            setUser(null);
        } catch (err: any) {
            console.error("Logout failed", err.response?.data || err.message);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white
                       transition-colors duration-200 hover:bg-red-600
                       focus:outline-none focus:ring-2 focus:ring-red-400
                       active:bg-red-700"
        >
            Logout
        </button>
    );
};

export default Logout;
