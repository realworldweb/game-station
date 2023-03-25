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

const computerTurn = (board: string[], sign: string) => {
	let newBoard = [...board];
	const player1Sign = sign === 'x' ? 'o' : 'x';

	if (!newBoard.includes(sign) && newBoard[4] === '') {
		newBoard[4] = sign;
		return newBoard;
	}

	if (!newBoard.includes(sign) && newBoard[0] === '') {
		newBoard[0] = sign;
		return newBoard;
	}

	const getRows = rows([...newBoard]);
	let winMap: winMap = {};

	for (let row = 0; row < 3; row++) {
		const charOnly = getRows[row].filter(Boolean);
		const insertInto = getRows[row].indexOf('');
		const [first, second] = charOnly;

		if (first === second && !winMap.hasOwnProperty(first)) {
			getRows[row][insertInto] = sign;
			winMap = {
				...winMap,
				[first]: [row, getRows[row]],
			};
		}
	}

	if (winMap[sign as keyof winMap]) {
		getRows[winMap[sign as keyof winMap]![0]] =
			winMap[sign as keyof winMap]![1];
		newBoard = getRows.flatMap((row) => row);
		return newBoard;
	} else if (winMap[player1Sign as keyof winMap]) {
		getRows[winMap[player1Sign as keyof winMap]![0]] =
			winMap[player1Sign as keyof winMap]![1];
		newBoard = getRows.flatMap((row) => row);
		return newBoard;
	}

	const lastSign = newBoard.indexOf(sign);

	if (lastSign !== -1 && newBoard[lastSign + 1] === '') {
		newBoard[lastSign + 1] = sign;
		return newBoard;
	}

	if (lastSign !== -1 && newBoard[lastSign - 1] === '') {
		console.log(lastSign, 'ran');
		newBoard[lastSign - 1] = sign;
		console.log(newBoard);
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

	const ltrRow =
		diagonal(getRows).every((cell) => cell === 'o') ||
		diagonal(getRows).every((cell) => cell === 'x');

	const rtlRow =
		diagonal(getRows.reverse()).every((cell) => cell === 'o') ||
		diagonal(getRows.reverse()).every((cell) => cell === 'x');

	if (ltrRow || rtlRow) {
		return true;
	}

	return false;
};

export { computerTurn, hasWon, rows, columns, diagonal };
