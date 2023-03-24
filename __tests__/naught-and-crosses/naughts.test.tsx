/*react testing libary*/
import { render, screen, fireEvent } from '@testing-library/react';

/*component*/
import Naughts from '@/pages/naughts-and-crosses';

/*layouts*/
import Layout from '../../layouts/main';

/*utils*/
import { hasWon, computerTurn } from '@/lib/helpers/naughts';

describe('naughts', () => {
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
	});
});
