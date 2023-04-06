import Page from './index.page';
import { render } from '@testing-library/react';

describe('/ Page Component', () => {
  it('renders correctly', () => {
    const { getByRole, asFragment } = render(<Page />);

    expect(
      getByRole('heading', {
        name: 'Hello world',
      })
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
