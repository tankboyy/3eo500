'use client';

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useSetRecoilState} from "recoil";
import {userDataState} from "@/recoil/atoms";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged} from "@firebase/auth";
import {app} from "@/firebase";

export default function Signup() {
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
		try {
			const auth = getAuth();
			await createUserWithEmailAndPassword(auth, id, password);
			toast.success("회원가입 완료, 메인 페이지로 이동합니다!");
			router.replace('/main');
		} catch (error: any) {
			toast.error("아이디, 비밀번호를 확인해주세요!");
		}
	}

	return (
		<div className="flex flex-col justify-center items-center m-auto">
			<span className="text-center text-[24px] text-bold">
				signup
			</span>
			<div className="flex flex-col space-y-2 items-center">
				<Input className=" rounded-full" type="text" onChange={onChangeId}/>
				<Input className=" rounded-full" type="password" onChange={onChangePw}/>
				<Button className=" rounded-full h-[30px] mt-[10px] w-[120px]" onClick={onSubmit}>회원가입</Button>
			</div>
		</div>
	);
}
