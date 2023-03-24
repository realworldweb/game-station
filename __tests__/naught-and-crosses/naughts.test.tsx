import { render, screen, fireEvent } from '@testing-library/react';
import Naughts from '@/pages/naughts-and-crosses';

describe('naughts', () => {
	it('renders naughts unchanged', () => {
		const { container } = render(<Naughts />);

		expect(container).toMatchSnapshot();
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
});
