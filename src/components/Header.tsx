import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import Link from "next/link";
import ThemeChanger from "@/components/ThemeChanger";
import {cookies} from "next/headers";
import SignOutButton from "@/components/signOutButton";
import useGetUid from "@/hooks/server/useGetUid";
import {auth, signOut} from "@/auth";
import {signOutWithForm} from "@/serverActions/auth";


export default async function Header() {
	const session = await auth();
	return (
		<header
			className="h-14 px-5 sticky top-0 z-50 w-full border-b flex justify-between items-center bg-background dark:border-border">
			<div className="flex items-center">
				<MobileNav/>
				<Nav/>
			</div>
			<div className="flex items-center gap-3">
				{!session ?
					<Link href="/login" className={`${session && "hidden"}  text-xs font-medium`}>
						로그인
					</Link> :
					<button className="text-xs font-medium" onClick={async () => {
						'use server';
						signOutWithForm;
					}}>
						로그아웃
					</button>
				}
				<ThemeChanger/>
			</div>
		</header>
	);
}

