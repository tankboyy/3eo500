import {database} from "@/firebase";
import {get, onValue, ref} from "@firebase/database";

export async function POST(request: Request) {
	console.log("nick API");
	const {uid} = await request.json();
	let nick = "";
	await get(ref(database, 'users/' + uid)).then((snapshot) => {
		if (snapshot.exists()) {
			nick = snapshot.val().nick;
		} else {
			console.log("유저닉네임 불러오기 실패");
		}
	});
	return Response.json({
		nick: nick,
	});
}