'use server';

import {createUserWithEmailAndPassword, UserCredential} from "@firebase/auth";
import {useAuth} from "@/firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {redirect, RedirectType} from "next/navigation";
import {cookies} from "next/headers";
import {adminAuth} from "@/admin";

export async function signIn(_currentState: unknown, formData: FormData) {

	const {id, pw} = {
		id: formData.get('id') as string,
		pw: formData.get('pw') as string
	};
	console.log(id, pw);
	if (!id || !pw) return;

	const data = await signInWithEmailAndPassword(useAuth, id, pw)
		.then(async (userData: UserCredential) => {
			const accessToken = await userData.user.getIdToken();
			const refreshToken = userData.user.refreshToken;
			cookies().set('accessToken', accessToken);
			cookies().set('refreshToken', refreshToken);
			return userData;
		})
		.catch((error) => {
			return error;
		});
	if (data.operationType === "signIn") redirect('/main', RedirectType.push);
	else return "확인 후 다시 시도해주세요.";
}

export async function signUp(_currentState: unknown, formData: FormData) {
	const {id, pw} = {
		id: formData.get('id') as string,
		pw: formData.get('pw') as string
	};
	if (!id || !pw) return;
	const data = await createUserWithEmailAndPassword(useAuth, id, pw)
		.then(async (userData) => {
			const token = await userData.user.getIdToken();
			const expiresIn = 60 * 60 * 24 * 1000;
			const accessToken = await adminAuth.createSessionCookie(token, {expiresIn});
			cookies().set('accessToken', accessToken);
			return userData;
		})
		.catch((error) => {
			console.log('error', error);
			return error;
		});
	if (data.operationType === "signIn") redirect('/main', RedirectType.push);
	else return "확인 후 다시 시도해주세요.";
}

