'use client';

import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import {useTheme} from "next-themes";

export default function TopLayout() {
	const {theme, resolvedTheme, setTheme} = useTheme();

	const onChangeTheme = () => {
		resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark');
	};

	return (
		<div className="h-[50px] border-b dark:border-border">
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