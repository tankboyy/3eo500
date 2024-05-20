import type {Metadata} from 'next';
import './globals.css';
import {adminApp} from '@/admin';
import Provider from "@/components/Provider";
import Header from "@/components/Header";

export const metadata: Metadata = {
	title: '매일매일',
	description: '3대 500',
};


export default async function RootLayout({children}: {
	children: React.ReactNode
}) {


	adminApp;
	return (
		<html lang="ko">
		<body className="max-w-screen-md min-w-[320px] mx-auto">
		<Provider>
			<main className="flex flex-col">
				<Header/>
				{children}
			</main>

		</Provider>
		</body>
		</html>
	);
}
