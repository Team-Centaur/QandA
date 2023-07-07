import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import mockCurrContet from '../../../../__mocks__/contextMocks/mockCurrContet';
import Search from '../Search.jsx';


describe('Search component', () => {
  test('loads Search component', () => {
    render(<Search />);
    const searchbox = screen.getByRole('searchbox');
    expect(searchbox).toBeInTheDocument();
  });
});
