'use client';

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signInAction, signUp} from "@/app/actions";
import {useFormState, useFormStatus} from "react-dom";

export default function Signup() {
	const [errorMessage, dispatch] = useFormState(signUp, undefined);

	return (
		<div className="flex flex-col items-center justify-center m-auto">
			<span className="text-center text-[24px] text-bold">
				회원가입
			</span>
			<form className="flex flex-col items-center space-y-2" action={dispatch}>
				<Input className="rounded-full " name="id" type="text"/>
				<Input className="rounded-full " name="pw" type="password"/>
				<div className="text-red-400 text-sm">{errorMessage && <p>{errorMessage}</p>}</div>
				<SubmitButton submitName={"회원가입"}/>
			</form>
		</div>
	);
}


export function SubmitButton({submitName}: { submitName: string }) {
	const {pending} = useFormStatus();

	return (
		<Button type="submit" className=" rounded-full h-[30px] mt-[10px] w-[120px]" disabled={pending}
		>{submitName}</Button>
	);
}
