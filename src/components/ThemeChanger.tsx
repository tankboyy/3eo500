'use client';

import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {Moon, Sun} from "lucide-react";
import {MoonIcon, SunIcon} from "@radix-ui/react-icons";

export default function ThemeChanger() {
	const {setTheme, theme} = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<Button type="button" variant="outline" size="icon" onClick={toggleTheme}>
			<SunIcon
				className="h-5 w-5 transition-all dark:hidden"/>
			<MoonIcon
				className="h-5 w-5 hidden transition-all dark:block"/>
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
