import {collection, doc, getDoc} from "@firebase/firestore";
import {db} from "@/firebase";

export async function POST(request: Request) {
	const {uid} = await request.json();
	const usersRef = doc(db, 'users', uid);
	return await getDoc(usersRef)
		.then((doc) => {
			const data = doc.data();
			console.log("success", data);
			return data ? Response.json({
				status: "success",
			}) : Response.json({
				status: "error",
			});
		});
}