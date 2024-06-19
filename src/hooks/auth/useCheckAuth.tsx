'use client';

import {useRecoilState, useSetRecoilState} from "recoil";
import {authState, userDataState} from "@/recoil/atoms";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Cookies from 'js-cookie';

export default function UseCheckAuth() {
	const [auth, setAuth] = useRecoilState(authState);
	const router = useRouter();
	useEffect(() => {
		if (auth) {
			setAuth(false);
			Cookies.set("accessToken", "", {expires: -1});
			router.push("/login");
		}
	}, [auth]);
	return (
		<></>
	);
}
