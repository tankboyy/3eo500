'use client';

import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";

export default function Page() {
	return (
		<main>
			<Input type="text" placeholder="닉네임"/>
			<RadioGroup defaultValue="option-one" className="flex" onValueChange={(value) => console.log(value)}>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="비공개" id="option-one"/>
					<Label htmlFor="option-one">비공개</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="여자" id="option-two"/>
					<Label htmlFor="option-two">여자</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="남자" id="option-three"/>
					<Label htmlFor="option-three">남자</Label>
				</div>
			</RadioGroup>

		</main>
	);
}