'use client';

import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon, HamburgerMenuIcon} from "@radix-ui/react-icons";
import {useTheme} from "next-themes";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {Label} from "@/components/ui/label";
import {useEffect, useLayoutEffect} from "react";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import {app} from "@/firebase";
import useAuthentication from "@/hooks/useAuthentication";
import useSignOut from "@/hooks/useSignOut";


export default function TopLayout({after}: { after: boolean }) {
	const {theme, resolvedTheme, setTheme} = useTheme();
	const router = useRouter();
	const auth = getAuth(app);
	const isLogged = useAuthentication();
	const onChangeTheme = () => {
		resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark');
	};

	// 로그인 유무 확인
	useEffect(() => {
		if (isLogged === false && after) {
			router.push('/login');
		}
	}, [isLogged]);


	return (
		<div className="h-[60px] border-b dark:border-border p-[10px] flex justify-between">
			<Sheet>
				<SheetTrigger>
					<HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem] stroke-foreground"/>
				</SheetTrigger>
				<SheetContent side="left">
					<Separator className="my-4"/>
					<div className="w-full pb-[30px] h-full flex justify-between flex-col">
						<div className="flex items-center flex-col w-full space-y-4">
							<Label className="cursor-pointer" onClick={() => router.push('/board')}>
								자유게시판
							</Label>
							<Label className="cursor-pointer" onClick={() => {
								if (isLogged) {
									useSignOut();
								} else router.replace('/login');
							}}>
								{isLogged ? "로그아웃" : "로그인"}
							</Label>
						</div>
					</div>
				</SheetContent>
			</Sheet>

			<Button size="icon">
				{resolvedTheme !== 'dark' ?
					<SunIcon onClick={onChangeTheme}
									 className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
					:
					<MoonIcon
						onClick={onChangeTheme}
						className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
				}
			</Button>
		</div>
	);
}
