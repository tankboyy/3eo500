import {createUserWithEmailAndPassword, getAuth} from "@firebase/auth";
import {app} from "@/firebase";

export async function POST(req: Request) {
	const {id, password} = await req.json();
	const a = app;
	const auth = getAuth();
	const data = {
		uid: "",
		refreshToken: "",
	};
	createUserWithEmailAndPassword(auth, id, password)
		.then((userCredential) => {
			const user = userCredential.user;
			data.uid = userCredential.user.uid;
			data.refreshToken = user.refreshToken;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		});
	return Response.json(data);
}
