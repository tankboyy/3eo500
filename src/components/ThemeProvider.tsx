"use client";

import * as React from "react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {type ThemeProviderProps} from "next-themes/dist/types";
import {useEffect, useState} from "react";

export default function ThemeProvider({children, ...props}: ThemeProviderProps) {
	const [isMount, setIsMount] = useState(false);

	useEffect(() => {
		setIsMount(true);
	}, []);
	if (!isMount) return null;
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
