/*react testing libary*/
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';

/*components*/
import Connect from '@/pages/connect-four';

/*layouts*/
import Layout from '../../layouts/main';

/*utils*/
import { hasWon, computerTurn } from '@/lib/helpers/connect';

describe('connect', () => {
	it('renders Connect unchanged', () => {
		const { container } = render(<Connect />);

		expect(container).toMatchSnapshot();
	});

	describe('board', () => {
		it('renders board', () => {
			render(<Connect />);

			expect(screen.getByTitle('game-board')).toBeInTheDocument();
		});

		it('renders 8 columns', () => {
			render(<Connect />);

			const columns = screen.getAllByTitle('game-column');
			expect(columns).toHaveLength(8);
		});

		it('renders 9 tiles', () => {
			render(<Connect />);

			const tiles = screen.getAllByTitle('game-tile');
			const tilesNo = tiles.length / 8;
			expect(tilesNo).toBe(9);
		});

		it('fills tile with red if player selects red', () => {
			render(<Connect />);
			const button = screen.getByRole('button', {
				name: /1 player/i,
			});

			fireEvent.click(button);

			const nameForm = screen.getByRole('form', {
				name: /player-names/i,
			});

			fireEvent.submit(nameForm);

			const xButton = screen.getByRole('button', { name: /Red/i });

			fireEvent.click(xButton);

			const columns = screen.getAllByTitle('game-column');

			act(() => {
				fireEvent.click(columns[0]);
			});

			const tiles = screen.getAllByTitle('game-tile');

			expect(tiles[0]).toHaveStyle('background-color: red;');
		});

		it('fills tile with red if player selects red', () => {
			render(<Connect />);
			const button = screen.getByRole('button', {
				name: /1 player/i,
			});

			act(() => {
				fireEvent.click(button);
			});

			const nameForm = screen.getByRole('form', {
				name: /player-names/i,
			});

			act(() => {
				fireEvent.submit(nameForm);
			});

			const xButton = screen.getByRole('button', { name: /Yellow/i });

			act(() => {
				fireEvent.click(xButton);
			});

			const columns = screen.getAllByTitle('game-column');

			act(() => {
				fireEvent.click(columns[0]);
			});

			const tiles = screen.getAllByTitle('game-tile');

			expect(tiles[0]).toHaveStyle('background-color: yellow;');
		});
	});
	describe('computer turn', () => {
		it('should add a yellow tile if none exist', () => {
			const board = [
				['red', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
			];

			const { newBoard } = computerTurn(board, 'yellow');
			const updated = newBoard.flatMap((row) => row);

			expect(updated).toContain('yellow');
		});

		it('should add a yellow tile as close as possible to last', () => {
			const board = [
				['red', '', '', '', '', '', '', '', ''],
				['yellow', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
			];

			const { newBoard } = computerTurn(board, 'yellow');

			expect(newBoard[1][1]).toBe('yellow');
		});

		it('should complete a winning col', () => {
			const board = [
				['yellow', 'yellow', 'yellow', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
			];

			const { newBoard } = computerTurn(board, 'yellow');

			expect(newBoard[0][3]).toBe('yellow');
		});

		it('should complete a winning row', () => {
			const board = [
				['yellow', '', '', '', '', '', '', '', ''],
				['yellow', '', '', '', '', '', '', '', ''],
				['yellow', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
			];

			const { newBoard } = computerTurn(board, 'yellow');

			expect(newBoard[3][0]).toBe('yellow');
		});

		it('should block an oppent from winning on col', () => {
			const board = [
				['red', 'red', 'red', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
			];

			const { newBoard } = computerTurn(board, 'yellow');

			expect(newBoard[0][3]).toBe('yellow');
		});

		it('should block an oppent from winning on row', () => {
			const board = [
				['red', '', '', '', '', '', '', '', ''],
				['red', '', '', '', '', '', '', '', ''],
				['red', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
			];

			const { newBoard } = computerTurn(board, 'yellow');

			expect(newBoard[3][0]).toBe('yellow');
		});

		it('should favour a winning row over blocking opponent row', () => {
			const board = [
				['red', '', '', '', '', '', '', '', ''],
				['red', '', '', '', '', '', '', '', ''],
				['red', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['yellow', '', '', '', '', '', '', '', ''],
				['yellow', '', '', '', '', '', '', '', ''],
				['yellow', '', '', '', '', '', '', '', ''],
			];

			const { newBoard } = computerTurn(board, 'yellow');

			expect(newBoard[3][0]).toBe('');
			expect(newBoard[4][0]).toBe('yellow');
		});

		it('should favour a winning col over blocking opponent col', () => {
			const board = [
				['red', 'red', 'red', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['yellow', 'yellow', 'yellow', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
			];

			const { newBoard } = computerTurn(board, 'yellow');

			expect(newBoard[5][3]).toBe('yellow');
		});
	});
	describe('has won', () => {
		it('should return false if no win', () => {
			const board = [
				['red', '', '', '', '', '', '', '', ''],
				['yellow', '', '', '', '', '', '', '', ''],
				['red', '', '', '', '', '', '', '', ''],
				['red', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
			];
			const check = hasWon(board, 0);

			expect(check).toBe(false);
		});

		it('should return true for winning red column', () => {
			const board = [
				['red', 'red', 'red', 'red', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
				['', '', '', '', '', '', '', '', ''],
			];
			const check = hasWon(board, 0);

			expect(check).toBe(true);
		});
	});

	it('should return true for winning yellow column', () => {
		const board = [
			['yellow', 'yellow', 'yellow', 'yellow', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
		];
		const check = hasWon(board, 0);

		expect(check).toBe(true);
	});

	it('should return true for winning red row', () => {
		const board = [
			['red', '', '', '', '', '', '', '', ''],
			['red', '', '', '', '', '', '', '', ''],
			['red', '', '', '', '', '', '', '', ''],
			['red', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
		];
		const check = hasWon(board, 0);

		expect(check).toBe(true);
	});

	it('should return true for winning yellow row', () => {
		const board = [
			['yellow', '', '', '', '', '', '', '', ''],
			['yellow', '', '', '', '', '', '', '', ''],
			['yellow', '', '', '', '', '', '', '', ''],
			['yellow', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
		];
		const check = hasWon(board, 0);

		expect(check).toBe(true);
	});

	it('should return true for winning yellow diagonal', () => {
		const board = [
			['yellow', '', '', '', '', '', '', '', ''],
			['', 'yellow', '', '', '', '', '', '', ''],
			['', '', 'yellow', '', '', '', '', '', ''],
			['', '', '', 'yellow', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
		];
		const check = hasWon(board, 0);

		expect(check).toBe(true);
	});

	it('should return true for winning red diagonal', () => {
		const board = [
			['red', '', '', '', '', '', '', '', ''],
			['', 'red', '', '', '', '', '', '', ''],
			['', '', 'red', '', '', '', '', '', ''],
			['', '', '', 'red', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
		];
		const check = hasWon(board, 0);

		expect(check).toBe(true);
	});

	it('should return true for winning red diagonal', () => {
		const board = [
			['', '', '', '', '', '', '', 'red', ''],
			['', '', '', '', '', '', 'red', '', ''],
			['', '', '', '', '', 'red', '', '', ''],
			['', '', '', '', 'red', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
			['', '', '', '', '', '', '', '', ''],
		];
		const check = hasWon(board, 0);

		expect(check).toBe(true);
	});
});
