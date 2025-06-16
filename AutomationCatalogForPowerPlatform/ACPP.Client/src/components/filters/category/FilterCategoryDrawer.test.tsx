// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../test/test-utils';
import FilterCategoryDrawer from './FilterCategoryDrawer';

describe('FilterCategoryDrawer Component', () => {
  // Define mock props for testing
  const mockFilters = ['Filter 1', 'Filter 2', 'Filter 3'];
  const mockDefaultOptions = ['Filter 1'];
  const mockLoading = false;
  const mockIsOpen = true;
  const mockToggleDrawer = jest.fn();
  const mockOnCheckedValueChange = jest.fn();
  const mockOnApplyFilters = jest.fn();
  const mockOnClearFilters = jest.fn();
  const mockIsApplyDisabled = jest.fn();
  const mockIsDeselectAllDisabled = jest.fn();

  it('renderWithProviderss without errors', () => {
    renderWithProviders(
      <FilterCategoryDrawer
        filters={mockFilters}
        defaultOptions={mockDefaultOptions}
        loading={mockLoading}
        isOpen={mockIsOpen}
        toggleDrawer={mockToggleDrawer}
        onCheckedValueChange={mockOnCheckedValueChange}
        onApplyFilters={mockOnApplyFilters}
        onClearFilters={mockOnClearFilters}
        isApplyDisabled={mockIsApplyDisabled}
        enableDeselectAll={!mockIsDeselectAllDisabled}
        onSelectAllFilters={() => { }}
      />
    );
  });

  it('displays filter categories', () => {
    renderWithProviders(
      <FilterCategoryDrawer
        filters={mockFilters}
        defaultOptions={mockDefaultOptions}
        loading={mockLoading}
        isOpen={mockIsOpen}
        toggleDrawer={mockToggleDrawer}
        onCheckedValueChange={mockOnCheckedValueChange}
        onApplyFilters={mockOnApplyFilters}
        onClearFilters={mockOnClearFilters}
        isApplyDisabled={mockIsApplyDisabled}
        enableDeselectAll={!mockIsDeselectAllDisabled}
        onSelectAllFilters={() => { }}
      />
    );

    // Check if filter categories are displayed
    mockFilters.forEach((filter) => {
      const filterElement = screen.getByText(filter);
      expect(filterElement).toBeInTheDocument();
    });
  });

  it('calls onClearFilters when "Deselect All" button is clicked', () => {
    renderWithProviders(
      <FilterCategoryDrawer
        filters={mockFilters}
        defaultOptions={mockDefaultOptions}
        loading={mockLoading}
        isOpen={mockIsOpen}
        toggleDrawer={mockToggleDrawer}
        onCheckedValueChange={mockOnCheckedValueChange}
        onApplyFilters={mockOnApplyFilters}
        onClearFilters={mockOnClearFilters}
        isApplyDisabled={mockIsApplyDisabled}
        enableDeselectAll={!mockIsDeselectAllDisabled}
        onSelectAllFilters={() => { }}
      />
    );

    const deselectAllButton = screen.getByText('Deselect All');
    fireEvent.click(deselectAllButton);

    // Check if onClearFilters callback was called
    expect(mockOnClearFilters).toHaveBeenCalled();
  });

  it('calls onDrawerApplyFilters when "Apply" button is clicked', () => {
    renderWithProviders(
      <FilterCategoryDrawer
        filters={mockFilters}
        defaultOptions={mockDefaultOptions}
        loading={mockLoading}
        isOpen={mockIsOpen}
        toggleDrawer={mockToggleDrawer}
        onCheckedValueChange={mockOnCheckedValueChange}
        onApplyFilters={mockOnApplyFilters}
        onClearFilters={mockOnClearFilters}
        isApplyDisabled={mockIsApplyDisabled}
        enableDeselectAll={!mockIsDeselectAllDisabled}
        onSelectAllFilters={() => { }}
      />
    );

    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);

    // Check if onDrawerApplyFilters callback was called
    expect(mockOnApplyFilters).toHaveBeenCalled();

    // Check if toggleDrawer callback was called
    expect(mockToggleDrawer).toHaveBeenCalled();
  });
});

