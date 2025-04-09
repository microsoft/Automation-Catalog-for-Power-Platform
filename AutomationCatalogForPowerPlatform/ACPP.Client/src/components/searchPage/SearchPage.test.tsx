/// <reference types="jest" />

import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../test/test-utils';
import SearchPage from './SearchPage';
import { mockCarouselCards } from '../../mockData/mockCarouselData';

// Mock useGetCategoriesData and useScreenSize hooks
jest.mock('../../hooks/useGetCategoriesData', () => ({
  useGetCategoriesData: () => ({
    data: [{ categoryTitle: 'Category 1' }, { categoryTitle: 'Category 2' }, { categoryTitle: 'Category 3' }],
    isLoading: false,
  }),
}));

jest.mock('../../hooks/useScreenSize', () => ({
  useScreenSize: () => ['1280'],
}));

describe('SearchPage Component', () => {
  it('renderWithProviderss without errors', () => {
    renderWithProviders(<SearchPage allCards={mockCarouselCards} />);
    const filtersText = screen.getByText('Filters:');
    expect(filtersText).toBeInTheDocument();
  });

  it('selects and clears category filters', async () => {
    renderWithProviders(<SearchPage allCards={mockCarouselCards}/>);

    // Open the category menu
    const categoryButton = screen.getByText('Category');
    fireEvent.click(categoryButton);

    // Select a category
    const categoryToSelect = 'Category 1';
    const categoryCheckbox = screen.getByText(categoryToSelect);
    fireEvent.click(categoryCheckbox);

    // Apply the filter
    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);

    // Verify that the selected category tag is displayed
    const selectedCategoryTag = screen.getAllByText(categoryToSelect);
    expect(selectedCategoryTag.length).toBe(1);

    // Clear the selected category
    const clearAllButton = screen.getByText('Clear All');
    fireEvent.click(clearAllButton);

    // After clearing the selected category
    await waitFor(() => {
      const removedCategoryTag = screen.queryByTestId(`category-tag-${categoryToSelect}`);
      expect(removedCategoryTag).toBeNull();
    });
  });
});
