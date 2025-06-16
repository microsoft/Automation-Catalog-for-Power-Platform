// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MenuCheckedValueChangeData, MenuCheckedValueChangeEvent } from '@fluentui/react-components';

/**
 * Represents the props of the FilterCategoryDrawer component.
 * @interface FilterCategoryDrawerProps
 */
export interface FilterCategoryDrawerProps {
  /**
   * Whether the drawer is currently open.
   */
  isOpen: boolean;

  /**
   * Function to toggle the drawer open or closed.
   */
  toggleDrawer: () => void;

  /**
   * Function to handle changes to the checked values in the menu.
   * @param e - The event that triggered the change.
   * @param data - The new checked values.
   */
  onCheckedValueChange: (e: MenuCheckedValueChangeEvent, data: MenuCheckedValueChangeData) => void;

  /**
   * Function to apply the selected filters.
   */
  onApplyFilters: () => void;

  /**
   * Function to clear all selected filters.
   */
  onClearFilters: () => void;

  /**
   * Function to select all filters.
   */
  onSelectAllFilters: () => void;

  /**
   * Function to determine whether the apply button should be disabled.
   */
  isApplyDisabled: () => boolean;

  /**
   * Function to determine whether the clear button should be disabled.
   */
  enableDeselectAll: boolean;
}

