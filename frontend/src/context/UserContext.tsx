import React, {createContext, FC, ReactNode, useContext, useEffect, useState} from 'react';

interface UserContextType {
	isLoggedIn: boolean;
	email: string;
	role: string;
	firstname: string;
	lastname: string;
	setUser: (userData: Partial<UserContextType>) => void;
}

const UserContext = createContext<UserContextType>({
	isLoggedIn: false,
	email: '',
	setUser: (userData) => {
	},
	role: '',
	firstname: '',
	lastname: ''
});

export const UserProvider: FC<{ children: ReactNode }> = ({children}) => {
	const [user, setUser] = useState<UserContextType>({
		isLoggedIn: false,
		email: '',
		role: '',
		firstname: '',
		lastname: '',
		setUser: (userData) => setUser((prev) => ({...prev, ...userData})),
	});

	useEffect(() => {
		console.log(user)
	}, [user]);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext must be used within a UserProvider");
	}
	return context;
};
