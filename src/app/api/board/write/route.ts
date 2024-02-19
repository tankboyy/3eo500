import {addDoc, collection, doc, getDocs, limit, orderBy, query, Timestamp} from "@firebase/firestore";
import {db} from "@/firebase";
import {NextResponse} from "next/server";
import {apiBoardType, BoardType} from "@/utils/types";
import {child, get, getDatabase, ref} from "@firebase/database";


export async function POST(request: Request) {

	const {title, data, uid} = await request.json();
	const boardRef = await addDoc(collection(db, "board"), {
		title: title,
		data: data,
		createAt: Timestamp.fromDate(new Date()),
		uid: uid,
	});

	return Response.json({
		id: boardRef.id,
	});
}

export async function GET() {

	const boardRef = collection(db, "board");
	const boardSnapshot = query(boardRef, orderBy('createAt', 'desc'));
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
		console.error(error);
	});

	await getDocs(boardSnapshot).then((querySnapshot) => {
		querySnapshot.docs.map((doc) => {
			const docData = doc.data();
			if (Object.keys(docData).length === 4) {
				const {title, data, createAt, uid} = docData;
				if (data.includes("<img")) {
					const imgTags = data.match(/src="([^"]*)"/);

					boardList.push({
						id: doc.id,
						title, data, createAt: createAt.toDate(), uid,
						isImage: imgTags,
						nick: usersName[uid].nick
					});
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
