import {Separator} from "@/components/ui/separator";
import ChangeDark from "@/components/ChangeDark";

export default function Page() {
	return (
		<main>
			<header className="w-full">
				<nav className="px-5 flex justify-between">
					<ul className="flex space-x-2.5">
						<li>매일매일</li>
						<li>자유 게시판</li>
					</ul>
					<ChangeDark/>
				</nav>

				<Separator/>
			</header>
		</main>
	);
}
