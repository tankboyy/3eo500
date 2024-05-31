import {cookies} from "next/headers";

export default async function useGetUid(accessToken?: string) {
	accessToken = !accessToken ? cookies.get("accessToken") : accessToken;
	console.log("accessToken", accessToken);
}
