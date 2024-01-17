'use client';

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

export default function Login() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	useEffect(() => {
		if (window.localStorage.getItem('uid')) {
			router.replace('/');
		}
	}, []);

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
					router.replace('/');
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
				<input className="bg-blue-100 rounded-full px-4" type="text" onChange={onChangeId}/>
				<input className="bg-blue-100 rounded-full px-4" type="password" onChange={onChangePw}/>
				<button className="bg-blue-300 hover:bg-blue-500 rounded-full w-[120px]" onClick={onSubmit}>로그인</button>
			</div>
		</div>
	);
}
