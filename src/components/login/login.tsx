'use client';

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {getAuth, signInWithEmailAndPassword} from "@firebase/auth";
import {app} from "@/firebase";

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
		const auth = getAuth();
		try {
			await signInWithEmailAndPassword(auth, id, password);
			router.replace('/main');
			toast.success('로그인 성공');
		} catch (error: any) {
			toast.error('로그인 정보를 확인해주세요.');
		}
	}

	return (
		<div className="flex flex-col items-center justify-center m-auto">
			<span className="text-center text-[24px] text-bold">
				login
			</span>
			<div className="flex flex-col items-center space-y-2">
				<Input className="rounded-full " type="text" onChange={onChangeId}/>
				<Input className="rounded-full " type="password" onChange={onChangePw}/>
				<Button className=" rounded-full h-[30px] mt-[10px] w-[120px]" onClick={onSubmit}>로그인</Button>
			</div>
		</div>
	);
}
