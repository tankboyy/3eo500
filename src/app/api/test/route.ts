import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";

export async function POST(request: NextRequest) {
	// api route에서 특정 조건시 다른 페이지로 보내는 방법
	console.log('hi');
}
