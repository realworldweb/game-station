const computerTurn = (board: string[], sign: string) => {
	const newBoard = [...board];

	if (!newBoard.includes(sign) && newBoard[4] === '') {
		newBoard[4] = sign;
		return newBoard;
	}

	if (!newBoard.includes(sign)) {
		newBoard[0] = sign;
		return newBoard;
	}

	const index = newBoard.indexOf(sign);

	if (newBoard[index - 1] === '') {
		newBoard[index - 1] = sign;

		return newBoard;
	}

	if (newBoard[index + 1] === '') {
		newBoard[index + 1] = sign;

		return newBoard;
	}

	return newBoard;
};

const hasWon = (board: string[]) => {
	const currentBoard = [...board];
	const rows = [];

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

	return false;
};

export { computerTurn, hasWon };
