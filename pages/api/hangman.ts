import type { NextApiRequest, NextApiResponse } from 'next';

interface HangmanResponse {
	index: number;
	currentBoard: string;
	lostLives: number;
}

const uniqueWords = [
	'Absolute',
	'Buttered',
	'Category',
	'Decision',
	'Efficient',
	'Festival',
	'Gorgeous',
	'Hilarious',
	'Influent',
	'Jovially',
	'Kinetics',
	'Luminous',
	'Midnight',
	'Notorious',
	'Overload',
	'Pensive',
	'Quenched',
	'Rejected',
	'Surmised',
	'Tactless',
	'Unleaded',
	'Vacation',
	'Wandering',
	'Xenolith',
	'Yesterday',
	'Zestiest',
	'Ambiance',
	'Bulletin',
	'Caffeine',
	'Decadent',
	'Eardrums',
	'Fantastic',
	'Glamoury',
	'Handover',
	'Impeccant',
	'Jumbledy',
	'Kinesics',
	'Languish',
	'Meltdown',
	'Nocturne',
	'Outwears',
	'Paganism',
	'Quickest',
	'Radiance',
	'Sculptor',
	'Tadpoles',
	'Upwardly',
	'Vagabond',
	'Whimsies',
	'Xylograph',
	'Abandoned',
	'Bacterin',
	'Celestas',
	'Decently',
	'Earthmen',
	'Focalize',
	'Grateful',
	'Hysteria',
	'Insecure',
	'Juxtapos',
	'Kilobyte',
	'Latchkey',
	'Migraine',
	'Nonhuman',
	'Outflank',
	'Pestling',
	'Quackery',
	'Rational',
	'Scrabble',
	'Thumbing',
	'Unfading',
	'Valuable',
	'Wildfire',
	'Xenogamy',
	'Yearning',
	'Zillionth',
	'Amenable',
	'Bandanna',
	'Crayfish',
	'Demurely',
	'Evacuate',
	'Flagrant',
	'Greedily',
	'Halftime',
	'Imposing',
	'Jovialty',
	'Kindness',
	'Larkspur',
	'Mastodon',
	'Nervously',
	'Overbook',
	'Painless',
	'Quibbler',
	'Raindrop',
	'Scimitar',
	'Troubled',
	'Umbrella',
	'Vaporous',
	'Wretched',
	'Xenolith',
];

const randomIndex = () => {
	return Math.floor(Math.random() * uniqueWords.length);
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<HangmanResponse>
) {
	const { query } = req;

	const wordIndex = query.hasOwnProperty('wordIndex')
		? parseInt(query.wordIndex as string)
		: randomIndex();
	const word = uniqueWords[wordIndex as keyof typeof uniqueWords] as string;
	const chars = query.hasOwnProperty('chars')
		? (query.chars as string).split(',')
		: [];
	const lostLives = chars.filter((char) => !word.includes(char)).length;

	const currentBoard = word
		.split('')
		.map((char) => {
			if (chars?.includes(char.toLowerCase())) {
				return char;
			}
			return '_';
		})
		.join('');

	res.status(200).json({ index: wordIndex, currentBoard, lostLives });
}
