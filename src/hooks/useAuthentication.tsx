import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import {app} from "@/firebase";

export default function UseAuthentication() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
	const auth = getAuth();
	useEffect(() => {

		onAuthStateChanged(auth, (user) => {
			user ? setIsLoggedIn(true) : setIsLoggedIn(false);
		});
	}, [auth]);
	return isLoggedIn;
}
