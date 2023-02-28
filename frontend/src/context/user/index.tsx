"use client";
import { StateType } from "@commonTypes/state";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";

type UserProviderProps = {
	children: ReactNode;
};
type TypeUSer = {
	id: string;
	username: string;
	email: string;
};

const UserContext = createContext<StateType<TypeUSer>>([
	{} as TypeUSer,
	() => {
		return;
	},
]);

const AUTH_LS_KEY = "auth";

export function UserProvider({ children }: UserProviderProps) {
	const recoveredUser = JSON.parse(localStorage.getItem(AUTH_LS_KEY) ?? "{}");

	const initialState = Object.keys(recoveredUser).length
		? recoveredUser
		: undefined;

	const [data, setUser] = useState(initialState);

	useEffect(() => {
		if (data && Object.keys(data).length) {
			const { token: _, ...user } = data;

			setUser(user.user);
			localStorage.setItem(AUTH_LS_KEY, JSON.stringify(user));
		}
	}, [data]);

	return (
		<UserContext.Provider value={[data, setUser]}>
			{children}
		</UserContext.Provider>
	);
}

function useUserContext() {
	return useContext(UserContext);
}

export default UserProvider;
export { useUserContext };
