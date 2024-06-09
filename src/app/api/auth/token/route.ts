import useGetUid from "@/hooks/server/useGetUid";
import {NextResponse} from "next/server";
import {useAuth} from "@/firebase";
import {adminAuth} from "@/admin";
import {DecodedIdToken} from "firebase-admin/auth";

export async function POST(request: Request, response: NextResponse) {
	const {accessToken} = await request.json().then((data: { accessToken: string }) => data);
	const data: DecodedIdToken | {} = await useGetUid(accessToken);
	if (Object.keys(data).length !== 0) {
		// adminAuth.createSessionCookie()
	}
	return response;
}
