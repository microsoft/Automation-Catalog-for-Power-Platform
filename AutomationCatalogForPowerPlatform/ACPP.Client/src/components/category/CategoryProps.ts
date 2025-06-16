// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CategoryData } from '../../common/models/Category';

// Interface to define the properties for the Category component
export interface CategoryProps {
  /**
   * Contains details about the category
   */
  category: CategoryData;

  /**
   * Callback function to handle click events on the Category component
   */
  onClick?: (e) => void;
}

