import {NextRequest, NextResponse} from "next/server";

export async function middleware(request: NextRequest) {

	const response = NextResponse.next();

	// 로그인 페이지일때
	if (request.nextUrl.pathname.substring((1)) === 'login') {
		console.log(request.cookies.getAll());
		return response;
	}

//
// 	if (request.cookies.has('accessToken')) {
// 		const {data} = await fetch('http://localhost:3000/api/auth/token', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				accessToken: request.cookies.get('accessToken')?.value
// 			})
// 		})
// 			.then(response => response.json());
// 		if (Object.keys(data).length === 0) {
// 			response.cookies.delete('accessToken');
// 		}
// 	}
// 	return response;
}

//
export const config = {
	matcher: [
		'/login/:path*'
	]
};
