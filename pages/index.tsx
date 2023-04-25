/*react*/
import { ReactElement } from 'react';

/*next*/
import Head from 'next/head';

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
				<h1 className='px-3 py-5 text-white'>Welcome to the game station</h1>
				<div className='flex flex-col content-center justify-center gap-4 md:flex-row wrap'>
					<GameTile
						title='Naughts and crosses'
						url='/naughts-and-crosses'
						img='/naughts-and-crosses.webp'
					/>
					<GameTile
						title='Connect four'
						url='/connect-four'
						img='/connect-four.webp'
					/>
					<GameTile title='Hangman' url='/hangman' img='/hangman.webp' />
				</div>
			</>
		</>
	);
}

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
