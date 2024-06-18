import {adminAuth} from "@/admin";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {

	const accessToken = request.headers.get('Authorization')?.split('Bearer ')[1];

	if (!accessToken) {
		return NextResponse.json({
			data: "no accessToken"
		}, {status: 401});
	}
	return await adminAuth.verifySessionCookie(accessToken)
		.then((decodedToken) => {
			return NextResponse.json({
				data: decodedToken.uid
			});
		})
		.catch((error) => {
			return new Response(
				JSON.stringify({data: "error"}),
				{
					status: 201,
				},
			);
		});
}
