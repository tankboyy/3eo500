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
		if (auth) setUserData(auth.currentUser);
	}, [auth]);
	return userData;
}
