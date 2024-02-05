import {database} from "@/firebase";
import {onValue, ref, set} from "@firebase/database";


export async function POST(request: Request) {
	const {nick, uid} = await request.json();
	const db = database;
	const usersRef = ref(db, '/users/');
	let returnData = {
		status: "success",
		message: "닉네임이 생성되었습니다."
	};
	// 중복 닉
	onValue(usersRef, (snapshot) => {
		const data = snapshot.val();
		Object.values(data).map(item => {
			// @ts-ignore
			if (item?.nick === nick) {
				returnData = {
					status: "fail",
					message: "이미 존재하는 닉네임입니다."
				};
			}
		});
		if (returnData.status === "fail") return;
		set(ref(db, 'users/' + uid), {
			nick: nick,
		});


	});
	return Response.json(returnData);
}