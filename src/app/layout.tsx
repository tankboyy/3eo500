import type {Metadata} from 'next';
import './globals.css';
import Provider from "@/components/Provider";
import Header from "@/components/Header";


export const metadata: Metadata = {
	title: '매일매일',
	description: '운동, 헬스, 기록, 성취감',

};


export default async function RootLayout({children}: {
	children: React.ReactNode
}) {

	return (
		<html lang="ko">
		<body className="h-screen">
		<Provider>
			<main className="flex flex-col mx-auto max-w-screen-md min-w-[320px]">
				<Header/>
				{children}
			</main>
			<div className="relative py-16">
				<footer className="w-full flex justify-center text-sm text-gray-500">
					운동을 기록해보자
				</footer>
			</div>
		</Provider>
		</body>
		</html>
	);
}
