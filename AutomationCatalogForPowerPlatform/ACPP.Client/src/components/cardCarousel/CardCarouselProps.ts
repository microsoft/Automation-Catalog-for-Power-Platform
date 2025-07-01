// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SolutionTemplateCard } from "../../common/models/SolutionTemplateCard";

/**
 * Represents the properties for the CardCarousel component.
 * @interface CardCarouselProps
 */
export interface CardCarouselProps {

  /**
   * The title shown for the CardCarousel component.
   */
  headerTitle: string;

  /**
 * A CSS class name to apply to the CardCarousel title.
 */
  headerTitleClassname?: string;

  /**
   * Flag to determine if the carousel type an accordion
   */
  typeIsAccordion?: boolean;

  /**
 * The cards to be shown in the CardCarousel component.
 */
  cards: SolutionTemplateCard[];

  /**
 * Flag to determine the display cards in the carousel should be of type Image or not
 */
  cardIsImage?: boolean;

  /**
 * A CSS class name to apply to the Carousel part of the component.
 */
  carouselClassname?: string;

  /**
    * Search query to be used for navigation to search page on "See all" button click
    */
  searchQuery?: string;

  /**
 * Selected categories to be used for navigation to search page on "See all" button click
 */
  searchSelectedCategories?: string[];

  /**
 * A CSS class name to apply to the CardCarousel component.
 */
  classname?: string;

  /**
* If the CardCarousel type is accordion, this property determines if the accordion is open or closed.
*/
  isOpen?: boolean;

}

