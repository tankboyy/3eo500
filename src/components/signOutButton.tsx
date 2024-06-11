'use client';

import nookies from "nookies";

export default function SignOutButton({accessToken}: { accessToken: string }) {

	return (
		<button
			onClick={() => {
				nookies.destroy(null, 'accessToken');
				nookies.destroy(null, 'refreshToken');
				document.location.reload();
			}}
			className={`${!accessToken && "hidden"}  text-xs font-medium`}>
			로그아웃
		</button>
	);
}
