/*react*/
import { ReactElement } from 'react';

/*next*/
import Head from 'next/head';
import Link from 'next/link';

/*layout*/
import Layout from '../layouts/main';

/*components*/
import GameTile from '@/components/game-tile';

export default function Home() {
	return (
		<>
			<Head>
				<title>Game-station homepage</title>
				<meta
					name='description'
					content='A pwa of diffrent games and puzzles to entertain'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<>
				<h1 className='text-white py-5 px-3'>Welcome to the game station</h1>
				<div className='flex wrap content-center justify-center'>
					<GameTile
						title='Naughts and crosses'
						url='/naughts-and-crosses'
						img='/naughts-and-crosses.webp'
					/>
				</div>
			</>
		</>
	);
}

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
