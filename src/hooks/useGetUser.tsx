import {getAuth, onAuthStateChanged, User} from "@firebase/auth";
import {app} from "@/firebase";
import {useEffect, useLayoutEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {userDataState} from "@/recoil/atoms";
import {useGetRecord} from "@/hooks/record.hooks";

export default function UseGetUser() {
	const [userData, setUserData] = useRecoilState(userDataState);
	const auth = getAuth();
	useEffect(() => {
		if (!auth) return
		// console.log(auth);
		console.log(auth.currentUser)
			if (!auth.currentUser) {
			console.log('not user', auth.currentUser);
		} else {
			console.log('user', auth.currentUser);
		}
	}, [auth]);
	return userData;
}
