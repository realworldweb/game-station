/*react*/
import { ReactElement, useState, useEffect } from 'react';

/*layouts*/
import Layout from '@/layouts/main';

/*components*/
import SelectPlayers from '@/components/select-players';

/*reducers*/
import Player from '@/hooks/player';

export default function Naughts() {
	const [board, setBoard] = useState(Array.from({ length: 9 }, () => ''));
	const [selectVisible, setSelectVisible] = useState(true);
	const [players, setPlayers] = useState(0);
	const [player1, playerActions1] = Player('player1');
	const [player2, playerActions2] = Player('player2');

	const hasWon = () => {
		const rows = [];
		const currentBoard = [...board];

		while (currentBoard.length > 0) {
			const row = currentBoard.splice(0, 3);
			const o = row.every((cell) => cell === 'o');
			const x = row.every((cell) => cell === 'x');
			if (o || x) return true;
			rows.push(row);
		}

		const columns: string[][] = rows.reduce(
			(acc: string[][], val) => {
				const [first, second, third] = val;
				acc[0].push(first);
				acc[1].push(second);
				acc[2].push(third);
				return acc;
			},
			[[], [], []]
		);

		const columnCount = columns.filter(
			(column) =>
				column.every((cell) => cell === 'o') ||
				column.every((cell) => cell === 'x')
		);

		if (columnCount.length > 0) {
			return true;
		}

		const diagonal = (rows: string[][]): string[] => {
			return rows.reduce((acc: string[], val: string[], index: number) => {
				acc.push(val[index]);
				return acc;
			}, []);
		};

		const ltrRow =
			diagonal(rows).every((cell) => cell === 'o') ||
			diagonal(rows).every((cell) => cell === 'x');

		const rtlRow =
			diagonal(rows.reverse()).every((cell) => cell === 'o') ||
			diagonal(rows).every((cell) => cell === 'x');

		if (ltrRow || rtlRow) {
			return true;
		}

		if (player1.turn || player2.turn) {
			playerActions1.setTurn(!player1.turn);
			playerActions2.setTurn(!player2.turn);
		}
		return false;
	};

	useEffect(() => {
		if (hasWon()) {
			console.log(`${player1.turn ? player1.name : player2.name} has won`);
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
		setSelectVisible(false);
	};

	const setNames = (name1: string, name2?: string) => {
		playerActions1.setName(name1);

		playerActions2.setName(name2 ? name2 : 'comp');

		playerActions1.setTurn(true);
	};

	const handleTurn = async (i: number) => {
		if (board[i]) return;

		const newBoard = [...board];
		newBoard[i] = player1.turn ? player1.sign : player2.sign;
		setBoard(newBoard);
	};

	return (
		<div className='relative flex grow flex-none flex-wrap w-100 h-14 content-center justify-center bg-slate-600'>
			{selectVisible ? (
				<SelectPlayers
					players={players}
					setPlayers={(num: number) => setPlayers(num)}
					setNames={setNames}
					setSigns={setSigns}
				/>
			) : null}
			<p className='text-white mb-1'>
				Player: {player1.turn ? player1.name : player2.name}
			</p>
			<div className='relative flex border-2 border-white flex-wrap w-96 h-96'>
				{Array.from({ length: 9 }, (_, i) => {
					return (
						<div
							key={i}
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
}

Naughts.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
