import {database} from "@/firebase";
import {onValue, ref, set} from "@firebase/database";


export async function POST() {
	console.log("POST");
	const db = database;
	const usersRef = ref(db, '/users/');
	set(ref(db, 'users/' + "fasfasf"), {
		nick: "오zz돌중",
	});
	onValue(usersRef, (snapshot) => {
		const data = snapshot.val();
		console.log(data, 'zz');
	});
	// 중복 닉
	return Response.json({
		status: "success"
	});
}