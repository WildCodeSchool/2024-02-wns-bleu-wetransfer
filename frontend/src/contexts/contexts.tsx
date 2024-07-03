import { createContext, ReactNode } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext({});

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
