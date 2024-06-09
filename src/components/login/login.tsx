'use client';

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signIn} from "@/app/actions";
import {getAuth} from "@firebase/auth";
import {useAuth} from "@/firebase";

export default function Login() {
	console.log(useAuth.currentUser);
	return (
		<div className="flex flex-col items-center justify-center m-auto">
			<span className="text-center text-[24px] text-bold">
				로그인
			</span>
			<form className="flex flex-col items-center space-y-2" action={signIn}>
				<Input className="rounded-full" name="id" type="text"/>
				<Input className="rounded-full" name="pw" type="password"/>
				<Button className=" rounded-full h-[30px] mt-[10px] w-[120px]" type="submit">로그인</Button>
			</form>
		</div>
	);
}
