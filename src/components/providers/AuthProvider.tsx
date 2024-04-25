'use client'


import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "@firebase/auth";
import nookies from "nookies";
import { log } from "console";
import { useAuth } from "@/firebase";

const AuthContext = createContext<{ user: User | null | undefined }>({
	user: undefined,
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const [userState, setUserState] = useState<User | null | undefined>();


	useEffect(() => {
		return useAuth.onIdTokenChanged(async (user) => {
			if (!user) {
				setUserState(null);
				nookies.set(null, 'accessToken', '', { path: '/' });
				return;
			}
			setUserState(user);
			const token = await user.getIdToken();
			nookies.destroy(null, 'accessToken');
			nookies.set(null, 'accessToken', token, { path: '/' });
		})
		
	}, [])

	useEffect(() => {
		const refreshToken = setInterval(async () => {
			const { currentUser } = useAuth;
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

export const useGetAuthData = () => {
	return useContext(AuthContext);
}
