'use client';

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Login from "@/components/login/login";
import Signup from "@/components/signup/signup";
import {useEffect, useLayoutEffect} from "react";
import {useRouter} from "next/navigation";
import useAuthentication from "@/hooks/useAuthentication";
import {useRecoilValue} from "recoil";
import {userDataState} from "@/recoil/atoms";


export default function Sign() {

	const router = useRouter();
	const userData = useRecoilValue(userDataState);


	useLayoutEffect(() => {
		if (userData) {
			router.replace('/main');
		}
	}, [userData]);

	return (
		<div id="component" className="flex items-center h-full -translate-y-20">
			<Tabs defaultValue="login" className="w-[250px]">
				<TabsList className="flex space-x-8">
					<TabsTrigger value="login">로그인</TabsTrigger>
					<TabsTrigger value="signup">회원가입</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<Login/>
				</TabsContent>
				<TabsContent value="signup">
					<Signup/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
