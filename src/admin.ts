import * as adminApp from "firebase-admin"

const adminConfig = {
	privateKey: (process.env.NEXT_PUBLIC_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
	clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID
}



if (!adminApp.apps.length) {
	adminApp.initializeApp({
		credential: adminApp.credential.cert(adminConfig),
		databaseURL: process.env.NEXT_PUBLIC_DATABASE_NAME
	})
}

export {adminApp}