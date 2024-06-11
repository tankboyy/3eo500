import {NextRequest, NextResponse} from "next/server";
import {adminAuth} from "@/admin";

export async function middleware(request: NextRequest) {

	const response = NextResponse.next();
	const accessToken = request.cookies.get('accessToken')?.value;

	// 로그인 페이지일때
	if (request.nextUrl.pathname.substring((1)) === 'login') {
		if (accessToken) return NextResponse.redirect(new URL('/main', request.url));
	}

	if (request.nextUrl.pathname.substring((1)) === 'main') {
		if (!accessToken) return NextResponse.redirect(new URL('/login', request.url));
	}


	return response;

}

//
export const config = {
	matcher: [
		'/login/:path*',
		'/main'
	]
};
