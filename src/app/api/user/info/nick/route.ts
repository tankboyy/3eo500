import {database} from "@/firebase";
import {onValue, ref} from "@firebase/database";

export async function POST(request: Request) {
	const {uid} = await request.json();
	const db = database;
	const usersRef = ref(db, '/users/');
	let nick = "";
	onValue(usersRef, (snapshot) => {
		const data = snapshot.val();
		nick = data[uid].nick;
	});
	return Response.json({
		nick: nick,
	});
}