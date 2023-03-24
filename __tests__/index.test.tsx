import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import Layout from '../layouts/main';

describe('Home', () => {
	it('renders homepage unchanged', () => {
		const { container } = render(<Home />);
		expect(container).toMatchSnapshot();
	});

	it('renders main layout', () => {
		render(<Home />);
		const page = <Home />;
		const getLayout = Home.getLayout(page);
		expect(getLayout).toEqual(<Layout>{page}</Layout>);
	});

	it('renders a heading', () => {
		render(<Home />);

		const heading = screen.getByRole('heading', {
			name: /Welcome to the game station/i,
		});

		expect(heading).toBeInTheDocument();
	});

	it('renders a link for naughts and crosses', () => {
		render(<Home />);

		const heading = screen.getByRole('link', {
			name: /Naughts and crosses/i,
		});

		expect(heading).toBeInTheDocument();
	});

	it('should be a link that have href value to "/naughts-and-crosses"', () => {
		render(<Home />);
		const link = screen.getByRole('link', { name: /Naughts and crosses/i });
		expect(link.getAttribute('href')).toBe('/naughts-and-crosses');
	});
});
