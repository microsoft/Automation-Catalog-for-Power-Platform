import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test/test-utils';
import Category from './Category';

describe('Category Component', () => {
  const mockCategory = {
    categorySortOrder: 1,
    categoryTitle: 'Example Category',
    categoryIcon: 'example.png',
  };

  it('renders category title and image preview', () => {
    // Render the Category component with mock data
    renderWithProviders(<Category category={mockCategory} />);

    // Find the category title text in the rendered component
    const categoryTitle = screen.getByText('Example Category');
    expect(categoryTitle).toBeInTheDocument();

    // Find the image element by its alt text
    const image = screen.getByAltText('Example Category');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'example.png');
  });

  it('triggers onClick when clicked', () => {
    // Create a mock onClick function
    const mockOnClick = jest.fn();

    // Render the Category component with mock data and the mock onClick function
    renderWithProviders(<Category category={mockCategory} onClick={mockOnClick} />);

    // Simulate a click event on the Card component
    const card = screen.getByTestId('categoryCard');
    fireEvent.click(card);

    // Check if the onClick function was called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
