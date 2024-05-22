import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import Link from "next/link";
import ThemeChanger from "@/components/ThemeChanger";
import {checkAuth} from "@/app/(afterLogin)/layout";


export default async function Header() {

	const {isAuthenticated} = await checkAuth();

	return (
		<header
			className="h-14 px-5 sticky top-0 z-50 w-full border-b flex justify-between items-center bg-background dark:border-border">
			<div className="flex items-center">
				<MobileNav/>
				<Nav/>
			</div>
			<div className="flex items-center gap-1">
				<Link href="/login" className={`${isAuthenticated && "hidden"} text-xs font-medium`}>
					로그인
				</Link>
				<ThemeChanger/>
			</div>
		</header>
	);
}

