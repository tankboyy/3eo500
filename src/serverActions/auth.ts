'use server';
import {signIn, signOut} from '@/auth';

export const signInWithCredentials = async (_currentState: unknown, formData: FormData) => {
	console.log("시작");
	await signIn('credentials', {
		id: formData.get('id') as string || '',
		pw: formData.get('pw') as string || ''
	});
	console.log('끝');
	// ...
	return "zz";
};
export const signInWithKakao = async () => {
	console.log('signInWithKakao');
	await signIn("kakao");
};
export const signInWithNaver = async () => {
	await signIn("naver");
};
export const signOutWithForm = async (formData: FormData) => {
	await signOut();
};
