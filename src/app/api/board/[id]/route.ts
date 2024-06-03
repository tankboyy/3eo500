import {NextResponse} from "next/server";
import {collection, doc, getDoc, orderBy, query} from "@firebase/firestore";
import {db} from "@/firebase";
import {child, get, getDatabase, ref} from "@firebase/database";

export async function GET(request: Request) {
	const postId = request.url.split("board/")[1];
	console.log("postId: ", postId);
	const postRef = doc(db, "board", postId);
	const postSnap = await getDoc(postRef);

	let usersName: {
		[key: string]: {
			nick: string
		}
	} = {};

	const dbRef = ref(getDatabase());
	await get(child(dbRef, `/users`)).then((snapshot) => {
		if (snapshot.exists()) {
			usersName = snapshot.val();
		} else {
			console.log("유저닉네임 불러오기 실패");
		}
	}).catch((error) => {
		console.error(error);
	});


	if (postSnap.exists()) {
		return NextResponse.json({
			postData: {
				...postSnap.data(),
				createAt: postSnap.data().createAt.toDate(),
				nick: usersName[postSnap.data().uid].nick
			}
		});
	}
	return NextResponse.json({
		data: "hi"
	});
}
