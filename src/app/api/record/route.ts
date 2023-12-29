import {app, db} from "@/firebase";
import {collection, doc, getDoc, getFirestore, setDoc} from "@firebase/firestore";

export async function POST(request: Request) {
	const uid = await request.json().then((data: { uid: string }) => data.uid);
	console.log(uid);

	let res: { data: {}; message: any } = {
		message: "",
		data: {}
	};

	const recordRef = collection(db, "record");
	const docRef = doc(db, "record", uid);
	await getDoc(docRef)
		.then(async (data) => {
			if (data.exists()) {
				console.log("Document data:", data.data());
				res.data = data.data();
				res.message = "success";
			} else {
				// doc 생성
				await setDoc(doc(recordRef, uid), {});
				res.message = "초기값 생성";
			}
		});
	return Response.json(res);

}