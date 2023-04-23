import { NextApiRequest, NextApiResponse } from 'next';
import hangmanApi from '@/pages/api/hangman';
import type { HangmanResponse } from '@/pages/api/hangman';

describe('api', () => {
	it('should return a blank word', async () => {
		const returnData = {
			currentBoard: '________',
			index: 1,
			lostLives: 0,
		};
		const query = { wordIndex: 1 };
		const req = {
			query,
		} as unknown as NextApiRequest;
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockImplementationOnce((data) => {
				expect(data).toEqual(returnData);
			}),
		} as unknown as NextApiResponse<HangmanResponse>;

		await hangmanApi(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
	});

	it('should add letters if they exist in word', async () => {
		const returnData = {
			currentBoard: 'B_______',
			index: 1,
			lostLives: 0,
		};
		const query = { wordIndex: 1, chars: 'b', currentBoard: '________' };
		const req = {
			query,
		} as unknown as NextApiRequest;
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockImplementationOnce((data) => {
				expect(data).toEqual(returnData);
			}),
		} as unknown as NextApiResponse<HangmanResponse>;

		await hangmanApi(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
	});

	it('should increment lostLives if char not in word', async () => {
		const returnData = {
			currentBoard: '________',
			index: 1,
			lostLives: 1,
		};
		const query = { wordIndex: 1, chars: 'z', currentBoard: '________' };
		const req = {
			query,
		} as unknown as NextApiRequest;
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockImplementationOnce((data) => {
				expect(data).toEqual(returnData);
			}),
		} as unknown as NextApiResponse<HangmanResponse>;

		await hangmanApi(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
	});
});
