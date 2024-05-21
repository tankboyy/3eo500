import {getAuth} from "firebase-admin/auth";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {adminApp} from "@/admin";


export async function checkAuth() {
	adminApp;
	const accessToken = cookies().get("accessToken")?.value;
	if (!accessToken) {
		return {isAuthenticated: false};
	}
	return getAuth().verifyIdToken(accessToken)
		.then((decodedToken) => {
			const uid = decodedToken.uid;
			return {isAuthenticated: true};
		})
		.catch((error) => {
			cookies().set("accessToken", "");
			return {isAuthenticated: false};
		});
}

export default async function RootLayout({
																					 children,
																				 }: {
	children: React.ReactNode
}) {

	const {isAuthenticated} = await checkAuth();

	if (!isAuthenticated) {
		redirect("/login");
	}

	return (

		<div className="flex flex-col justify-center">
			{children}
		</div>
	);
}


