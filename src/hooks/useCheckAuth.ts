import {adminApp} from "@/admin";
import {cookies} from "next/headers";
import {getAuth} from "firebase-admin/auth";
import {NextResponse} from "next/server";

export async function checkAuth() {
	const response = NextResponse.next();
	const cookieStore = cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	if (!accessToken) {
		return {isAuthenticated: false};
	}
	return getAuth().verifyIdToken(accessToken, true)
		.then((decodedToken) => {
			return {isAuthenticated: true};
		})
		.catch((error) => {
			console.log("error code:: ", error.errorInfo.code);
			return {isAuthenticated: false};
		});
}
