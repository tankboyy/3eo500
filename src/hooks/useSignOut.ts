import {getAuth, signOut} from "@firebase/auth";
import {app, useAuth} from "@/firebase";
import {toast} from "sonner";

export default function UseSignOut() {
	const auth = useAuth
	signOut(auth)
		.then(() => {
			toast.success('로그아웃 되었습니다.');
		})
		.catch((error) => {
			toast.error('로그아웃 중 오류가 발생했습니다.');
		});
};
