'use client';

import {Input} from "@/components/ui/input";
import {signInAction} from "@/app/actions";
import {SubmitButton} from "@/components/signup/signup";
import {useFormState} from "react-dom";
import {signIn} from "@/auth";
import {signInWithKakao, signInWithNaver} from "@/serverActions/auth";

export default function Login() {
	const [errorMessage, dispatch] = useFormState(signInAction, undefined);
	return (
		<div className="flex flex-col items-center justify-center m-auto">
			<span className="text-center text-[24px] text-bold">
				로그인
			</span>
			<form className="flex flex-col items-center space-y-2" action={dispatch}>
				<Input className="rounded-full" name="id" type="text"/>
				<Input className="rounded-full" name="pw" type="password"/>
				<div className="text-red-400 text-sm">{errorMessage && <p>{errorMessage}</p>}</div>
				<SubmitButton submitName="로그인"/>
			</form>
			<div className="flex space-x-10 p-5">
				<button onClick={async () => {
					signInWithKakao();
				}}>KAKAO
				</button>
				<button onClick={async () => {
					signInWithNaver();
				}}>NAVER
				</button>
			</div>
		</div>
	);
}
