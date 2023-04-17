/*react*/
import { ReactElement, useState, useEffect, FC, useRef } from 'react';

/*next*/
import dynamic from 'next/dynamic';

/*layouts*/
import Layout from '@/layouts/main';

/*components*/
import SelectPlayers from '@/components/select-players';
const WinnersPane = dynamic(() => import('../../components/winners-pane'));

/*styles*/

import Styles from '@/styles/component/connect.module.css';

/*helpers*/
import { hasWon, computerTurn } from '@/lib/helpers/connect';

/*reducers*/
import Player from '@/hooks/player';

/*types*/
import { WinningInfo } from '@/lib/types/game-states';

interface TileProps {
	index: number;
	sign: string;
}

export default function Connect() {
	const [board, setBoard] = useState(Array(8).fill(Array(9).fill('')));
	const [players, setPlayers] = useState(0);
	const [winningInfo, setWinnigInfo] = useState<WinningInfo>({
		name: '',
		won: false,
	});
	const [player1, playerActions1] = Player('player1');
	const [player2, playerActions2] = Player('player2');
	const currentPlayer = player1.turn ? player1 : player2;
	const lastRow = useRef(-1);

	useEffect(() => {
		if (!(players === 1 && player2.turn)) return;

		const { newBoard, index } = computerTurn(board, player2.sign);
		setBoard(newBoard);
		lastRow.current = index;
	}, [player2.turn]);

	useEffect(() => {
		if (!player1.turn && !player2.turn) return;
		const player = player1.turn ? player1.name : player2.name;

		/*if (hasWon(board, lastRow.current)) {
			setWinnigInfo({ name: player, won: true, gameOver: true });
			return;
		}*/

		const tilesFull = board
			.flatMap((tiles) => tiles)
			.every((cell) => cell !== '');
		if (tilesFull) {
			setWinnigInfo({ name: player, won: false, gameOver: true });
			return;
		}

		playerActions1.setTurn(!player1.turn);
		playerActions2.setTurn(!player2.turn);
	}, [JSON.stringify(board)]);

	const setSigns = (sign: string) => {
		if (sign === 'Red') {
			playerActions1.setSign('Red');
			playerActions2.setSign('Yellow');
		} else if (sign === 'Yellow') {
			playerActions1.setSign('Yellow');
			playerActions2.setSign('Red');
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

	const dropTile = (row: number, sign: string) => {
		const newRow = [...board[row]];
		const usedTiles = newRow.filter((el) => el !== '');
		if (usedTiles.length === newRow.length) return;
		newRow.splice(board[row].indexOf(''), 1, sign);

		const newBoard = [...board];
		newBoard[row] = newRow;

		lastRow.current = row;
		setBoard(newBoard);
	};

	const Tile: FC<TileProps> = ({ index, sign }) => {
		let background = 'white';

		if (sign === 'Red') {
			background = 'red';
		} else if (sign === 'Yellow') {
			background = 'yellow';
		}

		return (
			<div
				title='game-tile'
				className='relative flex items-center justify-center w-full h-full overflow-hidden bg-blue-700 border-2 border-blue-700'
				key={index}
				id={`${index}`}
			>
				<div
					className={`relative w-2/3 h-2/3 rounded-full ${Styles.tileCap}`}
					style={{ backgroundColor: background }}
				/>
			</div>
		);
	};

	const Board = () => {
		return (
			<div
				title='game-board'
				className='relative flex flex-col mx-auto rotate-270 w-96 h-96'
			>
				{board.map((row, rowIndex) => (
					<div
						title='game-column'
						className='relative flex justify-center h-12 grow'
						key={rowIndex}
						onClick={(e) => {
							e.stopPropagation();
							dropTile(rowIndex, currentPlayer.sign);
						}}
					>
						{row.map((cell: string, cellIndex: number) => (
							<Tile key={cellIndex} index={cellIndex} sign={cell} />
						))}
					</div>
				))}
			</div>
		);
	};

	return (
		<div className='relative flex flex-wrap content-center justify-center flex-none grow w-100 h-14'>
			<SelectPlayers
				players={players}
				setPlayers={(num: number) => setPlayers(num)}
				setNames={setNames}
				setSigns={setSigns}
				signs={['Red', 'Yellow']}
			/>
			<WinnersPane winningInfo={winningInfo} />
			<div className='relative flex flex-col content-center justify-center w-100'>
				<p title='current-player' className='mb-5 text-center text-white'>
					{`Player: ${player1.turn ? player1.name : player2.name}`}
				</p>
				<Board />
			</div>
		</div>
	);
}

Connect.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
