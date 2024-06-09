'use client';

import {useSetRecoilState} from "recoil";
import {userDataState} from "@/recoil/atoms";
import {useEffect} from "react";
import {useAuth} from "@/firebase";

export default function UseCheckAuth() {
	const setUser = useSetRecoilState(userDataState);
	useEffect(() => {
		const check = useAuth.onAuthStateChanged(user => {
			setUser(user);
		});
		return () => check();
	}, []);
}
