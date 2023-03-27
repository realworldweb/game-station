import { render, screen, waitFor } from '@testing-library/react';
import Layout from '@/layouts/main';

describe('main layout', () => {
	it('renders a header', async () => {
		let component;
		await waitFor(() => {
			component = render(Layout({ children: <div>Dummy</div> })!);
		});

		const header = screen.getByTitle('header');

		expect(header).toBeInTheDocument();
	});

	it('renders a footer', async () => {
		let component;
		await waitFor(() => {
			component = render(Layout({ children: <div>Dummy</div> })!);
		});

		const footer = screen.getByTitle('footer');

		expect(footer).toBeInTheDocument();
	});
});
