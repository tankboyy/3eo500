import { adminApp } from "@/admin";
import TopLayout from "@/components/after/TopLayout";
import { useAuth } from "@/firebase";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers"

export default function RootLayout({
																		 children,
																	 }: {
	children: React.ReactNode
}) {

	
	const accessToken = cookies().get("accessToken")!.value;
	getAuth().verifyIdToken(accessToken)
		.then((decodedToken) => {
			const uid = decodedToken.uid;
			console.log("uid : ",uid)

		}).catch((error) => {
			console.error("error : ",error)
		});


	return (
		
		<div className="flex flex-col justify-center">
			<TopLayout after/>
			{children}
		</div>
	);
}


