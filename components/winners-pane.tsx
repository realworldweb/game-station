import { FC, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

/*types*/
import { WinningInfo } from '@/lib/types/game-states';

/*styles*/
import Styles from '@/styles/transitions/winnersPane.module.css';

interface MyProps {
	winningInfo: WinningInfo;
}
const WinnersPane: FC<MyProps> = ({ winningInfo }) => {
	const nodeRef = useRef(null);
	return (
		<CSSTransition
			in={winningInfo.gameOver}
			timeout={600}
			classNames={{
				enter: Styles.winnersPaneEnter,
				enterActive: Styles.winnersPaneEnterActive,
				exit: Styles.winnersPaneExit,
				exitActive: Styles.winnersPaneExitActive,
			}}
			nodeRef={nodeRef}
		>
			<div
				title=''
				className={`absolute flex flex-col gap-2 bg-white/75 flex-wrap z-10 w-full h-full justify-center content-center ${
					winningInfo.gameOver ? '' : 'animateHide'
				}`}
			>
				{winningInfo.gameOver && winningInfo.won === false ? (
					<div className='relative flex flex-col bg-slate-900 text-white justify-center content-center p-10'>
						<h1 className='text-center mb-2'>It's a draw</h1>
						<p className='text-center'>{`Neither player could win`}</p>
					</div>
				) : (
					<div className='relative flex flex-col bg-slate-900 text-white justify-center content-center p-10'>
						<h1 className='text-center mb-2'>{`${
							winningInfo.name === 'comp' ? 'Too bad' : 'Congratulations'
						}`}</h1>
						<p className='text-center'>{`${winningInfo.name} has won the game`}</p>
					</div>
				)}
				<button
					className='bg-white rounded-md py-3'
					onClick={() => window.location.reload()}
				>
					Replay
				</button>
			</div>
		</CSSTransition>
	);
};

export default WinnersPane;
