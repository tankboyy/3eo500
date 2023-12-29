import {getAuth, signInWithEmailAndPassword} from "@firebase/auth";
import {app} from "@/firebase";

export async function POST(req: Request) {
	const a = app;
	const {id, password} = await req.json();
	const auth = getAuth();
	const data = {
		uid: "",
		refreshToken: "",
	};
	await signInWithEmailAndPassword(auth, id, password)
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

	return Response.json(data, {
		headers: {
			"Content-Type": "application/json",
			"set-cookie": "refreshToken=" + data.refreshToken + "; path=/; HttpOnly; SameSite=Strict; Secure",
		}
	});
}
