import {adminAuth} from "@/admin";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
	console.log('request.cookies.get', request.cookies.get('accessToken')!.value);

	const uid = await adminAuth.verifyIdToken(request.cookies.get('accessToken')!.value);
	console.log(uid);
	return Response.json({
		data: uid.uid
	});
}
