'use client';

import Calendar from "@/components/Calendar";
import Main from "@/components/Main";
import {getRecordData, useGetRecord} from "@/hooks/record.hooks";
import {useRecoilValue} from "recoil";
import {userDataState} from "@/recoil/atoms";
import useGetUser from "@/hooks/useGetUser";
import {getAuth} from "@firebase/auth";
import {useQueryClient} from "@tanstack/react-query";


export default function Home() {

	useGetRecord();

	return (
		<main>
			<Calendar/>
			<Main/>
		</main>
	);
}
