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
	const won = currentBoard?.split('').every((char) => char !== '_');

	/*refs*/
	const wordIndex = useRef<number | null>(null);

	const alphabet = Array.from({ length: 26 }, (_, i) =>
		String.fromCharCode(97 + i)
	);

	const GameOver = () => {
		return (
			<div className='absolute flex  flex-col mb-3 z-10 justify-center content-center bg-white/80 w-full h-full'>
				{lostLives === 7 ? (
					<p className='text-lg text-center'>Sorry you lost this time</p>
				) : null}
				{won ? <p className='text-lg'>congrats you won</p> : null}
				<button
					className='mt-3 bg-slate-900 rounded-md w-36 p-3 text-white mx-auto'
					onClick={() => window.location.reload()}
				>
					Play again
				</button>
			</div>
		);
	};

	const SelectChars = () => {
		return (
			<div className='relative mb-3 flex flex-wrap w-4/5 mx-auto h-1/2'>
				{alphabet.map((char, i) => {
					let background = 'white';
					const inBoard = currentBoard?.toLowerCase().includes(char);
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
			{lostLives === 7 || won ? <GameOver /> : null}
			<div
				className='relative flex flex-col bg-white h-fit'
				style={{ width: '60vw' }}
			>
				<div className='relative flex flex-col md:flex-row'>
					<div className='mx-auto md:mx-0'>
						<HangmanSvg lives={lostLives} />
					</div>
					<div className='mx-auto md:mx-0 md:mr-8 mb-3 tracking-widest mt-11 md:justify-self-end'>
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
