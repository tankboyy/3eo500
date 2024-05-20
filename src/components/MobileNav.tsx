'use client';

import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {Separator} from "@/components/ui/separator";
import {Label} from "@/components/ui/label";
import useSignOut from "@/hooks/useSignOut";
import {useRouter} from "next/navigation";
import {useGetAuthData} from "@/components/providers/AuthProvider";

export default function MobileNav() {
	const router = useRouter();
	const isLogged = useGetAuthData().user;

	return (
		<Sheet>
			<SheetTrigger>
				<HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem] stroke-foreground sm:hidden"/>
			</SheetTrigger>
			<SheetContent side="left">
				<Separator className="my-4"/>
				<div className="w-full pb-[30px] h-full flex justify-between flex-col">
					<div className="flex flex-col items-center w-full space-y-4">
						<Label className="cursor-pointer" onClick={() => router.push('/board')}>
							자유게시판
						</Label>
						<Label className="cursor-pointer" onClick={() => {
							if (isLogged) {
								useSignOut();
							} else router.replace('/login');
						}}>
							{isLogged ? "로그아웃" : "로그인 / 회원가입"}
						</Label>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
