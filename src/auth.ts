import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import {CredentialProviderChain} from "aws-sdk";
import Kakao from "@auth/core/providers/kakao";
import Naver from "@auth/core/providers/naver";

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
			authorize: async credentials => {
				const {email, password} = credentials;
				let user = {email: '', password: ''};
				if (email) return user;

				return user;
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
		signIn: async () => {
			console.log('signIn');
			return true;
		},
		jwt: async ({token, user}) => {
			console.log('jwt', token);
			return token;
		},
		session: async ({session, token}) => {
			console.log('session', session);
			return session;
		},
		redirect: async ({url, baseUrl}) => {
			console.log('redirect', url, baseUrl);
			return url.startsWith(baseUrl) ? url : baseUrl;
		},
	}
});
