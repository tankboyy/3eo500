'use client';

import React from "react";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signUp} from "@/app/actions";
import {useFormState} from "react-dom";

export default function Signup() {
	const router = useRouter();

	return (
		<div className="flex flex-col items-center justify-center m-auto">
			<span className="text-center text-[24px] text-bold">
				회원가입
			</span>
			<form className="flex flex-col items-center space-y-2" action={signUp}>
				<Input className="rounded-full " name="id" type="text"/>
				<Input className="rounded-full " name="pw" type="password"/>
				<Button type="submit" className=" rounded-full h-[30px] mt-[10px] w-[120px]"
				>회원가입</Button>
			</form>
		</div>
	);
}
