import { FC } from 'react';

/*types*/
import { WinningInfo } from '@/lib/types/game-states';

interface MyProps {
	winningInfo: WinningInfo;
}
const WinnersPane: FC<MyProps> = ({ winningInfo }) => {
	return (
		<div
			title=''
			className={`absolute flex flex-col gap-2 bg-white/75 flex-wrap z-10 w-full h-full justify-center content-center ${
				winningInfo.won ? '' : 'hidden'
			}`}
		>
			{winningInfo.gameOver && winningInfo.won === false ? (
				<div className='relative flex flex-col bg-slate-900 text-white justify-center content-center p-10'>
					<h1 className='text-center'></h1>
					<p>{`${winningInfo.name} has won the game`}</p>
				</div>
			) : null}
			<div className='relative flex flex-col bg-slate-900 text-white justify-center content-center p-10'>
				<h1 className='text-center'>{`${
					winningInfo.name === 'comp' ? 'Too bad' : 'Congratulations'
				}`}</h1>
				<p>{`${winningInfo.name} has won the game`}</p>
			</div>
		</div>
	);
};

export default WinnersPane;
