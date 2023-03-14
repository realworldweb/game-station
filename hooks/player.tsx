import { useReducer } from 'react';

function playerReducer(state: any, action: any) {
	switch (action.type) {
		case 'SET_NAME':
			return { ...state, name: action.payload };
		case 'SET_TURN':
			return { ...state, turn: action.payload, init: true };
		case 'SET_WON':
			return { ...state, won: action.payload };
		case 'SET_SIGN':
			return { ...state, sign: action.payload };
		default:
			return state;
	}
}

function Player(name: any) {
	const [player, dispatch] = useReducer(playerReducer, {
		name,
		turn: false,
		won: false,
		sign: '',
		init: false,
	});

	const setTurn = (set: boolean) => {
		if (player.turn === set) return;
		dispatch({ type: 'SET_TURN', payload: set });
	};

	const setName = (name: string) => {
		if (player.name === name) return;
		dispatch({ type: 'SET_NAME', payload: name });
	};

	const setWon = () => {
		dispatch({ type: 'SET_WON', payload: true });
	};

	const setSign = (sign: string) => {
		if (player.sign === sign) return;
		dispatch({ type: 'SET_SIGN', payload: sign });
	};

	const reset = () => {
		dispatch({ type: 'SET_TURN', payload: false });
		dispatch({ type: 'SET_WON', payload: false });
	};

	const playerActions = { setTurn, setName, setWon, setSign, reset };

	return [player, playerActions];
}

export default Player;
