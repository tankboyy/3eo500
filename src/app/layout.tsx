import type {Metadata} from 'next';
import './globals.css';
import Provider from "@/components/Provider";
import nookies from "nookies"

export const metadata: Metadata = {
	title: '매일매일',
	description: '3대 500',
};

export default async function RootLayout({
																		 children,
																	 }: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
		<body className="flex justify-center">
		<Provider>
			{children}
		</Provider>
		</body>
		</html>
	);
}

