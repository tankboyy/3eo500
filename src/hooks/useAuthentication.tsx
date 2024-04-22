import {useEffect, useLayoutEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app} from "@/firebase";
import {useRecoilState} from "recoil";
import {userDataState} from "@/recoil/atoms";

export default function UseAuthentication() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [userData, setUserData] = useRecoilState(userDataState);

	const auth = getAuth();

	useEffect(() => {
		if (!auth) return;
			if (auth.currentUser) {
				console.log("로그인됨");
				setIsLoggedIn(true);
				setUserData(auth.currentUser);
			} else setIsLoggedIn(false);
	}, []);

	return isLoggedIn;
}
