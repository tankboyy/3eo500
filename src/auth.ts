import NextAuth, {User} from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import {CredentialProviderChain} from "aws-sdk";
import Kakao from "@auth/core/providers/kakao";
import Naver from "@auth/core/providers/naver";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useAuth} from "@/firebase";
import {UserCredential} from "@firebase/auth";
import {adminAuth} from "@/admin";
import {AdapterUser} from "@auth/core/adapters";
import {JWT} from "@auth/core/jwt";


interface ExtendedUser extends User {
	accessToken?: string;
}


export const {
	handlers,
	auth,
	signOut,
	signIn,
	unstable_update: updateSession,
} = NextAuth({
	providers: [
		Kakao({
			clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
		}),
		Naver({
			clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,

		}),
		Credentials({
			credentials: {
				id: {label: 'ID', type: 'text', placeholder: 'ID'},
				pw: {label: 'Password', type: 'password'}
			},
			authorize: async (credentials) => {
				const {id, pw} = credentials;
				let user = {id: '', name: '', email: '', image: ''};
				if (typeof id !== 'string' || typeof pw !== 'string') return null;
				return await signInWithEmailAndPassword(useAuth, id, pw)
					.then(async (userData: UserCredential) => {
						const token = await userData.user.getIdToken();
						const expiresIn = 60 * 60 * 24 * 1000;
						const accessToken = await adminAuth.createSessionCookie(token, {expiresIn});
						return {
							...user,
							accessToken: accessToken
						};
					})
					.catch((error) => {
						return null;
					});
			}
		})
	],
	session: {
		strategy: 'jwt',
		maxAge: 24 * 60 * 60,
	},
	pages: {
		signIn: '/login',
		signOut: '/login',
	},

	callbacks: {
		signIn: async ({credentials}) => {
			console.log('signIn');
			return true;
		},
		jwt: async ({token, user}: {
			user: ExtendedUser
			token: JWT
		}) => {
			if (user?.accessToken) token.accessToken = user.accessToken;
			return token;
		},
		session: async ({session, token}) => {
			return {...session, accessToken: token.accessToken};
		},
		redirect: async ({url, baseUrl}) => {
			console.log('redirect', url.startsWith(baseUrl) ? url : baseUrl);
			return url.startsWith(baseUrl) ? url : baseUrl;
		},
	}
});
