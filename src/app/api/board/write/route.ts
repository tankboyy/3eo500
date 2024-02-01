import {addDoc, collection, doc, getDocs, Timestamp} from "@firebase/firestore";
import {db} from "@/firebase";
import {NextResponse} from "next/server";


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
	const boardSnapshot = await getDocs(boardRef);
	const boardList = Array();
	boardSnapshot.docs.map(doc => {
		const data = doc.data();
		console.log(data);
		if (data["createAt"] && data['title'] && data['data'] && data['uid']) {
			boardList.push({
				id: doc.id,
				...doc.data()
			});
		}
	});

	return NextResponse.json({
		data: "hellozzz",
		boardList: boardList,
	});
}
