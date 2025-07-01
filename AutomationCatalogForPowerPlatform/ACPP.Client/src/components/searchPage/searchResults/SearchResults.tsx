// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as React from "react";
import { useStyles } from "./SearchResults.styles";
import DisplayCard from "../../displayCard/DisplayCard";
import { Divider, Spinner, Text } from "@fluentui/react-components";
import { useGetSearchResults } from "../../../hooks/useGetSearchResults";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { screenSizes } from "../../../common/helpers/Constants";
import { useContext, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { EventTypes } from "../../../common/models/LoggingServiceTypes";
import { LoggerContext } from "../../../common/contexts/LoggerContext";
import { SolutionTemplateCard } from "../../../common/models/SolutionTemplateCard";

interface SearchResultProps {
    inputSearch: string;
    selectedCategories: string[];
    allCards?: SolutionTemplateCard[];
}

const SearchResults: React.FC<SearchResultProps> = (props: SearchResultProps) => {
    const { trackEvent, setCurrentPage } = useContext(LoggerContext);
    const { t } = useTranslation(['SearchResults', 'Common']);
    const styles = useStyles();
    const [cards, setCards] = React.useState<SolutionTemplateCard[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const { data: searchCards, isLoading: isSearchLoading, mutate: fireSearchQuery } = useGetSearchResults(props.inputSearch, props.selectedCategories);
    const { width } = useScreenSize();

    useEffect(() => {
        if (props.inputSearch === '') {
            setCards(props.allCards?.filter((card) => {
                // Return true if
                // 1. the card belongs to one of the selected categories
                // 2. "Featured" is one of the selected categories AND the card is a featured card
                // 3. no categories are selected
                return props.selectedCategories?.includes(card.cardCategory)
                    || (props.selectedCategories?.includes(t('Common:featured')) && card.isFeatured)
                    || props.selectedCategories?.length === 0;

            }).sort((a, b) => b.noOfClicks! - a.noOfClicks!) || []);
            setIsLoading(false);
        }
        else {
            setIsLoading(true);
            fireSearchQuery();
        }
    }, [fireSearchQuery, props]);

    useEffect(() => {
        if (!isSearchLoading && searchCards) {
            setCards(props.allCards?.filter((card) => { return searchCards?.includes(card.solutionTemplateUniqueId) }) || []);
            setIsLoading(false);

            if (cards.length === 0) {
                setCurrentPage('searchResultsPage');
                trackEvent("SEARCH_RESULTS_EMPTY", {
                    eventType: EventTypes.APP_EVENT,
                    eventName: "emptySearchResult",
                    eventDetails: {
                        searchQuery: props.inputSearch
                    }
                });
            }
        }
    }, [searchCards, isSearchLoading]);

    return (
        isLoading
            ? <Spinner size="small" />
            : (cards.length === 0)
                ? <Text align="center" className={styles.noSearchResults} data-testid="manage-header">
                    {t('noSearchResults')}
                </Text>
                : width > screenSizes.sm
                    ? <div className={styles.searchResults}>
                        {cards.map((item) => <DisplayCard cardData={item} isImage={false} className={styles.searchCard} />)}
                    </div>
                    : <div className={styles.searchResults}>
                        <Divider />
                        {cards.map((item) => {
                            return <>
                                <DisplayCard cardData={item} isImage={false} className={styles.searchCard} />
                                <Divider />
                            </>
                        })}
                    </div>
    );
};

export default SearchResults;
