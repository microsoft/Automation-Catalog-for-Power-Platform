// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Interface to define the properties required to be set while navigating to /Search
 */
export interface ISearchState {
    /**
     * Query text to be set in the search bar
     */
    queryText: string;

    /**
     * Categories to be set initially
     */
    selectedCategories: string[];
}
