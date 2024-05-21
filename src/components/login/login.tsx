'use client';

import {useEffect, useState} from "react";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useAuth} from "@/firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import Cookies from "js-cookie";

export default function Login() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	function onChangeId(event: React.ChangeEvent<HTMLInputElement>) {
		setId(event.target.value);
	}

	function onChangePw(event: React.ChangeEvent<HTMLInputElement>) {
		setPassword(event.target.value);
	}

	async function onSubmit() {
		signInWithEmailAndPassword(useAuth, id, password)
			.then((user) => {
				if (user.user) {
					// @ts-ignore
					Cookies.set('accessToken', user.user.accessToken, {expires: 1});
					router.replace('/main');
					toast.success('로그인 성공');
					return;
				}
				toast.error('로그인 실패');
			});
	}

	return (
		<div className="flex flex-col items-center justify-center m-auto">
			<h1 className="text-center text-[24px] text-bold">
				로그인
			</h1>
			<div className="flex flex-col items-center space-y-2">
				<Input className="rounded-full " type="text" onChange={onChangeId}/>
				<Input className="rounded-full " type="password" onChange={onChangePw}/>
				<Button className=" rounded-full h-[30px] mt-[10px] w-[120px]" onClick={onSubmit}>로그인</Button>
			</div>
		</div>
	);
}
