"use client";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { createContext, ReactNode, useContext, useState } from "react";

type UserProviderProps = {
	children: ReactNode;
};

type TypeUser = {
	id: string;
	username: string;
	email: string;
};

type UserContextType = {
	user: TypeUser | undefined;
	signIn: (user: TypeUser) => void;
	signOut: () => void;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

function isValidUser(data: unknown): data is TypeUser {
	if (!data) return false;
	if (typeof data !== "object") return false;

	return "email" in data;
}

const AUTH_LS_KEY = "auth";

export function UserProvider({ children }: UserProviderProps) {
	const [authLsKey, setAuthLsKey] = useLocalStorage(
		AUTH_LS_KEY,
		JSON.stringify({})
	);

	const recoveredUser = authLsKey;

	const initialState = isValidUser(recoveredUser) ? recoveredUser : undefined;

	const [user, setUser] = useState<TypeUser | undefined>(initialState);

	const signIn = (user: TypeUser) => {
		setUser(user);
		setAuthLsKey(JSON.stringify(user));
	};

	const signOut = () => {
		setUser(undefined);
		localStorage.removeItem(AUTH_LS_KEY);
	};

	return (
		<UserContext.Provider value={{ user, signIn, signOut }}>
			{children}
		</UserContext.Provider>
	);
}

function useUserContext() {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("useUserContext needs to be used inside UserProvider");
	}

	return context;
}

export default UserProvider;
export { useUserContext };
