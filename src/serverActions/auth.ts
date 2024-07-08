'use server';
import {signIn, signOut} from '@/auth';

export const signInWithCredentials = async (formData: FormData) => {
	await signIn('credentials', {
		email: formData.get('email') as string || '',
		password: formData.get('password') as string || ''
	});
	// ...
};
export const signInWithGoogle = async (formData: FormData) => {
	await signIn('google', formData);
	// ...
};
export const signInWithGitHub = async (formData: FormData) => {
	await signIn('github', formData);
	// ...
};
export const signOutWithForm = async (formData: FormData) => {
	await signOut();
};
