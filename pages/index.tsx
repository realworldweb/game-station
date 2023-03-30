/*react*/
import { ReactElement } from 'react';

/*next*/
import Head from 'next/head';
import Link from 'next/link';

/*layout*/
import Layout from '../layouts/main';

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
				<h1>Welcome to the game station</h1>
				<Link href='/naughts-and-crosses'>Naughts and crosses</Link>
			</>
		</>
	);
}

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
