'use client'


import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAuth, User } from "@firebase/auth";
import nookies from "nookies";
import { log } from "console";

const AuthContext = createContext<{ user: User | null | undefined }>({
	user: undefined,
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const [userState, setUserState] = useState<User | null | undefined>();

	useEffect(() => {
		return getAuth().onIdTokenChanged(async (user) => {
			if (!user) {
				console.log('no user');
				setUserState(null);
				nookies.set(null, 'accessToken', '', { path: '/' });
				return;
			}
			console.log('got user');
			setUserState(user);
			const token = await user.getIdToken();
			nookies.destroy(null, 'accessToken');
			nookies.set(null, 'accessToken', token, { path: '/' });
			console.log(nookies.get())
		})
	}, [])

	useEffect(() => {
		const refreshToken = setInterval(async () => {
			const { currentUser } = getAuth();
			if (currentUser) await currentUser.getIdToken(true);
		}, 10 * 60 * 1000);
		return () => clearInterval(refreshToken);
	}, []);

	const user = useMemo(() => ({
		user: userState
	}), [userState])
	return (
		<AuthContext.Provider value={user}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
}
