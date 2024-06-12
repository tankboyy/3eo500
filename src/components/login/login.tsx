'use client';

import {Input} from "@/components/ui/input";
import {signIn} from "@/app/actions";
import {SubmitButton} from "@/components/signup/signup";
import {useFormState} from "react-dom";

export default function Login() {
	const [errorMessage, dispatch] = useFormState(signIn, undefined);
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
		</div>
	);
}
