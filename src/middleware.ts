import {getAuth} from "firebase-admin/auth";
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

//
export function middleware(request: NextRequest) {
	const accessToken = cookies().get("accessToken")?.value;
//   let accessToken = request.cookies.get('accessToken')?.value;
//   const pathUrl = request.nextUrl.pathname;
//
//   console.log("pathUrl : ",pathUrl)
//
//   if (accessToken && pathUrl.startsWith('/login')) {
//     return NextResponse.redirect(new URL('/main', request.url))
//   }
//
//   if (!accessToken && !pathUrl.startsWith('/login')) {
//     if (pathUrl.startsWith('/main') || pathUrl.startsWith("/user") || pathUrl.startsWith('/board/write')) {
//
//       return NextResponse.redirect(new URL('/login', request.url))
//     }
//   }
//
}

//
// export const config = {
//   matcher: [
//     {
//       source: '/((?!api|_next/static|_next/image|favicon.ico|server).*)',
//       missing: [
//         { type: 'header', key: 'next-router-prefetch' },
//         { type: 'header', key: 'purpose', value: 'prefetch' },
//       ],
//     },
//   ]
// }
