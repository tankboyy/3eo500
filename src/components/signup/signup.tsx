'use client';

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {useAuth} from "@/firebase";

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
		const auth = useAuth;
		createUserWithEmailAndPassword(auth, id, password)
			.then((userData) => {
				if (userData) {
					toast.success("회원가입 완료, 메인 페이지로 이동합니다!");
					router.replace('/main');
				}
			})
			.catch((error) => {
				if (error.message === "Firebase: Error (auth/email-already-in-use).") {
					toast.error("이미 사용중인 아이디에요!");
					return;
				}
				toast.error("아이디, 비밀번호를 확인해주세요!");
			});
	}

	return (
		<div className="flex flex-col items-center justify-center m-auto">
			<span className="text-center text-[24px] text-bold">
				회원가입
			</span>
			<div className="flex flex-col items-center space-y-2">
				<Input className="rounded-full " type="text" onChange={onChangeId}/>
				<Input className="rounded-full " type="password" onChange={onChangePw}/>
				<Button className=" rounded-full h-[30px] mt-[10px] w-[120px]" onClick={onSubmit}>회원가입</Button>
			</div>
		</div>
	);
}
