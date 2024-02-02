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


export default function TopLayout() {
	const {theme, resolvedTheme, setTheme} = useTheme();

	const onChangeTheme = () => {
		resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark');
	};

	useEffect(() => {
		const uid = window.localStorage.getItem('uid');
		const fetchFn = async () => {
			return await fetch("/api/auth", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					uid
				})
			}).then(async (res) => console.log(await res.json()));
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
							</SheetDescription>
						</SheetHeader>
						<div className="w-full pb-[30px] h-full flex justify-between flex-col">
							<div>
								hi
							</div>
							<Button className="w-full">
								로그아웃
							</Button>
						</div>
						{/*
					<SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>*/}
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