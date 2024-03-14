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
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useRecoilState, useSetRecoilState} from "recoil";
import {userDataState} from "@/recoil/atoms";
import {Separator} from "@/components/ui/separator";
import {Label} from "@/components/ui/label";
import {ref, set} from "@firebase/database";
import {database} from "@/firebase";
import {randomName} from "@/utils/names";


export default function TopLayout() {
	const {theme, resolvedTheme, setTheme} = useTheme();
	const router = useRouter();
	const [userData, setUserData] = useRecoilState(userDataState);

	const onChangeTheme = () => {
		resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark');
	};

	useEffect(() => {
		const uid = window.localStorage.getItem('uid');
	}, []);

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
							<Label className="cursor-pointer" onClick={async () => {
								fetch('/api/user/info/nick', {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({
										uid: window.localStorage.getItem('uid')
									})
								}).then(async (res) => {
									const {nick} = await res.json();
									console.log(nick);
									setUserData((prev) => ({
										...prev,
										nick: nick,
									}));
								})
									.catch((err) => console.log('nick 에러'));
								// if (window.localStorage.getItem('uid')) {
								// 	window.localStorage.removeItem('uid');
								// 	setUserData((prev) => ({
								// 		...prev,
								// 		uid: ''
								// 	}));
								// }
							}}>
								{window.localStorage.getItem('uid') ? "로그아웃" : "로그인"}
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
