"use client";

import {RecoilRoot} from "recoil";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {Toaster} from "@/components/ui/sonner";
import ThemeProvider from "@/components/ThemeProvider";

export default function Provider({
																	 children,
																 }: {
	children: React.ReactNode
}) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: false,
				staleTime: 30000,
			},

		}
	});
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
				<Toaster/>
			</QueryClientProvider>
		</RecoilRoot>
	);
}