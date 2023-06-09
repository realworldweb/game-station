import Link from 'next/link';

function Header() {
	return (
		<div
			title='header'
			className='relative flex flex-none flex-wrap w-100 h-14 content-center justify-center bg-neutral-900 text-white'
		>
			<Link href='/' className='text-center'>
				The Game Station
			</Link>
		</div>
	);
}

export default Header;
