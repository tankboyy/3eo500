import {collection, doc, getDoc, getDocs, orderBy, query} from "@firebase/firestore";
import {db} from "@/firebase";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
	const postId = request.url.split("board/")[1] + "s";
	const postRef = collection(db, "board", postId);
	const postSnap = query(postRef, orderBy('createAt', 'asc'));
	const snapShot = await getDocs(postSnap);


	if (snapShot.empty) return NextResponse.json({
		state: "empty",
	});

	return NextResponse.json({
		state: "success",
		data: snapShot.docs.map((doc) => doc.data())
	});
}
