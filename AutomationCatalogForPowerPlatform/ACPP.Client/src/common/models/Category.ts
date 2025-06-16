// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SortProperty } from './Request';
import { SolutionTemplateCard } from './SolutionTemplateCard';

/**
 * Represents a category.
 */
export interface CategoryData {
  /**
   * The title of the category.
   */
  categoryTitle: string;

  /**
   * The sort order of the category in the list of categories.
   */
  categorySortOrder: number;

  /**
   * The icon or image that represents the category.
   */
  categoryIcon: string;
}

/**
 * Represents a request for retrieving information about categories.
 */
export interface CategoryRequest {
  /**
   * The list of attributes/fields to return. If not provided, all fields will be returned.
   */
  fields?: string[];

  /**
   * The sort attribute/field for the returned categories.
   */
  sortProperty?: SortProperty;
}

export interface CategoryCard {
  categoryTitle: string;
  cards: SolutionTemplateCard[];
}

