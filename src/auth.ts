import NextAuth from "next-auth";

export const {
	handlers,
	auth,
	signOut,
	signIn,
	unstable_update: update,
} = NextAuth({
	providers: [],
	session: {
		strategy: 'jwt',
		maxAge: 24 * 60 * 60,
	},
	pages: {
		signIn: '/login',
		signOut: '/login',
		error: '/login',
	},
	callbacks: {
		signIn: async () => {
			console.log('signIn');
			return true;
		},
		jwt: async ({token, user}) => {
			console.log('jwt');
			return token;
		},
		session: async ({session, token}) => {
			console.log('session');
			return session;
		},
		redirect: async ({url, baseUrl}) => {
			console.log('redirect');
			return url.startsWith(baseUrl) ? url : baseUrl;
		},
	}
});
