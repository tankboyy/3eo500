import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export async function POST(request: NextRequest) {
	// api route에서 특정 조건시 다른 페이지로 보내는 방법
	console.log("hihi");
	const res = NextResponse;


	return new Response('Hello, Next.js!', {
		status: 200,
		headers: {'Set-Cookie': `token=${"zxczxc"}`},
	});
}
