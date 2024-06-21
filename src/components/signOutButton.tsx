'use client';

import nookies from "nookies";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {authState} from "@/recoil/atoms";

export default function SignOutButton({accessToken}: { accessToken: string }) {
	const [token, setToken] = useState<string | undefined>(accessToken);
	const auth = useRecoilValue(authState);

	useEffect(() => {
		setToken(Cookies.get('accessToken'));
	}, [auth]);
	return (
		<button
			onClick={() => {
				nookies.destroy(null, 'accessToken');
				document.location.reload();
			}}
			className={`${!token && "hidden"}  text-xs font-medium`}>
			로그아웃
		</button>
	);
}
