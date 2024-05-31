import {adminApp} from "@/admin";
import {cookies} from "next/headers";
import {getAuth} from "firebase-admin/auth";

export async function checkAuth() {
	adminApp;
	const cookieStore = cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	if (!accessToken) {
		return {isAuthenticated: false};
	}
	return getAuth().verifyIdToken(accessToken)
		.then((decodedToken) => {
			return {isAuthenticated: true};
		})
		.catch((error) => {
			console.log("error code:: ", error.errorInfo.code);
			return {isAuthenticated: false};
		});
}
