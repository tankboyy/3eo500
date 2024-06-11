import {NextRequest, NextResponse} from "next/server";
import {adminAuth} from "@/admin";

export async function middleware(request: NextRequest) {

	const response = NextResponse.next();

	// 로그인 페이지일때
	if (request.nextUrl.pathname.substring((1)) === 'login') {
		const accessToken = request.cookies.get('accessToken')?.value;
		// accessToken 이 없으면 그냥 리턴
		if (!accessToken) return response;
		return NextResponse.redirect(new URL('/main', request.url));
	}
	return response;
}

//
export const config = {
	matcher: [
		'/login/:path*'
	]
};
