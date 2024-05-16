import type {Metadata} from 'next';
import './globals.css';
import {adminApp} from '@/admin';
import Provider from "@/components/Provider";

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
		<body className="flex justify-center">
		<Provider>
			{children}

		</Provider>
		</body>
		</html>
	);
}
