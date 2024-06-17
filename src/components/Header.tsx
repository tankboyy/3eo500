import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import Link from "next/link";
import ThemeChanger from "@/components/ThemeChanger";
import {cookies} from "next/headers";
import SignOutButton from "@/components/signOutButton";


export default async function Header() {
	const accessToken = cookies().get('accessToken')?.value;
	// if (accessToken) {
	// 	await fetch('http://localhost:3000/api/auth/user', {
	// 		headers: {
	// 			'Authorization': `Bearer ${accessToken}`
	// 		}
	// 	}).then(async res => {
	// 		if (res.status === 200) {
	// 			const data = await res.json();
	// 			console.log(res.headers.get('Set-Cookie'));
	//
	// 			if (data.data === 'erzxczxcror') {
	// 				console.log("error 쿠키삭제해라", cookies().getAll());
	// 			}
	// 		} else {
	// 			console.log('error');
	// 		}
	// 	});
	// }
	return (
		<header
			className="h-14 px-5 sticky top-0 z-50 w-full border-b flex justify-between items-center bg-background dark:border-border">
			<div className="flex items-center">
				<MobileNav/>
				<Nav/>
			</div>
			<div className="flex items-center gap-3">
				{!accessToken ?
					<Link href="/login" className={`${accessToken && "hidden"}  text-xs font-medium`}>
						로그인
					</Link> :
					<SignOutButton accessToken={accessToken}/>
				}
				<ThemeChanger/>
			</div>
		</header>
	);
}

