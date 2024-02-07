'use client';

import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useSetRecoilState} from "recoil";
import {userDataState} from "@/recoil/atoms";

export default function Signup() {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const setUserData = useSetRecoilState(userDataState);

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
			body: JSON.stringify({id, password})
		}).then(async (res) => {
			const result = await res.json();
			if (result.uid) {
				toast.success("회원가입 완료, 메인 페이지로 이동합니다!");
				window.localStorage.setItem('uid', result.uid);
				window.localStorage.setItem('refreshToken', result.refreshToken);
				setUserData((prev) => ({
					...prev,
					nick: result.nick
				}));
				router.push('/main');
			} else {
				toast.error("아이디, 비밀번호를 확인해주세요!");
			}
		});
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