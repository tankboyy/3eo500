'use client';

import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {Separator} from "@/components/ui/separator";
import {Label} from "@/components/ui/label";
import useSignOut from "@/hooks/useSignOut";
import {useRouter} from "next/navigation";
import {useGetAuthData} from "@/components/providers/AuthProvider";
import {NavItem, navs} from "@/components/Nav";
import {useState} from "react";

export default function MobileNav() {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const isLogged = useGetAuthData().user;

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger>
				<HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem] stroke-foreground sm:hidden"/>
			</SheetTrigger>
			<SheetContent side="left">
				<Separator className="my-4"/>
				<div className="flex flex-col gap-2">
					{navs.map(({href, name}) => (
						<NavItem
							href={href}
							name={name}
							key={name}
							onClick={() => {
								setOpen(false);
							}}
						/>
					))}
				</div>
			</SheetContent>
		</Sheet>
	);
}
