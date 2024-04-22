import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { app, useAuth } from "@/firebase";

export async function POST(req: Request) {
	console.log('login start')
	const { id, password } = await req.json();
	const auth = useAuth;
	const data = {
		accessToken: "",
		refreshToken: "",
	};
	await signInWithEmailAndPassword(auth, id, password)
		.then(async (userCredential) => {
			const user = userCredential.user;
			data.accessToken = await user.getIdToken();
			data.refreshToken = user.refreshToken;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage, "login 에러");
		});
	return Response.json(data, {
		headers: {
			"Content-Type": "application/json",
			"set-cookie": "refreshToken=" + data.refreshToken + ";" + "accessToken=" + data.accessToken + "; HttpOnly; Secure",
		}
	})
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