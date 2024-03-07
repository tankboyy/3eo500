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
			console.log('uid');
			const a = getNickApi(userCredential.user.uid);
			console.log(a);
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

const getNickApi = async (uid: string) => {
	return await fetch("/api/user/info/nick", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			uid
		})
	}).then((res) => res.json())
		.catch((err) => console.log("err"));
};