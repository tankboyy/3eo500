'use client';

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Page() {
	const router = useRouter();
	useEffect(() => {
		if (window.localStorage.getItem('uid')) {
			router.replace('/main');
		} else router.replace('/login');
	}, []);
	return (
		<main>
		</main>
	);
}
