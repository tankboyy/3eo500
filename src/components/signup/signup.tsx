'use client';

import {useState} from "react";

export default function Signup() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");

	function onChangeId(event: React.ChangeEvent<HTMLInputElement>) {
		setId(event.target.value);
	}

	function onChangePw(event: React.ChangeEvent<HTMLInputElement>) {
		setPassword(event.target.value);
	}

	async function onSubmit() {
		await fetch('/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({id, password}),
		});
	}

	return (
		<div className="flex flex-col justify-center items-center m-auto">
			<span className="text-center text-[24px] text-bold">
				signup
			</span>
			<div className="flex flex-col space-y-2 items-center">
				<input className="bg-blue-100 rounded-full px-4" type="text" onChange={onChangeId}/>
				<input className="bg-blue-100 rounded-full px-4" type="password" onChange={onChangePw}/>
				<button className="bg-blue-300 hover:bg-blue-500 rounded-full w-[120px]" onClick={onSubmit}>회원가입</button>
			</div>
		</div>
	);
}