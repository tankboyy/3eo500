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


export default function TopLayout() {
	const {theme, resolvedTheme, setTheme} = useTheme();
	const router = useRouter();
	const [userData, setUserData] = useRecoilState(userDataState);

	const onChangeTheme = () => {
		resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark');
	};

	useEffect(() => {
		const uid = window.localStorage.getItem('uid');
		const fetchFn = async () => {
			return await fetch("/api/user/info/nick", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					uid
				})
			}).then(async (res) => {
				const result = await res.json();
				setUserData((prev) => ({
						...prev,
						nick: result.nick
					})
				);
			});
		};
		fetchFn();
	}, []);

	return (
		<div className="h-[60px] border-b dark:border-border p-[10px] flex justify-between">
			<Button size="icon" className="bg-transparent">
				<Sheet>
					<SheetTrigger>
						<HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem] stroke-foreground"/>
					</SheetTrigger>
					<SheetContent side="left">
						<SheetHeader>
							<SheetTitle>안녕하세요 !</SheetTitle>
							<SheetDescription>
								{userData.nick}님, 환영합니다.
							</SheetDescription>
						</SheetHeader>
						<Separator className="my-4"/>
						<div className="w-full pb-[30px] h-full flex justify-between flex-col">
							<div>
								hi
							</div>
							<Button className="w-full mb-[60px]" onClick={() => {
								window.localStorage.removeItem('uid');
								router.replace('/');
							}}>
								로그아웃
							</Button>
						</div>
					</SheetContent>
				</Sheet>

			</Button>
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