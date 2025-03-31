export interface ISearchBarProps {

    // Optional value for selected categories
    selectedCategories?: string[];

    // Optional className for custom styling
    className?: string;

    // Optional value text
    initialValue?: string;

    // Update search query in search page
    updateSearchQuery?: (query: string) => void;
}