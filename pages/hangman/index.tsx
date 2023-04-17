/*react*/
import { ReactElement, useState, useEffect, FC, useRef } from 'react';

import axios from 'axios';

/*layouts*/
import Layout from '@/layouts/main';

export default function Hangman() {
	const chars = useRef([]);
	const wordIndex = useRef<number | null>(null);
	const [currentBoard, setCurrentBoard] = useState(null);

	useEffect(() => {
		const url = `/api/hangman/?chars=${chars.current}&wordIndex=${wordIndex.current}`;

		axios.get(url).then((res) => {
			console.log(res.data);
			wordIndex.current = res.data.index;
			setCurrentBoard(res.data.currentBoard);
		});
	}, [chars]);

	return <div></div>;
}

Hangman.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
