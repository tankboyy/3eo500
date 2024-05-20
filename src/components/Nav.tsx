'use client';

import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";

export const navs = [
	{
		name: 'Calender',
		href: '/main',
	},
	{
		name: '자유게시판',
		href: '/board',
	},
];

export default function Nav() {
	return (
		<nav className="sm:flex hidden items-center space-x-6 text-sm gap-2">
			{navs.map(({name, href}) => (
				<NavItem href={href} name={name}/>
			))}
		</nav>
	);
}

export function NavItem({name, href, onClick}: { name: string, href: string, onClick?: () => void }) {
	const pathname = usePathname();
	return (
		<Link href={href} className={cn(
			"transition-colors hover:text-foreground/80 py-3",
			pathname?.startsWith(href) ? "text-foreground" : "text-foreground/60"
		)} onClick={onClick}>
			{name}
		</Link>
	);
}
