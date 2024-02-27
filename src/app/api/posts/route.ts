import {collection, getDocs, limit, orderBy, query, startAfter} from "@firebase/firestore";
import {db} from "@/firebase";
import {apiBoardType} from "@/utils/types";
import {child, get, getDatabase, ref} from "@firebase/database";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
	const {pageParam} = await request.json();
	console.log(pageParam, 'pageParam');
	const boardRef = collection(db, "board");
	const boardSnapshot = pageParam === "" ? query(boardRef, orderBy('createAt', 'desc'), limit(10)) :
		query(boardRef, orderBy('createAt', 'desc'), limit(10), startAfter(pageParam));
	const boardList: apiBoardType[] = Array();
	let usersName: {
		[key: string]: {
			nick: string
		}
	} = {};
	const dbRef = ref(getDatabase());
	get(child(dbRef, `/users`)).then((snapshot) => {
		if (snapshot.exists()) {
			usersName = snapshot.val();
		} else {
			console.log("유저닉네임 불러오기 실패");
		}
	}).catch((error) => {
		console.error("erororrorro", error);
	});

	await getDocs(boardSnapshot).then((querySnapshot) => {
		querySnapshot.docs.map((doc) => {
			const docData = doc.data();
			if (Object.keys(docData).length === 4) {
				const {title, data, createAt, uid} = docData;
				if (data.includes("<img")) {
					const imgTags = data.match(/src="([^"]*)"/);
					const data2 = {
						id: doc.id,
						title, data, createAt: createAt.toDate(), uid,
						isImage: imgTags,
						nick: "익명"
					};
					boardList.push(data2);
					return;
				}
				// @ts-ignore
				boardList.push({
					id: doc.id,
					title, data, createAt: createAt.toDate(), uid,
				});
			}
		});
	});
	return NextResponse.json({
		boardList: boardList,
	});
}