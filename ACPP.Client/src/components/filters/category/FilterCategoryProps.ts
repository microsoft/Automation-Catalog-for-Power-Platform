/**
 * Represents the props for a filter category component.
 * @interface FilterCategoryProps
 */
export interface FilterCategoryProps extends FilterCategoryBaseProps {
  /**
   * A callback function triggered when filter values are selected or unselected.
   * @param filterValues - An array of selected filter values.
   */
  onChecked: (filterValues: string[]) => void;
}

/**
 * Represents the base props for a filter category component.
 * @interface FilterCategoryBaseProps
 */
export interface FilterCategoryBaseProps {
  /**
   * An array of available filter values to select from.
   */
  filters: string[];

  /**
   * An array of default selected filter values to display.
   */
  defaultOptions?: string[];

  /**
   * A flag indicating whether the categories are in a loading state or not.
   */
  loading?: boolean;
}
