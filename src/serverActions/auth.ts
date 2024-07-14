'use server';
import {signIn, signOut} from '@/auth';
import {redirect} from "next/navigation";
import {CredentialsSignin} from "next-auth";

export const signInWithCredentials = async (_currentState: { message: string }, formData: FormData) => {
	console.log("시작");
	try {
		await signIn('credentials', {
			id: formData.get('id') as string || '',
			pw: formData.get('pw') as string || ''
		});
	} catch (error) {
		console.log(error?.message);
		if (error instanceof CredentialsSignin) {
			return {message: error.message};
		}
	}
	console.log('끝');

	redirect("/main");
};
export const signInWithKakao = async () => {
	console.log('signInWithKakao');
	await signIn("kakao");
};
export const signInWithNaver = async () => {
	await signIn("naver")
		.then(res => console.log(res));
};
export const signOutWithForm = async (formData: FormData) => {
	await signOut();
};
