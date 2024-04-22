'use client'

import TopLayout from "@/components/after/TopLayout";
import { adminApp } from "@/admin";
import useGetUser from "@/hooks/useGetUser";
import { log } from "console";
import nookies from "nookies";

const getCookies = async () => {
	const cookies = nookies.get()
	console.log(cookies.token)
	// const token = await adminApp.auth().verifyIdToken(cookies.token)
	// const {uid, email} = token;
	// console.log(uid, email);
}


export default function RootLayout({
																		 children,
																	 }: {
	children: React.ReactNode
}) {
	getCookies()
	
	return (
		
		<div className="flex justify-center flex-col">
			<TopLayout after/>
			{children}
		</div>
	);
}
