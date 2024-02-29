"use client";

import {RecoilRoot} from "recoil";
import {QueryClient as QueryClient2, QueryClientProvider as QueryClientProvider2} from "react-query";
import {ReactQueryDevtools as React2} from "react-query/devtools";
import {Toaster} from "@/components/ui/sonner";
import ThemeProvider from "@/components/ThemeProvider";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useEffect, useState} from "react";

export default function Provider({
																	 children,
																 }: {
	children: React.ReactNode
}) {
	const queryClient2 = new QueryClient2({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: false,
				staleTime: 30000,
			},
		}
	});
	const queryClient = new QueryClient({ /* options */});
	const [isMount, setIsMount] = useState(false);
	useEffect(() => {
		setIsMount(true);
	}, []);
	if (!isMount) return null;
	return (
		<RecoilRoot>
			<QueryClientProvider2 client={queryClient2}>
				<React2 initialIsOpen={false} position="bottom-right"/>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} position="left"/>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</QueryClientProvider>
				<Toaster/>
			</QueryClientProvider2>
		</RecoilRoot>
	);
}