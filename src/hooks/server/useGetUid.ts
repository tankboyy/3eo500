import {getAuth} from "firebase-admin/auth";
import {cookies} from "next/headers";

export default async function useGetUid(accessToken: string) {
	return getAuth().verifySessionCookie(accessToken)
		.then((decodedToken) => {
			return decodedToken;
		})
		.catch((error) => {
			return null;
		});
}
