/*react*/
import { ReactElement, useState, useEffect } from 'react';

/*layouts*/
import Layout from '@/layouts/main';

/*components*/
import SelectPlayers from '@/components/select-players';

/*reducers*/
import Player from '@/hooks/player';

/*helpers*/
import { computerTurn, hasWon } from '@/lib/helpers/naughts';

/*types*/

import { NextPageWithLayout } from '../_app';

const Naughts: NextPageWithLayout = () => {
	const [board, setBoard] = useState(Array.from({ length: 9 }, () => ''));
	const [players, setPlayers] = useState(0);
	const [player1, playerActions1] = Player('player1');
	const [player2, playerActions2] = Player('player2');

	useEffect(() => {
		if (hasWon(board)) {
			console.log(`${player1.turn ? player1.name : player2.name} has won`);
			return;
		}

		playerActions1.setTurn(!player1.turn);
		playerActions2.setTurn(!player2.turn);

		if (players === 1 && player2.turn) {
			setBoard(() => computerTurn(board, player2.sign));
		}
	}, [JSON.stringify(board)]);

	const setSigns = (sign: string) => {
		if (sign === 'x') {
			playerActions1.setSign('x');
			playerActions2.setSign('o');
		} else if (sign === 'o') {
			playerActions1.setSign('o');
			playerActions2.setSign('x');
		}
	};

	const setNames = (name1: string, name2?: string) => {
		if (!name1) return;
		playerActions1.setName(name1);

		if (!name2) return;
		playerActions2.setName(name2 ? name2 : 'comp');

		playerActions1.setTurn(true);
	};

	const handleTurn = (i: number) => {
		if (board[i]) return;

		const newBoard = [...board];
		newBoard[i] = player1.turn ? player1.sign : player2.sign;
		setBoard(newBoard);
	};

	return (
		<div className='relative flex grow flex-none flex-wrap w-100 h-14 content-center justify-center bg-slate-600'>
			<SelectPlayers
				players={players}
				setPlayers={(num: number) => setPlayers(num)}
				setNames={setNames}
				setSigns={setSigns}
			/>
			<p title='current-player' className='text-white mb-1'>
				{`Player: ${player1.turn ? player1.name : player2.name}`}
			</p>
			<div
				title='game-board'
				className='relative flex border-2 border-white flex-wrap w-96 h-96'
			>
				{Array.from({ length: 9 }, (_, i) => {
					return (
						<div
							key={i}
							title='board-tile'
							className={`flex flex-wrap justify-center content-center w-1/3 h-1/3 text-white ${
								i % 2 === 0 ? 'bg-slate-800' : 'bg-red-400'
							}`}
							onClick={() => {
								handleTurn(i);
							}}
						>
							{board[i]}
						</div>
					);
				})}
			</div>
		</div>
	);
};

Naughts.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Naughts;
