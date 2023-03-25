/*react testing libary*/
import { render, screen, fireEvent } from '@testing-library/react';

/*component*/
import Naughts from '@/pages/naughts-and-crosses';

/*layouts*/
import Layout from '../../layouts/main';

/*utils*/
import {
	hasWon,
	computerTurn,
	columns,
	rows,
	diagonal,
} from '@/lib/helpers/naughts';

describe('naughts', () => {
	afterEach(() => {
		// reset the mock data after each test
		console.clear();
	});
	it('renders naughts unchanged', () => {
		const { container } = render(<Naughts />);

		expect(container).toMatchSnapshot();
	});

	it('renders main layout', () => {
		render(<Naughts />);
		const page = <Naughts />;
		const getLayout = Naughts.getLayout(page);
		expect(getLayout).toEqual(<Layout>{page}</Layout>);
	});

	describe('board', () => {
		it('renders board', () => {
			render(<Naughts />);

			expect(screen.getByTitle('game-board')).toBeInTheDocument();
		});

		it('has 9 clickable tiles', () => {
			render(<Naughts />);

			const tiles = screen.getAllByTitle('board-tile');

			expect(tiles).toHaveLength(9);
		});

		it('if x player clicks tile tile should be filled with x ', () => {
			render(<Naughts />);

			const button = screen.getByRole('button', { name: /1 player/i });

			fireEvent.click(button);

			const nameForm = screen.getByRole('form', { name: /player-names/i });

			fireEvent.submit(nameForm);

			const xButton = screen.getByRole('button', { name: /x/i });

			fireEvent.click(xButton);

			const tiles = screen.getAllByTitle('board-tile');

			fireEvent.click(tiles[0]);

			expect(tiles[0]).toHaveTextContent('x');
		});

		it('if o player clicks tile tile should be filled with o ', () => {
			render(<Naughts />);

			const button = screen.getByRole('button', { name: /1 player/i });

			fireEvent.click(button);

			const nameForm = screen.getByRole('form', { name: /player-names/i });

			fireEvent.submit(nameForm);

			const oButton = screen.getByRole('button', { name: /o/i });

			fireEvent.click(oButton);

			const tiles = screen.getAllByTitle('board-tile');

			fireEvent.click(tiles[0]);

			expect(tiles[0]).toHaveTextContent('o');
		});
	});

	it('if player 1 takes turn details should switch if not playing comp', () => {
		render(<Naughts />);

		const button = screen.getByRole('button', { name: /2 player/i });

		fireEvent.click(button);

		const nameForm = screen.getByRole('form', { name: /player-names/i });

		fireEvent.submit(nameForm);

		const oButton = screen.getByRole('button', { name: /o/i });

		fireEvent.click(oButton);

		const tiles = screen.getAllByTitle('board-tile');

		const playerDetails = screen.getByTitle('current-player');

		expect(playerDetails).toHaveTextContent('Player: player1');

		fireEvent.click(tiles[0]);

		expect(playerDetails).toHaveTextContent('Player: player2');
	});

	describe('rows', () => {
		it('splits board to rows', () => {
			const board = ['x', 'x', 'x', 'o', 'o', '', '', '', ''];

			expect(rows(board)).toEqual([
				['x', 'x', 'x'],
				['o', 'o', ''],
				['', '', ''],
			]);
		});
	});

	describe('columns', () => {
		it('changes rows to columns', () => {
			const rows = [
				['x', 'x', 'x'],
				['o', 'o', ''],
				['', '', ''],
			];

			expect(columns(rows)).toEqual([
				['x', 'o', ''],
				['x', 'o', ''],
				['x', '', ''],
			]);
		});
	});

	describe('diagonal', () => {
		it('changes rows to diagnoal axis', () => {
			const rows = [
				['x', 'x', 'x'],
				['o', 'o', ''],
				['x', '', ''],
			];

			expect(diagonal(rows)).toEqual(['x', 'o', '']);
		});

		it('changes rows to reverse axis when called on rows reverse', () => {
			const rows = [
				['x', 'x', 'x'],
				['o', 'o', ''],
				['x', '', ''],
			];

			expect(diagonal(rows.reverse())).toEqual(['x', 'o', 'x']);
		});
	});

	describe('has won', () => {
		it('should return true if winning row', () => {
			const won = hasWon(['x', 'x', 'x', 'o', 'o', '', '', '', '']);

			expect(won).toBe(true);
		});

		it('should return true if winning column', () => {
			const won = hasWon(['x', 'o', 'x', 'x', 'o', '', 'x', '', '']);

			expect(won).toBe(true);
		});

		it('should return true if winning diagonal', () => {
			const won = hasWon(['x', 'o', 'x', 'o', 'x', '', '', '', 'x']);

			expect(won).toBe(true);
		});

		it('should return false if not winning', () => {
			const won = hasWon(['x', 'o', 'x', 'o', 'x', '', '', 'x', '']);

			expect(won).toBe(false);
		});
	});

	describe('computerTurn', () => {
		it('should add a filled tile to the board', () => {
			const board = ['x', '', '', '', '', '', '', '', ''];
			const tookTurn = computerTurn(board, 'o');

			expect(tookTurn).toContain('o');
		});

		it('should choose middle square if available', () => {
			const board = ['x', '', '', '', '', '', '', '', ''];
			const tookTurn = computerTurn(board, 'o');

			expect(tookTurn[4]).toContain('o');
		});

		it('should choose first square if middle unavailable', () => {
			const board = ['', '', '', '', 'x', '', '', '', ''];
			const tookTurn = computerTurn(board, 'o');

			expect(tookTurn[0]).toContain('o');
		});

		it('should choose last square on a winning row', () => {
			const board = ['x', 'x', '', 'o', 'o', '', '', '', ''];
			const tookTurn = computerTurn(board, 'o');

			expect(tookTurn[5]).toContain('o');
		});

		it('should block last square on a winning opponent row', () => {
			const board = ['x', 'x', '', 'o', '', '', '', '', ''];
			const tookTurn = computerTurn(board, 'o');

			expect(tookTurn[2]).toContain('o');
		});

		it('should place a sign as close to last square as possible', () => {
			const board = ['x', '', '', '', 'o', '', 'x', '', ''];
			const tookTurn = computerTurn(board, 'o');
			expect(tookTurn[5]).toContain('o');
		});
		it('should place a sign as close to last square as possible', () => {
			const board = ['x', '', '', '', 'x', '', '', '', 'o'];
			const tookTurn = computerTurn(board, 'o');
			console.log(tookTurn);
			expect(tookTurn[7]).toContain('o');
		});

		it('should place a sign in first available space if all else fails', () => {
			const board = ['x', '', '', '', 'x', '', '', '', ''];
			const tookTurn = computerTurn(board, 'o');
			expect(tookTurn[1]).toEqual('o');
		});
	});
});
