import { FC } from 'react';

interface SVGProps {
	lives: number;
}

const HangmanSvg: FC<SVGProps> = ({ lives }) => {
	return (
		<svg viewBox='0 0 100 100' width='200' height='200'>
			<line
				x1='20'
				y1='90'
				x2='80'
				y2='90'
				stroke='black'
				strokeWidth='4'
				display={lives > 0 ? 'inline' : 'none'}
			/>
			<line
				x1='30'
				y1='90'
				x2='30'
				y2='20'
				stroke='black'
				strokeWidth='4'
				display={lives > 0 ? 'inline' : 'none'}
			/>
			<line
				x1='30'
				y1='20'
				x2='60'
				y2='20'
				stroke='black'
				strokeWidth='4'
				display={lives > 0 ? 'inline' : 'none'}
			/>
			<line
				x1='60'
				y1='20'
				x2='60'
				y2='35'
				stroke='black'
				strokeWidth='4'
				display={lives > 0 ? 'inline' : 'none'}
			/>

			<circle
				cx='60'
				cy='45'
				r='10'
				stroke='black'
				strokeWidth='4'
				fill='none'
				id='head'
				display={lives > 1 ? 'inline' : 'none'}
			/>

			<line
				x1='60'
				y1='55'
				x2='60'
				y2='70'
				stroke='black'
				strokeWidth='4'
				id='body'
				display={lives > 2 ? 'inline' : 'none'}
			/>

			<line
				x1='60'
				y1='60'
				x2='50'
				y2='65'
				stroke='black'
				strokeWidth='4'
				id='left-arm'
				display={lives > 3 ? 'inline' : 'none'}
			/>

			<line
				x1='60'
				y1='60'
				x2='70'
				y2='65'
				stroke='black'
				strokeWidth='4'
				id='right-arm'
				display={lives > 4 ? 'inline' : 'none'}
			/>

			<line
				x1='60'
				y1='70'
				x2='50'
				y2='80'
				stroke='black'
				strokeWidth='4'
				id='left-leg'
				display={lives > 5 ? 'inline' : 'none'}
			/>

			<line
				x1='60'
				y1='70'
				x2='70'
				y2='80'
				stroke='black'
				strokeWidth='4'
				id='right-leg'
				display={lives > 6 ? 'inline' : 'none'}
			/>
		</svg>
	);
};

export default HangmanSvg;
