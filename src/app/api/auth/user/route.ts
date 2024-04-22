import {getAuth} from "@firebase/auth";
import {app} from "@/firebase";

export async function GET() {
	const auth = getAuth(app);
	const user = auth.currentUser;
	console.log(user);

	return Response.json({
		data: "hi"
	})
}
