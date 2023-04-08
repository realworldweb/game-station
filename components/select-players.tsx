import { FC, useState } from 'react';

interface myProps {
	players: number;
	setPlayers: Function;
	setNames: Function;
	setSigns: Function;
	signs: string[];
}
const SelectPlayers: FC<myProps> = ({
	players,
	setPlayers,
	setNames,
	setSigns,
	signs,
}) => {
	const [player1Name, setPlayer1Name] = useState('');
	const [player2Name, setPlayer2Name] = useState('');
	const [named, setNamed] = useState(false);
	const [visible, setVisible] = useState(true);

	return (
		<div
			title='signs-selection'
			className={`absolute flex flex-col gap-2 bg-white/75 flex-wrap z-10 w-full h-full justify-center content-center ${
				visible ? '' : 'hidden'
			}`}
		>
			{players === 0 ? (
				<>
					<button
						onClick={() => setPlayers(1)}
						className='bg-slate-900 text-white px-4 py-2 rounded-md'
					>
						1 player
					</button>
					<button
						onClick={() => setPlayers(2)}
						className='bg-slate-900 text-white px-4 py-2 rounded-md'
					>
						2 player
					</button>
				</>
			) : named ? (
				<div
					title='select-sign'
					className='flex flex-col flex-wrap content-center justify-center gap-4'
				>
					<p className='p-0 m-0 text-xs'>Player 1 (please select your sign)</p>
					<div className='flex flex-wrap content-center justify-center gap-4'>
						<button
							onClick={() => {
								setVisible(false);
								setSigns(signs[0]);
							}}
							className='bg-slate-900 text-white px-4 py-2 rounded-md'
						>
							{signs[0]}
						</button>
						<button
							onClick={() => {
								setVisible(false);
								setSigns(signs[1]);
							}}
							className='bg-slate-900 text-white px-4 py-2 rounded-md'
						>
							{signs[1]}
						</button>
					</div>
				</div>
			) : (
				<form
					className='flex flex-col justify-center gap-4'
					name='player-names'
					aria-label='player-names'
					onSubmit={(e) => {
						e.preventDefault();
						setNamed(true);
						setNames(player1Name, player2Name);
					}}
				>
					<div className='flex flex-col gap-2'>
						<label htmlFor='player1'>Name(player1)</label>
						<input
							value={player1Name}
							className='pl-1'
							type='text'
							name='player1'
							aria-label='player1'
							id='name-player1'
							onChange={(e) => setPlayer1Name(e.target.value)}
						/>
						{players === 2 ? (
							<>
								<label htmlFor='player2'>Name(player2)</label>
								<input
									value={player2Name}
									className='pl-1'
									type='text'
									name='player2'
									aria-label='player2'
									id='name-player2'
									onChange={(e) => setPlayer2Name(e.target.value)}
								/>
							</>
						) : null}
					</div>
					<button
						type='submit'
						className='bg-slate-900 text-white px-4 py-2 rounded-md'
					>
						Submit
					</button>
				</form>
			)}
		</div>
	);
};

export default SelectPlayers;
