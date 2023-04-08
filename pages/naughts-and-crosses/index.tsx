/*react*/
import { ReactElement, useState, useEffect } from 'react';

/*next*/
import dynamic from 'next/dynamic';

/*layouts*/
import Layout from '@/layouts/main';

/*components*/
import SelectPlayers from '@/components/select-players';
const WinnersPane = dynamic(() => import('../../components/winners-pane'));

/*reducers*/
import Player from '@/hooks/player';

/*helpers*/
import { computerTurn, hasWon } from '@/lib/helpers/naughts';

/*types*/
import { WinningInfo } from '@/lib/types/game-states';

export default function Naughts() {
	const [board, setBoard] = useState(Array.from({ length: 9 }, () => ''));
	const [players, setPlayers] = useState(0);
	const [winningInfo, setWinnigInfo] = useState<WinningInfo>({
		name: '',
		won: false,
	});
	const [player1, playerActions1] = Player('player1');
	const [player2, playerActions2] = Player('player2');

	useEffect(() => {
		if (players === 1 && player2.turn) {
			setBoard(() => computerTurn(board, player2.sign));
		}
	}, [player1.turn, player2.turn]);

	useEffect(() => {
		if (!player1.turn && !player2.turn) return;
		const player = player1.turn ? player1.name : player2.name;

		if (hasWon(board)) {
			setWinnigInfo({ name: player, won: true, gameOver: true });
			return;
		}

		const boardFull = board.every((cell) => cell !== '');
		if (boardFull) {
			setWinnigInfo({ name: player, won: false, gameOver: true });
			return;
		}

		playerActions1.setTurn(!player1.turn);
		playerActions2.setTurn(!player2.turn);
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
		playerActions1.setName(name1 ? name1 : 'player1');
		playerActions1.setTurn(true);

		if (players > 1) {
			playerActions2.setName(name2 ? name2 : 'player2');
		}

		if (players === 1) {
			playerActions2.setName('comp');
		}
	};

	const handleTurn = (i: number) => {
		if (board[i]) return;

		const newBoard = [...board];
		newBoard[i] = player1.turn ? player1.sign : player2.sign;
		setBoard(newBoard);
	};

	return (
		<div className='relative flex grow flex-none flex-wrap w-100 h-14 content-center justify-center'>
			<SelectPlayers
				players={players}
				setPlayers={(num: number) => setPlayers(num)}
				setNames={setNames}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
			<WinnersPane winningInfo={winningInfo} />
			<div className='relative flex flex-col w-100 justify-center content-center'>
				<p title='current-player' className='text-white text-center mb-1'>
					{`Player: ${player2.turn ? player2.name : player1.name}`}
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
								className={`flex flex-wrap relativeFont justify-center content-center w-1/3 h-1/3 text-white ${
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
		</div>
	);
}

Naughts.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
