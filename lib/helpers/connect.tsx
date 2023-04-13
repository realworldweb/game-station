interface block {
	newBoard: string[][];
	index: number;
}

const getRow = (board: string[][], rowIndex: number) => {
	const newBoard = [...board];

	const col = newBoard[rowIndex].findIndex((el) => el === '');
	const tileIndex = col === -1 ? 8 : col - 1;

	return newBoard.reduce((acc, col, index) => {
		if (index >= rowIndex - 3 && index <= rowIndex + 3) {
			acc.push(col[tileIndex]);
		}
		return acc;
	}, []);
};

const diagonalRow = (board: string[][], choose: number, rowIndex: number) => {
	const base = choose;

	return board.reduce((acc, col, index) => {
		const updateChoose = () => {
			if (base <= 0) {
				choose++;
			} else {
				choose--;
			}
		};

		if (index >= rowIndex - 3 && index <= rowIndex) {
			if (choose < 0) {
				updateChoose();
				return acc;
			}
			acc.push(col[choose]);
		} else if (
			index > rowIndex &&
			index <= rowIndex + 3 &&
			rowIndex < board.length - 4
		) {
			if (choose > col.length - 1 || choose < 0) {
				updateChoose();
				return acc;
			}
			acc.push(col[choose]);
		}
		updateChoose();
		return acc;
	}, []);
};

const getDiagonalLTR = (board: string[][], rowIndex: number) => {
	const newBoard = [...board];

	const col = newBoard[rowIndex].findIndex((el) => el === '');
	const tileIndex = col - 1;
	const choose = rowIndex < 3 ? tileIndex + rowIndex : tileIndex + 3;

	if (rowIndex < 3) return [];

	return diagonalRow(newBoard, choose, rowIndex);
};

const getDiagonalRTL = (board: string[][], rowIndex: number) => {
	const newBoard = [...board];

	const col = newBoard[rowIndex].findIndex((el) => el === '');
	const tileIndex = col - 1;
	const choose = rowIndex < 3 ? tileIndex - rowIndex : tileIndex - 3;
	if (rowIndex > newBoard.length - 4) return [];

	return diagonalRow(newBoard, choose, rowIndex);
};

const countTiles = (arr: string[]) =>
	arr.reduce((acc: string[], tile: string) => {
		if (acc.length === 4) {
			return acc;
		}

		if (acc.length === 0 && tile !== '') {
			acc.push(tile);
			return acc;
		}

		if (acc[acc.length - 1] === tile && tile !== '') {
			acc.push(tile);
			return acc;
		}

		acc = [];
		if (tile !== '') {
			acc.push(tile);
		}

		return acc;
	}, []);

const computerTurn = (board: string[][], sign: string) => {
	const newBoard: string[][] = [...board];
	let index = 0;
	let blockMove: block | {} = {};

	for (let i = 0; i < newBoard.length; i++) {
		const filteredTiles = newBoard[i].filter((el) => el !== '');

		const check =
			filteredTiles.length > 2
				? [...filteredTiles].splice(filteredTiles.length - 3)
				: null;

		const firstFree = newBoard[i].findIndex((el) => el === '');

		if (check?.every((el) => el === sign)) {
			newBoard[i][firstFree] = sign;
			index = i;
			return { newBoard, index };
		}

		if (
			check?.every((el) => el !== sign && el !== '') &&
			!blockMove.hasOwnProperty('newBoard')
		) {
			const boardConfig = [...newBoard];
			boardConfig[i][firstFree] = sign;
			index = i;
			blockMove = { newBoard: boardConfig, index };
		}
	}

	return blockMove.hasOwnProperty('newBoard')
		? (blockMove as block)
		: { newBoard, index };
};

const hasWon = (board: string[][], rowIndex: number) => {
	const newBoard = [...board];

	const col = newBoard[rowIndex].filter((tile) => tile !== '');

	if (col.length > 3) {
		const checkCol = col.slice(col.length - 4, col.length - 1);

		if (checkCol.every((tile) => tile === col[col.length - 1])) {
			return true;
		}
	}

	const row = getRow(board, rowIndex);
	const rowHasFour = countTiles(row);

	if (rowHasFour.length === 4) {
		return true;
	}

	const diagonalLTR = getDiagonalLTR(board, rowIndex);
	const diagonalRTL = getDiagonalRTL(board, rowIndex);
	const diagonalLTRHasFour = countTiles(diagonalLTR);
	const diagonalRTLHasFour = countTiles(diagonalRTL);

	if (diagonalLTRHasFour.length === 4 || diagonalRTLHasFour.length === 4) {
		return true;
	}

	return false;
};

export { computerTurn, hasWon };
