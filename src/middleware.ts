import {NextRequest, NextResponse} from "next/server";
import {match} from "path-to-regexp";

export async function middleware(request: NextRequest) {
	// console.log("url:: ", request.url);
	const accessToken = request.cookies.get('accessToken')?.value;


	// // 로그인 페이지일때
	// if (request.nextUrl.pathname.substring((1)) === 'login') {
	// 	if (accessToken) return NextResponse.redirect(new URL('/main', request.url));
	// }
	//

	// 방문할때 auth 검증 후 토큰이 필요한 페이지들은 토큰이 없으면 로그인 페이지로 리다이렉트 + nextjs fetch의 raletive
	if (request.nextUrl.pathname.substring((1)) === 'main') {
		const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/user', {
			"headers": {
				"Authorization": `Bearer ${accessToken}`
			},
		});
		if (res.status === 401 || res.status === 201) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
	}

	if (isMatch(request.nextUrl.pathname, ['/api/auth/callback/naver'])) {
		console.log(request);
		console.log('naver login');
		// if (!accessToken) {
		// 	return NextResponse.redirect(new URL('/login', request.url));
		// }
	}

	// if (isMatch(request.nextUrl.pathname, config.matcher)) {
	// 	return (await getSession()) // 세션 정보 확인
	// 		? NextResponse.next()
	// 		: NextResponse.redirect(new URL('/signin', request.url));
	// 	// : NextResponse.redirect(new URL(`/signin?callbackUrl=${request.url}`, request.url))
	// }
	// return NextResponse.next();


	// isMatch(request.nextUrl.pathname, config.matcher)

}


function isMatch(pathname: string, urls: string[]) {
	return urls.some(url => !!match(url)(pathname));
}

export const config = {
	matcher: [
		// '/login/:path*',
		// '/main',
		// 모든 페이지
		'/:path*'
	]
};
