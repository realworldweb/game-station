import { render, screen, fireEvent } from '@testing-library/react';
import SelectPlayers from '@/components/select-players';

describe('select players', () => {
	let players = 0;

	let player1 = {
		name: 'Player 1',
		sign: 'x',
	};

	let player2 = {
		name: 'Player 1',
		sign: 'x',
	};

	const setNames = jest.fn((name1, name2) => {
		player1.name = name1 ? name1 : player1.name;
		player2.name = name2 ? name2 : player2.name;
	});

	const setPlayers = jest.fn((num) => {
		players = num;
	});

	const setSigns = jest.fn((sign) => {
		player1.sign = sign === 'x' ? 'x' : 'o';
		player2.sign = sign === 'x' ? 'o' : 'x';
	});

	afterEach(() => {
		// reset the mock data after each test
		players = 0;
		player1 = {
			name: 'Player 1',
			sign: 'x',
		};
		player2 = {
			name: 'Player 1',
			sign: 'x',
		};
	});

	it('renders select players on first load', () => {
		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		const selectSign = screen.queryByTitle('signs-selection');

		expect(selectSign).not.toHaveClass('hidden');
	});

	it('should not render player name form on first load', () => {
		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		expect(screen.queryByRole('form')).not.toBeInTheDocument();
	});

	it('should not render select sign on first load', () => {
		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		expect(screen.queryByTitle('select-sign')).not.toBeInTheDocument();
	});

	it('removes select players on 1 player selection', () => {
		const { rerender } = render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		const button = screen.queryByRole('button', { name: /1 player/i });

		button && fireEvent.click(button);

		rerender(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		expect(button).not.toBeInTheDocument();
	});

	it('removes select players on 2 player selection', () => {
		const { rerender } = render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		const button = screen.queryByRole('button', { name: /2 player/i });

		button && fireEvent.click(button);

		rerender(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		expect(button).not.toBeInTheDocument();
	});

	it('shows enter player name form on 1 player selection', () => {
		players = 1;
		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		const nameForm = screen.getByRole('form', { name: /player-names/i });

		expect(nameForm).toBeInTheDocument();
	});

	it('shows enter player name form on 2 player selection', () => {
		players = 2;
		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		const nameForm = screen.getByRole('form', { name: /player-names/i });

		expect(nameForm).toBeInTheDocument();
	});

	it('on set names form submit should call setNames', () => {
		players = 1;
		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		const nameForm = screen.getByRole('form', { name: /player-names/i });

		fireEvent.submit(nameForm);

		expect(setNames).toBeCalledTimes(1);
	});

	it('shows only player 1 input on 1 player selection', () => {
		players = 1;

		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		const nameForm = screen.getByRole('form', { name: /player-names/i });

		expect(nameForm.querySelectorAll('input')).toHaveLength(1);
	});

	it('shows player 1 and 2 inputs if 2 player selection', () => {
		players = 2;
		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		const nameForm = screen.getByRole('form', { name: /player-names/i });

		expect(nameForm.querySelectorAll('input')).toHaveLength(2);
	});

	it('updates player names on input change', () => {
		players = 2;

		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		const nameForm = screen.getByRole('form', { name: /player-names/i });

		const nameInput = nameForm.querySelectorAll('input');

		nameInput[0] &&
			fireEvent.change(nameInput[0], { target: { value: 'Paul' } });
		nameInput[1] &&
			fireEvent.change(nameInput[1], { target: { value: 'Jhon' } });

		fireEvent.submit(nameForm);

		expect(player1.name).toBe('Paul');
		expect(player2.name).toBe('Jhon');
	});

	it('shows select sign when player-names submited', () => {
		players = 1;
		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		const nameForm = screen.getByRole('form', { name: /player-names/i });

		fireEvent.submit(nameForm);

		const selectSign = screen.getByTitle('select-sign');

		expect(selectSign).toBeInTheDocument();
	});

	it('sets signs when player submits x', () => {
		players = 1;
		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);
		const nameForm = screen.getByRole('form', { name: /player-names/i });

		fireEvent.submit(nameForm);

		const xButton = screen.getByRole('button', { name: /x/i });

		fireEvent.click(xButton);

		expect(player1.sign).toBe('x');
		expect(player2.sign).toBe('o');
	});

	it('sets signs when player submits o', () => {
		players = 1;
		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);
		const nameForm = screen.getByRole('form', { name: /player-names/i });

		fireEvent.submit(nameForm);

		const xButton = screen.getByRole('button', { name: /o/i });

		fireEvent.click(xButton);

		expect(player1.sign).toBe('o');
		expect(player2.sign).toBe('x');
	});

	it('Hides player-selection when player clicks x', () => {
		players = 1;
		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		const nameForm = screen.getByRole('form', { name: /player-names/i });

		fireEvent.submit(nameForm);

		const xButton = screen.getByRole('button', { name: /x/i });

		fireEvent.click(xButton);

		const selectSign = screen.queryByTitle('signs-selection');

		expect(selectSign).toHaveClass('hidden');
	});

	it('Hides player-selection when player clicks o', () => {
		players = 1;
		render(
			<SelectPlayers
				players={players}
				setNames={setNames}
				setPlayers={setPlayers}
				setSigns={setSigns}
				signs={['x', 'o']}
			/>
		);

		const nameForm = screen.getByRole('form', { name: /player-names/i });

		fireEvent.submit(nameForm);

		const oButton = screen.getByRole('button', { name: /o/i });

		fireEvent.click(oButton);

		const selectSign = screen.queryByTitle('signs-selection');

		expect(selectSign).toHaveClass('hidden');
	});
});
