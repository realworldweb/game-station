/*react*/
import { FC, ReactNode } from 'react';

/*next*/
import dynamic from 'next/dynamic';

/*components*/
import Header from '../components/layout/header';
const Footer = dynamic(
	() => import(/* webpackChunkName: "quotes" */ '../components/layout/footer')
);

interface MyProps {
	children: ReactNode;
}

const headerOnly: FC<MyProps> = ({ children }) => {
	return (
		<div className='relative grow flex flex-col min-h-full'>
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default headerOnly;
