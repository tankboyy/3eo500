import {collection, doc, getDoc, getDocs, limit, orderBy, query, startAt} from "@firebase/firestore";
import {db} from "@/firebase";
import {apiBoardType} from "@/utils/types";
import {child, get, getDatabase, ref} from "@firebase/database";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
	const {pageParam} = await request.json();
	console.log(pageParam);
	const boardRef = collection(db, "board");
	const boardSnapshot = pageParam === "" ? query(boardRef, orderBy('createAt', 'desc'), limit(10)) :
		query(boardRef, orderBy('createAt', 'desc'), limit(10), startAt(await getDoc(doc(boardRef, pageParam))));
	const boardList: apiBoardType[] = Array();
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
		console.error("error", error);
	});

	await getDocs(boardSnapshot).then((querySnapshot) => {
		querySnapshot.docs.map((doc) => {
			const docData = doc.data() as apiBoardType;
			if (Object.keys(docData).length === 4) {
				const data = {...docData, id: doc.id};
				// @ts-ignore
				data.createAt = data.createAt.toDate() as string;
				if (data.data.includes("<img")) {
					data.isImage = data.data.match(/src="([^"]*)"/) as string[];
				}
				data.nick = usersName[data.uid]?.nick ? usersName[data.uid].nick : "**헬린이**";
				boardList.push(data);
			}
		});
	});
	if (boardList[0].id === pageParam) boardList.shift();
	return NextResponse.json({
		boardList: boardList.length === 0 ? "불러올 게시글이 없습니다." : boardList,
	});
}
