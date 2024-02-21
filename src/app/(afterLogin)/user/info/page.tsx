'use client';

import {Input} from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {userDataState} from "@/recoil/atoms";
import {useRouter} from "next/navigation";

export default function Page() {
	const [nick, setNick] = useState<string>();
	const [prevNick, setPrevNick] = useState<string>();
	const [userData, setUserData] = useRecoilState(userDataState);
	const router = useRouter();


	useEffect(() => {
		if (userData) {
			setNick(userData.nick);
			setPrevNick(userData.nick);
		}
	}, [userData]);

	async function onSubmit() {
		if (!nick) return;
		if (nick?.length >= 2 && nick?.length <= 8) {
			await fetch("/api/user/info", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					nick,
					uid: window.localStorage.getItem('uid')
				})
			}).then(async (res) => {
				const result = await res.json();
				if (result.status === 'success') {
					alert("저장되었습니다.");
					setUserData((prev) => ({
						...prev,
						nick
					}));
					router.replace("/main");
				}
			});
		} else {
			alert("닉네임은 2자 이상 8자 이하로 입력해주세요.");
		}
	}

	function onChangeNick(e: React.ChangeEvent<HTMLInputElement>) {
		const trimmedNickname = e.target.value;

		if (trimmedNickname.length <= 8) {
			// 조건을 만족하면 state 업데이트
			setNick(trimmedNickname);
		}
	}

	return (
		<main>
			<div className="w-full p-[20px]">
				<Card className="w-full">
					<CardHeader>
						<CardTitle>개인 정보</CardTitle>
						<CardDescription>{""}</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Input onChange={onChangeNick} type="text" value={nick} placeholder="닉네임"/>
							</div>
							<div className="flex flex-col space-y-3">
								{/*<Label htmlFor="gender">성별</Label>*/}
								{/*<RadioGroup defaultValue="비공개" className="flex" onValueChange={(value) => console.log(value)}>*/}
								{/*	<div className="flex items-center space-x-2">*/}
								{/*		<RadioGroupItem value="비공개" [id]="option-one"/>*/}
								{/*		<Label htmlFor="option-one">비공개</Label>*/}
								{/*	</div>*/}
								{/*	<div className="flex items-center space-x-2">*/}
								{/*		<RadioGroupItem value="여자" [id]="option-two"/>*/}
								{/*		<Label htmlFor="option-two">여자</Label>*/}
								{/*	</div>*/}
								{/*	<div className="flex items-center space-x-2">*/}
								{/*		<RadioGroupItem value="남자" [id]="option-three"/>*/}
								{/*		<Label htmlFor="option-three">남자</Label>*/}
								{/*	</div>*/}
								{/*</RadioGroup>*/}
							</div>
						</div>
						<div className="flex justify-center">
							<Button size="sm" disabled={!nick || prevNick === nick} onClick={onSubmit}>저장하기</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}