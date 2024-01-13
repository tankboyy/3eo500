"use client";

import {RecoilRoot} from "recoil";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {Toaster} from "@/components/ui/sonner";

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
				{children}
				<Toaster/>
			</QueryClientProvider>
		</RecoilRoot>
	);
}