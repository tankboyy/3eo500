import MobileNav from "@/components/MobileNav";
import Nav from "@/components/Nav";
import Link from "next/link";
import ThemeChanger from "@/components/ThemeChanger";
import {useRecoilState, useRecoilValue} from "recoil";
import {userDataState} from "@/recoil/atoms";
import {useAuth} from "@/firebase";
import {useEffect, useLayoutEffect, useState} from "react";


export default function Header() {

	return (
		<header
			className="h-14 px-5 sticky top-0 z-50 w-full border-b flex justify-between items-center bg-background dark:border-border">
			<div className="flex items-center">
				<MobileNav/>
				<Nav/>
			</div>
			<div className="flex items-center gap-1">
				<Link href="/login" className={`${'' && "hidden"}  text-xs font-medium`}>
					로그인
				</Link>
				<ThemeChanger/>
			</div>
		</header>
	);
}

