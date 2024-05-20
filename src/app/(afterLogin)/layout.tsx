import {adminApp} from "@/admin";
import TopLayout from "@/components/after/TopLayout";
import {useAuth} from "@/firebase";
import {getAuth} from "firebase-admin/auth";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";


async function checkAuth() {
	const auth = getAuth();
	const accessToken = cookies().get("accessToken")?.value;
	if (!accessToken) {
		redirect("/login");
	}
	const decodedToken = await getAuth().verifyIdToken(accessToken);
	const uid = decodedToken.uid;
}

export default async function RootLayout({
																					 children,
																				 }: {
	children: React.ReactNode
}) {

	await checkAuth();

	// const accessToken = cookies().get("accessToken")!.value;
	// getAuth().verifyIdToken(accessToken)
	// 	.then((decodedToken) => {
	// 		const uid = decodedToken.uid;
	// 		console.log("uid : ", uid);
	//
	// 	}).catch((error) => {
	// 	console.error("error : ", error);
	// });


	return (

		<div className="flex flex-col justify-center">
			{children}
		</div>
	);
}


