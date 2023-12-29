import Image from 'next/image';
import Calendar from "@/components/Calendar";
import RecordWeight from "@/components/RecordWeight";


export default function Home() {
	return (
		<main>
			<Calendar/>
			<RecordWeight/>
		</main>
	);
}
