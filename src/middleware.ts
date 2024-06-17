import {NextRequest, NextResponse} from "next/server";
import {adminApp, adminAuth} from "@/admin";
import {cookies} from "next/headers";

export async function middleware(request: NextRequest) {

	const response = NextResponse.next();
	const accessToken = request.cookies.get('accessToken')?.value;


	// // 로그인 페이지일때
	// if (request.nextUrl.pathname.substring((1)) === 'login') {
	// 	if (accessToken) return NextResponse.redirect(new URL('/main', request.url));
	// }
	//

	// 방문할때 auth 검증 후 토큰이 필요한 페이지들은 토큰이 없으면 로그인 페이지로 리다이렉트 + nextjs fetch의 raletive
	if (request.nextUrl.pathname.substring((1)) === 'main') {
		const res = await fetch('http://localhost:3000/api/auth/user', {
			"headers": {
				"Authorization": `Bearer ${accessToken}`
			},
		});
		if (res.status === 401 || res.status === 201) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}
}

//
export const config = {
	matcher: [
		'/login/:path*',
		'/main'
	]
};
