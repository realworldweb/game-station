import { render } from '@testing-library/react';
import Header from '@/components/layout/header';

describe('<Header />', () => {
	it('should render', () => {
		const { container } = render(<Header />);
		expect(container).toMatchSnapshot();
	});
});
