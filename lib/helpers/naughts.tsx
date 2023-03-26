const lines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const buildBoard = (index: number, board: string[], sign: string) => {
	const newBoard = [...board];
	const line = lines[index];
	const [first, second, third] = line;
	const segment = [board[first], board[second], board[third]];
	const space = segment.indexOf('');

	newBoard[line[space]] = sign;

	return newBoard;
};

const computerTurn = (board: string[], sign: string) => {
	const newBoard = [...board];
	const otherSign = sign === 'x' ? 'o' : 'x';
	const hasSignIndex = newBoard.indexOf(sign);

	if (hasSignIndex === -1 && newBoard[4] === '') {
		newBoard[4] = sign;
		return newBoard;
	}

	if (hasSignIndex === -1 && newBoard[0] === '') {
		newBoard[0] = sign;
		return newBoard;
	}

	let x = null;

	for (let i = 0; i < lines.length; i++) {
		const [first, second, third] = lines[i];

		const segment = [board[first], board[second], board[third]];

		const checks = {
			x: segment.filter((cell) => cell === 'x'),
			o: segment.filter((cell) => cell === 'o'),
		};

		if (checks[sign as keyof typeof checks].length === 2) {
			return buildBoard(i, newBoard, sign);
		}

		if (checks[otherSign as keyof typeof checks].length === 2 && !x) {
			x = i;
			continue;
		}
	}

	if (x !== null && x >= 0) {
		return buildBoard(x, newBoard, sign);
	}

	if (newBoard[hasSignIndex + 1] === '') {
		newBoard[hasSignIndex + 1] = sign;
		return newBoard;
	}

	if (newBoard[hasSignIndex - 1] === '') {
		newBoard[hasSignIndex - 1] = sign;
		return newBoard;
	}

	const firstSpace = newBoard.indexOf('');
	newBoard[firstSpace] = sign;
	return newBoard;
};

const hasWon = (board: string[]) => {
	for (const line of lines) {
		const [first, second, third] = line;
		const segment = [board[first], board[second], board[third]];
		const x = segment.every((cell) => cell === 'x');
		const o = segment.every((cell) => cell === 'o');

		if (x || o) {
			return true;
		}
	}

	return false;
};

export { computerTurn, hasWon };
