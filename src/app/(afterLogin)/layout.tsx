import {getAuth} from "firebase-admin/auth";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {adminApp} from "@/admin";
import {checkAuth} from "@/app/actions";


export default async function RootLayout({
																					 children,
																				 }: {
	children: React.ReactNode
}) {

	await checkAuth();

	return (

		<div className="flex flex-col justify-center">
			{children}
		</div>
	);
}


