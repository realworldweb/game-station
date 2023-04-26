import type { FC } from 'react';

/*next*/
import Image from 'next/image';
import Link from 'next/link';

interface GameTileProps {
	title: string;
	url: string;
	img: string;
}

const gameTile: FC<GameTileProps> = ({ title, url, img }) => {
	return (
		<Link
			href={url}
			className='relative rounded-md shadow-xl overflow-hidden mx-auto flex'
			style={{ width: '310px', height: '220px' }}
		>
			<Image src={img} alt='game image' width='459' height='332' />
			<p className='p-0 px-3 text-sm absolute h-8 flex flex-wrap content-center justify-center bottom-0 bg-slate-900/80 rounded-tr-md text-white z-20'>
				{title}
			</p>
		</Link>
	);
};
export default gameTile;
