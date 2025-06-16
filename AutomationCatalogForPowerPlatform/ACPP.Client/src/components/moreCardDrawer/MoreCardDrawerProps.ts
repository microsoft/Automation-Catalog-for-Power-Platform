// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SolutionTemplateCard } from '../../common/models/SolutionTemplateCard';

/**
 * Represents the props of the FilterCategoryDrawer component.
 * @interface MoreCardDrawerProps
 */
export interface MoreCardDrawerProps {
  
  /**
   * Card data to be displayed in the drawer
   */
  cardData:SolutionTemplateCard;
  
  /**
   * Whether the drawer is currently open.
   */
  isOpen: boolean;

  /**
   * Function to toggle the drawer open or closed.
   */
  toggleDrawer: () => void;

  /**
   * Default message to be loaded in the compose box.
   */
  message: string;

  /**
   * Flag indicating whether to show a preview of the shared URL.
   */
  preview: boolean;

}

