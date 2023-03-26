interface winMap {
	x?: [number, string[]];
	o?: [number, string[]];
}

const rows = (board: string[]) => {
	const res = [];

	while (board.length > 0) {
		const row = board.splice(0, 3);
		res.push(row);
	}

	return res;
};

const columns = (rows: string[][]) => {
	return rows.reduce(
		(acc: string[][], val) => {
			const [first, second, third] = val;
			acc[0].push(first);
			acc[1].push(second);
			acc[2].push(third);
			return acc;
		},
		[[], [], []]
	);
};

const diagonal = (rows: string[][]): string[] => {
	return rows.reduce((acc: string[], val: string[], index: number) => {
		acc.push(val[index]);
		return acc;
	}, []);
};

const mapwins = (grid: string[][], sign: string) => {
	const player1Sign = sign === 'x' ? 'o' : 'x';
	let winMap: winMap = {};
	let newRows = [...grid];

	for (let row = 0; row < 3; row++) {
		const charOnly = grid[row].filter((char) => char !== '');
		const insertInto = grid[row].indexOf('');
		const [first, second, third] = charOnly;

		if (!third && first && first === second && !winMap.hasOwnProperty(first)) {
			newRows = [...grid];
			newRows[row][insertInto] = sign;
			winMap = {
				...winMap,
				[first]: [row, newRows[row]],
			};
		}
	}

	if (winMap[sign as keyof winMap]) {
		grid[winMap[sign as keyof winMap]![0]] = winMap[sign as keyof winMap]![1];
		return grid;
	} else if (winMap[player1Sign as keyof winMap]) {
		grid[winMap[player1Sign as keyof winMap]![0]] =
			winMap[player1Sign as keyof winMap]![1];
		return grid;
	}

	return [['']];
};

const computerTurn = (board: string[], sign: string) => {
	let newBoard = [...board];

	if (!newBoard.includes(sign) && newBoard[4] === '') {
		newBoard[4] = sign;
		return newBoard;
	}

	if (!newBoard.includes(sign) && newBoard[0] === '') {
		newBoard[0] = sign;
		return newBoard;
	}

	const getRows = rows([...newBoard]);

	const rowWins = mapwins(getRows, sign);

	if (rowWins.length > 1) {
		newBoard = rowWins.flatMap((row) => row);
		return newBoard;
	}

	const getColumns = columns(getRows);
	const columnWins = mapwins(getColumns, sign);

	if (columnWins.length > 1) {
		newBoard = columns(columnWins).flatMap((col) => col);
		return newBoard;
	}

	const lastSign = newBoard.indexOf(sign);

	if (lastSign !== -1 && newBoard[lastSign + 1] === '') {
		newBoard[lastSign + 1] = sign;
		return newBoard;
	}

	if (lastSign !== -1 && newBoard[lastSign - 1] === '') {
		newBoard[lastSign - 1] = sign;
		return newBoard;
	}

	const firstSpace = newBoard.indexOf('');
	newBoard[firstSpace] = sign;
	return newBoard;
};

const hasWon = (board: string[]) => {
	const currentBoard = [...board];

	const getRows = rows(currentBoard);

	const winningRow = getRows.filter(
		(row) =>
			row.every((cell) => cell === 'x') || row.every((cell) => cell === 'o')
	);

	if (winningRow.length > 0) {
		return true;
	}

	const getColumns = columns(getRows);

	const columnCount = getColumns.filter(
		(column) =>
			column.every((cell) => cell === 'o') ||
			column.every((cell) => cell === 'x')
	);

	if (columnCount.length > 0) {
		return true;
	}

	const ltrRowO = diagonal(getRows).every((cell) => cell === 'o');
	const ltrRowX = diagonal(getRows).every((cell) => cell === 'x');

	const flip = [...getRows].reverse();
	const rtlRowO = diagonal(flip).every((cell) => cell === 'o');
	const rtlRowX = diagonal(flip).every((cell) => cell === 'x');

	debugger;
	if (ltrRowO || ltrRowX || rtlRowO || rtlRowX) {
		return true;
	}

	return false;
};

export { computerTurn, hasWon, rows, columns, diagonal };
