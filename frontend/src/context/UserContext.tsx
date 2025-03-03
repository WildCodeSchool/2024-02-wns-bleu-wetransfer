import React, {createContext, FC, ReactNode, useContext, useState,} from "react";

interface UserContextType {
	isLoggedIn: boolean;
	email: string;
	role: string;
	firstname: string;
	lastname: string;
	planId: number | null;
	setUser: (userData: Partial<UserContextType>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({children}) => {
	const [user, setUser] = useState<UserContextType>({
		isLoggedIn: false,
		email: "",
		role: "",
		firstname: "",
		lastname: "",
		planId: null,
		setUser: (userData) => setUser((prev) => ({...prev, ...userData})),
	});

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
	const context = useContext(UserContext);

	console.log(context);

	if (!context) {
		throw new Error("useUserContext must be used within a UserProvider");
	}
	return context;
};
