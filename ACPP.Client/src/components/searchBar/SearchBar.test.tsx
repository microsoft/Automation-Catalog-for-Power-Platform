import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../../test/test-utils';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {

    it('renders all the elements', () => {
        renderWithProviders(<SearchBar selectedCategories={[]} />);
        expect(screen.getByTestId('searchbar')).toBeInTheDocument();
        fireEvent.change(screen.getByTestId('searchbar'), { target: { value: 'test' } });
        fireEvent.keyDown(screen.getByTestId('searchbar'), { key: 'Enter', code: 'Enter', charCode: 13 });
        expect(window.location.pathname).toBe('/Search');
    });
})