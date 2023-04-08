/*react*/
import { ReactElement, useState, useEffect, FC, useRef } from 'react';

/*next*/
import dynamic from 'next/dynamic';

/*layouts*/
import Layout from '@/layouts/main';

/*components*/
import SelectPlayers from '@/components/select-players';
const WinnersPane = dynamic(() => import('../../components/winners-pane'));

/*helpers*/
import { hasWon } from '@/lib/helpers/connect';

/*reducers*/
import Player from '@/hooks/player';

/*types*/
import { WinningInfo } from '@/lib/types/game-states';

interface TileProps {
	index: number;
	sign: string;
}

export default function Connect() {
	const [board, setBoard] = useState(Array(9).fill(Array(9).fill('')));
	const [players, setPlayers] = useState(0);
	const [winningInfo, setWinnigInfo] = useState<WinningInfo>({
		name: '',
		won: false,
	});
	const [player1, playerActions1] = Player('player1');
	const [player2, playerActions2] = Player('player2');
	const currentPlayer = player1.turn ? player1 : player2;
	const lastRow = useRef(-1);

	/* useEffect(() => {
		if (players === 1 && player2.turn) {
			setBoard(() => computerTurn(board, player2.sign));
		}
	}, [player1.turn, player2.turn]);*/

	useEffect(() => {
		if (!player1.turn && !player2.turn) return;
		const player = player1.turn ? player1.name : player2.name;

		if (hasWon(board, lastRow.current)) {
			setWinnigInfo({ name: player, won: true, gameOver: true });
			return;
		}

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
				className='relative border-2  border-blue-700 w-full h-full'
				style={{ backgroundColor: background }}
				key={index}
			/>
		);
	};

	const Board = () => {
		return (
			<div className='relative rotate-270 flex flex-col w-96 h-96 mx-auto'>
				{board.map((row, rowIndex) => (
					<div
						className='relative h-12 flex grow  justify-center'
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
		<div className='relative flex grow flex-none flex-wrap w-100 h-14 content-center justify-center'>
			<SelectPlayers
				players={players}
				setPlayers={(num: number) => setPlayers(num)}
				setNames={setNames}
				setSigns={setSigns}
				signs={['Red', 'Yellow']}
			/>
			<WinnersPane winningInfo={winningInfo} />
			<div className='relative flex flex-col w-100 justify-center content-center'>
				<p title='current-player' className='text-white text-center mb-5'>
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
