import {
	findByRole,
	findByTitle,
	render,
	screen,
	act,
} from '@testing-library/react';
import Layout from '@/layouts/main';

describe('main layout', () => {
	it('renders a header', () => {
		const { container } = render(
			<Layout>
				<main>
					<h1>Hello</h1>
				</main>
			</Layout>
		);

		const header = screen.getByTitle('header');

		expect(container).toContainElement(header);
	});

	it('renders a header', async () => {
		const { container, findByTitle } = render(
			<Layout>
				<main>
					<h1>Hello</h1>
				</main>
			</Layout>
		);

		const footer = await findByTitle('footer');

		expect(container).toContainElement(footer);
	});
});
