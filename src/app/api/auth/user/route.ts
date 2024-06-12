import {adminAuth} from "@/admin";
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(request: NextRequest) {
	const response = NextResponse;
	console.log('GET');
	const accessToken = request.cookies.get('accessToken')?.value ? request.cookies.get('accessToken')?.value : request.headers.get('Authorization')?.replace('Bearer ', '');
	if (!accessToken) {
		cookies().set('accessToken', '');
		return response;
	}
	return await adminAuth.verifyIdToken(accessToken)
		.then((decodedToken) => {
			// sessionStorage.setItem('uid', decodedToken.uid);
			return response.json({
				data: decodedToken.uid
			});
		})
		.catch((error) => {
			console.log('!error');

			cookies().set('accessToken', 'zxczc');
			return response.json({
				data: null
			});
		});
}
