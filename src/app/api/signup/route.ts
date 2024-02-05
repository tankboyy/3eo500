import {createUserWithEmailAndPassword, getAuth} from "@firebase/auth";
import {app, database} from "@/firebase";
import {ref, set} from "@firebase/database";
import {randomName} from "@/utils/names";

export async function POST(req: Request) {
	console.log("POST /api/signup");
	const {id, password} = await req.json();
	const a = app;
	const auth = getAuth();

	return await createUserWithEmailAndPassword(auth, id, password)
		.then((userCredential) => {
			const user = userCredential.user;
			set(ref(database, 'users/' + user.uid), {
				nick: randomName(),
			});
			return Response.json({
				uid: user.uid,
				refreshToken: user.refreshToken,
			});
		})
		.catch((error) => {
			console.log({
				message: error.message,
				errorCode: error.code,
			});
			return Response.json({
				message: error.message,
				errorCode: error.code,
			});
		});
}
