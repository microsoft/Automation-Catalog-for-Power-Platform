// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Represents the properties for the CardCarouselHeader component.
 * @interface CardCarouselHeaderProps
 */
export interface CardCarouselHeaderProps {

    /**
    * Search query to be used for navigation to search page on "See all" button click
    */
    searchQuery?: string;

    /**
    * Selected categories to be used for navigation to search page on "See all" button click
    */
    searchSelectedCategories?: string[];

    /**
     * The title shown for the CardCarouselHeader component.
     */
    isLeftButtonDisabled?: boolean;

    /**
     * The title shown for the CardCarouselHeader component.
     */
    isRightButtonDisabled?: boolean;

    /**
     * The title shown for the CardCarouselHeader component.
     */
    onLeftButtonClick?: Function;

    /**
     * The title shown for the CardCarouselHeader component.
     */
    onRightButtonClick?: Function;

    /**
    * If the CardCarouselHeader type is accordion, this property determines if the accordion is open or closed.
    */
    isOpen?: boolean;

    /**
     * A CSS class name to apply to the CardCarouselHeader component.
     */
    classname?: string;
}

