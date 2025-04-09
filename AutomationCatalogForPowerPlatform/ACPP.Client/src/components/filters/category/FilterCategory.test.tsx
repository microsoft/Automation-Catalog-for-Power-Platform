import { screen, fireEvent, within } from '@testing-library/react';
import { renderWithProviders } from '../../../test/test-utils';
import FilterCategory from './FilterCategory';

describe('FilterCategory Component', () => {
  // Define mock props for testing
  const mockFilters = ['Filter 1', 'Filter 2', 'Filter 3'];
  const mockDefaultOptions = ['Filter 1'];
  const mockOnChecked = jest.fn();
  const mockLoading = false;

  jest.mock('../../../hooks/useScreenSize', () => ({
    useScreenSize: () => ['1280'],
  }));

  it('renders without errors', () => {
    renderWithProviders(
      <FilterCategory
        filters={mockFilters}
        defaultOptions={mockDefaultOptions}
        onChecked={mockOnChecked}
        loading={mockLoading}
      />
    );
  });

  it('displays the category menu button', () => {
    renderWithProviders(
      <FilterCategory
        filters={mockFilters}
        defaultOptions={mockDefaultOptions}
        onChecked={mockOnChecked}
        loading={mockLoading}
      />
    );
    const categoryButton = screen.getByText('Category');
    expect(categoryButton).toBeInTheDocument();
  });

  it('opens the category menu when the button is clicked', () => {
    renderWithProviders(
      <FilterCategory
        filters={mockFilters}
        defaultOptions={mockDefaultOptions}
        onChecked={mockOnChecked}
        loading={mockLoading}
      />
    );
    const categoryButton = screen.getByText('Category');
    fireEvent.click(categoryButton);

    // Check if the menu popover is open
    const menuPopover = screen.getByRole('menu');
    expect(menuPopover).toBeInTheDocument();
  });

  it('applies filters when the Apply button is clicked', () => {
    renderWithProviders(
      <FilterCategory
        filters={mockFilters}
        defaultOptions={mockDefaultOptions}
        onChecked={mockOnChecked}
        loading={mockLoading}
      />
    );
    const categoryButton = screen.getByText('Category');
    fireEvent.click(categoryButton);

    // Check if the menu popover is open
    const menuPopover = screen.getByRole('menu');
    expect(menuPopover).toBeInTheDocument();

    // Select a filter option
    const filterOption = within(menuPopover).getByText('Filter 2');
    fireEvent.click(filterOption);

    // Click the Apply button
    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);

    // Check if the onChecked callback was called with the selected filter
    expect(mockOnChecked).toHaveBeenCalledWith(['Filter 1', 'Filter 2']);
  });

  it('clears filters when the Deselect All button is clicked', () => {
    renderWithProviders(
      <FilterCategory
        filters={mockFilters}
        defaultOptions={mockDefaultOptions}
        onChecked={mockOnChecked}
        loading={mockLoading}
      />
    );
    const categoryButton = screen.getByText('Category');
    fireEvent.click(categoryButton);

    // Check if the menu popover is open
    const menuPopover = screen.getByRole('menu');
    expect(menuPopover).toBeInTheDocument();

    // Select a filter option
    const filterOption = within(menuPopover).getByText('Filter 2');
    fireEvent.click(filterOption);

    // Click the Deselect All button
    const deselectAllButton = screen.getByText('Deselect All');
    fireEvent.click(deselectAllButton);

    // Click the Apply button
    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);

    // Check if the onChecked callback was called with an empty array
    expect(mockOnChecked).toHaveBeenCalledWith([]);
  });
});
