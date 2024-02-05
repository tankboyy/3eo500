'use client';

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

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
		await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({id, password}),
		})
			.then((response) => {
				response.json().then((data) => {
					window.localStorage.setItem('refreshToken', data.refreshToken);
					window.localStorage.setItem('uid', data.uid);
					router.replace('/main');
					toast.success('로그인 성공');
				});
			});
	}

	return (
		<div className="flex flex-col justify-center items-center m-auto">
			<span className="text-center text-[24px] text-bold">
				login
			</span>
			<div className="flex flex-col space-y-2 items-center">
				<Input className=" rounded-full" type="text" onChange={onChangeId}/>
				<Input className=" rounded-full" type="password" onChange={onChangePw}/>
				<Button className=" rounded-full h-[30px] mt-[10px] w-[120px]" onClick={onSubmit}>로그인</Button>
			</div>
		</div>
	);
}
