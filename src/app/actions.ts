'use server';

import {adminApp} from "@/admin";
import {cookies} from "next/headers";
import {getAuth} from "firebase-admin/auth";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {useAuth} from "@/firebase";
import {revalidatePath} from "next/cache";

export async function signIn(formData: FormData) {
}

export async function signUp(queryData: FormData) {
	const {id, pw} = {
		id: queryData.get('id') as string,
		pw: queryData.get('pw') as string
	};
	if (id || pw) return;
	adminApp;
	return createUserWithEmailAndPassword(useAuth, id, pw)
		.then((userData) => {
			if (userData) {
				console.log('success');
				revalidatePath("/main");
			}
		})
		.catch((error) => {
			console.log('error');
			if (error.message === "Firebase: Error (auth/email-already-in-use).") {
				return;
			}
		});
}
