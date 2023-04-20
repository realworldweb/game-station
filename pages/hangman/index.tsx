/*react*/
import { ReactElement, useState, useEffect, FC, useRef } from 'react';

import axios from 'axios';

/*layouts*/
import Layout from '@/layouts/main';

/*svgs*/
import HangmanSvg from '@/components/svgs/hangman';

export default function Hangman() {
	/*state*/
	const [chars, setChars] = useState<string[]>([]);
	const [currentBoard, setCurrentBoard] = useState<string | null>(null);
	const [lostLives, setLostLives] = useState<number>(0);

	/*refs*/
	const wordIndex = useRef<number | null>(null);

	const alphabet = Array.from({ length: 26 }, (_, i) =>
		String.fromCharCode(97 + i)
	);

	const SelectChars = () => {
		return (
			<div className='relative flex flex-wrap w-4/5 mx-auto h-1/2'>
				{alphabet.map((char, i) => {
					let background = 'white';
					const inBoard = currentBoard?.includes(char.toLowerCase());
					if (chars.includes(char) && inBoard) {
						background = 'green';
					} else if (chars.includes(char) && !inBoard) {
						background = 'red';
					}

					return (
						<button
							key={i}
							className={`cursor-pointer border-2 border-slate-900 overflow-hidden p-2 w-1/13`}
							style={{ backgroundColor: background }}
							onClick={() => {
								setChars((prev) => [...prev, char.toLowerCase()]);
							}}
							disabled={chars.includes(char) ? true : false}
						>
							{char}
						</button>
					);
				})}
			</div>
		);
	};

	useEffect(() => {
		const url =
			wordIndex.current !== null
				? `/api/hangman/?chars=${chars}&wordIndex=${wordIndex.current}`
				: `/api/hangman/`;

		axios.get(url).then((res) => {
			wordIndex.current = res.data.index;
			setCurrentBoard(res.data.currentBoard);
			setLostLives(res.data.lostLives);
		});
	}, [chars]);

	return (
		<div className='relative flex flex-wrap content-center justify-center flex-none grow w-100 h-14'>
			<div className='relative flex flex-col bg-white w-96 h-96'>
				<div className='relative flex'>
					<HangmanSvg lives={lostLives} />
					<div className='mr-8 tracking-widest mt-11 justify-self-end'>
						{currentBoard}
					</div>
				</div>
				<SelectChars />
			</div>
		</div>
	);
}

Hangman.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
