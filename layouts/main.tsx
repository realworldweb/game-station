/*react*/
import { FC, ReactNode } from 'react';

/*next*/
import dynamic from 'next/dynamic';

/*components*/
import Header from '../components/layout/header';
const Footer = dynamic(
	() => import(/* webpackChunkName: "quotes" */ '../components/layout/footer')
);

/*styles*/
import Styles from '../styles/main.module.css';

interface MyProps {
	children: ReactNode;
}

const headerOnly: FC<MyProps> = ({ children }) => {
	return (
		<div className='relative grow flex flex-col min-h-full'>
			<Header />
			<main
				className={`relative flex grow min-h-full flex-col ${Styles.background}`}
			>
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default headerOnly;
