import {NextResponse} from "next/server";
import {collection, doc, getDoc, orderBy, query} from "@firebase/firestore";
import {db} from "@/firebase";

export async function GET(request: Request) {
	const postId = request.url.split("board/")[1];
	const postRef = doc(db, "board", postId);
	const postSnap = await getDoc(postRef);
	
	if (postSnap.exists()) {
		return NextResponse.json({
			postData: {...postSnap.data(), createAt: postSnap.data().createAt.toDate()}
		});
	}
}