import {useEffect, useLayoutEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import {app} from "@/firebase";
import {useRecoilState} from "recoil";
import {userDataState} from "@/recoil/atoms";

export default function UseAuthentication() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [userData, setUserData] = useRecoilState(userDataState);

	const auth = getAuth(app);
	useLayoutEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserData(user);
			} else setIsLoggedIn(false);
		});
	}, [auth]);

	return isLoggedIn;
}
