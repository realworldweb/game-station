interface block {
	newBoard: string[][];
	index: number;
}

interface signCount {
	one?: number;
	two?: number;
}

//get a row from a board based on the index of last tile
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

//get diagonal based on position given by ltr rtl diagonal functions
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

//get diagonal ltr based on index of last tile
const getDiagonalLTR = (board: string[][], rowIndex: number) => {
	const newBoard = [...board];

	const col = newBoard[rowIndex].findIndex((el) => el === '');
	const tileIndex = col - 1;
	const choose = rowIndex < 3 ? tileIndex + rowIndex : tileIndex + 3;

	if (rowIndex < 3) return [];

	return diagonalRow(newBoard, choose, rowIndex);
};

//get diagonal rtl based on index of last tile
const getDiagonalRTL = (board: string[][], rowIndex: number) => {
	const newBoard = [...board];

	const col = newBoard[rowIndex].findIndex((el) => el === '');
	const tileIndex = col - 1;
	const choose = rowIndex < 3 ? tileIndex - rowIndex : tileIndex - 3;
	if (rowIndex > newBoard.length - 4) return [];

	return diagonalRow(newBoard, choose, rowIndex);
};

//count consective tiles
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
	let signCountMap: signCount | {} = {};

	for (let i = 0; i < newBoard.length; i++) {
		const filteredTiles = newBoard[i].filter((el) => el !== '');

		const check =
			filteredTiles.length > 2
				? [...filteredTiles].splice(filteredTiles.length - 3)
				: null;

		let firstFree = newBoard[i].findIndex((el) => el === '');

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

		const countConsective = filteredTiles && countTiles(filteredTiles);
		if (countConsective?.includes(sign)) {
			if (countConsective.length === 1 && !signCountMap.hasOwnProperty('one')) {
				signCountMap = {
					...signCountMap,
					one: i,
				};
			}
			if (countConsective.length === 2 && !signCountMap.hasOwnProperty('two')) {
				signCountMap = {
					...signCountMap,
					two: i,
				};
			}
		}

		if ((i + 1) % 3 === 0 && i < newBoard.length - 2) {
			firstFree = firstFree === 0 ? 0 : firstFree - 1;

			const leftRow = [
				newBoard[i - 2][firstFree],
				newBoard[i - 1][firstFree],
				newBoard[i][firstFree],
			];

			const rightRow = [
				newBoard[i][firstFree],
				newBoard[i + 1][firstFree],
				newBoard[i + 2][firstFree],
			];

			if (
				leftRow.every((el) => el === sign) &&
				newBoard[i + 1][firstFree] === ''
			) {
				const row = [...newBoard[i + 1]];
				row[firstFree] = sign;
				newBoard[i + 1] = row;
				index = i + 1;
				return { newBoard, index };
			}

			if (
				leftRow.every((el) => el !== sign && el !== '') &&
				!blockMove.hasOwnProperty('newBoard') &&
				newBoard[i + 1][firstFree] === ''
			) {
				const boardConfig = [...newBoard];
				const row = [...boardConfig[i + 1]];
				row[firstFree] = sign;
				boardConfig[i + 1] = row;
				index = i + 1;
				blockMove = { newBoard: boardConfig, index };
			}

			if (
				rightRow.every((el) => el === sign) &&
				newBoard[i - 1][firstFree] === ''
			) {
				const boardConfig = [...newBoard];
				const row = boardConfig[i - 1];
				row[firstFree] = sign;
				boardConfig[i - 1] = row;
				index = i - 1;
				return { newBoard: boardConfig, index };
			}

			if (
				rightRow.every((el) => el !== sign && el !== '') &&
				!blockMove.hasOwnProperty('newBoard') &&
				newBoard[i - 1][firstFree] === ''
			) {
				const boardConfig = [...newBoard];
				const row = [...boardConfig[i - 1]];
				row[firstFree] = sign;
				boardConfig[i - 1] = row;
				index = i - 1;
				blockMove = { newBoard: boardConfig, index };
			}
		}
	}

	if (blockMove.hasOwnProperty('newBoard')) {
		return blockMove as block;
	}

	//use signCountMap to place tiles as close to others as possible
	if (signCountMap.hasOwnProperty('two')) {
		debugger;
		const map: signCount = signCountMap as signCount;
		const boardUpdate = [...newBoard];
		const row = [...boardUpdate[map.two!]];
		const place = row.findIndex((el) => el === '');
		row[place] = sign;
		boardUpdate[map.two!] = row;
		index = map.two!;

		return { newBoard: boardUpdate, index };
	}

	if (signCountMap.hasOwnProperty('one')) {
		const map: signCount = signCountMap as signCount;
		const boardUpdate = [...newBoard];
		const row = [...boardUpdate[map.one!]];
		const place = row.findIndex((el) => el === '');
		row[place] = sign;
		boardUpdate[map.one!] = row;
		index = map.one!;

		return { newBoard: boardUpdate, index };
	}

	//take a random move if all else fails

	const randomIndex = Math.floor(Math.random() * 8);
	const row = [...newBoard[randomIndex]];
	const place = row.findIndex((el) => el === '');
	row[place] = sign;
	newBoard[randomIndex] = row;

	return { newBoard, index };
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
