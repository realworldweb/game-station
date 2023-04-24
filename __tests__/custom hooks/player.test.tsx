import { renderHook, act } from '@testing-library/react-hooks';

import usePlayer from '@/hooks/player';

//describe player

const returnData = {
	name: 'player1',
	turn: false,
	won: false,
	sign: '',
	init: false,
};

describe('usePlayer', () => {
	it('should return player state', () => {
		const { result }: any = renderHook(() => usePlayer('player1'));

		expect(result.current[0]).toEqual(returnData);
	});

	it('it should set player name', () => {
		const { result }: any = renderHook(() => usePlayer('player1'));

		result.current[1].setName('Paul');

		expect(result.current[0].name).toEqual('Paul');
	});

	it('it should set player turn', () => {
		const { result }: any = renderHook(() => usePlayer('player1'));

		result.current[1].setTurn(true);

		expect(result.current[0].turn).toEqual(true);
	});

	it('it should set player has won', () => {
		const { result }: any = renderHook(() => usePlayer('player1'));

		result.current[1].setWon(true);

		expect(result.current[0].won).toEqual(true);
	});

	it('it should set player sign', () => {
		const { result }: any = renderHook(() => usePlayer('player1'));

		result.current[1].setSign('X');

		expect(result.current[0].sign).toEqual('X');
	});

	it('it should set reset turn and win', () => {
		const { result }: any = renderHook(() => usePlayer('player1'));

		result.current[1].setTurn(true);

		result.current[1].setWon(true);

		result.current[1].reset();

		expect(result.current[0].turn && result.current[0].won).toEqual(false);
	});
});
