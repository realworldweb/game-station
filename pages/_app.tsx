/*react*/
import { ReactElement, ReactNode } from 'react';

/*types*/
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

/*styles & fonts*/
import '@/styles/globals.css';
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({
	weight: '400',
	subsets: [],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<main
			className={`relative flex flex-col min-h-full ${pressStart2P.className}`}
		>
			{getLayout(<Component {...pageProps} />)}
		</main>
	);
}
