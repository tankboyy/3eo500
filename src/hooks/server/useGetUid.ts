import {getAuth} from "firebase-admin/auth";

export default async function useGetUid(accessToken: string) {
	return getAuth().verifyIdToken(accessToken)
		.then((decodedToken) => {
			return decodedToken;
		})
		.catch((error) => {
			return {};
		});
}
