export default function BoardList() {
	return (
		<div className="dark h-full bg-gray-900 text-white">
			<header className="flex items-center justify-between px-6 py-4">
				<h1 className="text-2xl font-bold">자유 게시판</h1>
				<button className="text-gray-400 hover:text-white">
					<svg
						className="h-6 w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/>
					</svg>
				</button>
			</header>
			<main className="px-6 py-4 space-y-4">
				<article className="border rounded-lg p-4 bg-gray-800">
					<h2 className="text-xl font-bold">Post Title 1</h2>
					<p className="text-gray-400">Posted by User1</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis,
						auctor consequat urna.
					</p>
				</article>
				<article className="border rounded-lg p-4 bg-gray-800">
					<h2 className="text-xl font-bold">Post Title 2</h2>
					<p className="text-gray-400">Posted by User2</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis,
						auctor consequat urna.
					</p>
				</article>
				<article className="border rounded-lg p-4 bg-gray-800">
					<h2 className="text-xl font-bold">Post Title 3</h2>
					<p className="text-gray-400">Posted by User3</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis,
						auctor consequat urna.
					</p>
				</article>
			</main>
		</div>
	);
}