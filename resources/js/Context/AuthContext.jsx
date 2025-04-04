// resources/js/Context/AuthContext.jsx
import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children, user }) => {
    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
