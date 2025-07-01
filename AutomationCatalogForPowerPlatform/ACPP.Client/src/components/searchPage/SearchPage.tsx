// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, InteractionTag, InteractionTagPrimary, InteractionTagSecondary, TagGroup, TagGroupProps, Text, mergeClasses } from '@fluentui/react-components';
import { bundleIcon, ChevronLeft12Filled, ChevronLeft12Regular } from '@fluentui/react-icons';
import { DisplayCanvas } from '../../common/controls/DisplayCanvas/DisplayCanvas';
import { RootCanvas } from '../../common/controls/RootCanvas/RootCanvas';
import { screenSizes } from '../../common/helpers/Constants';
import { useScreenSize } from '../../hooks/useScreenSize';
import FilterCategory from '../filters/category/FilterCategory';
import { SearchBar } from '../searchBar/SearchBar';
import { useStyles } from './SearchPage.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchResults from './searchResults/SearchResults';
import { ISearchPageProps } from './ISearchPageProps';
import { useGetAllCards } from '../../hooks/useGetAllCards';
import { AppContext } from '../../common/contexts/AppContext';

const ChevronLeftIcon = bundleIcon(ChevronLeft12Filled, ChevronLeft12Regular);

const SearchPage: React.FC<ISearchPageProps> = (props: ISearchPageProps) => {
  const { t } = useTranslation(['SearchPage', 'Common']);
  const { width } = useScreenSize();
  const styles = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { queryText: initialQueryText, selectedCategories: initialCategories } = state;
  const [searchQuery, setSearchQuery] = React.useState(initialQueryText ?? '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories ?? []);
  const { appEnv } = useContext(AppContext);
  const { isError: cardsDataIsError, isLoading: cardsDataIsLoading, data: cardsData } = useGetAllCards(appEnv!);

  const categories: string[] = useMemo(() => {

    if (!cardsDataIsError && !cardsDataIsLoading && cardsData && cardsData.length !== 0) {
      const categories = cardsData.map((card) => card.cardCategory);
      // Push the "Featured" category to the list
      categories.push(t('Common:featured'));
      return [...new Set(categories)].sort((a, b) => a.localeCompare(b));
    }
    return [];
  }, [cardsData, cardsDataIsError, cardsDataIsLoading]);

  const updateSearchQuery = (queryText: string) => {
    setSearchQuery(queryText);
    setSelectedCategories([]);
  }

  const onCategoryChecked = (filteredCategories: string[]) => {
    setSelectedCategories(filteredCategories);
    setSearchQuery('');
  };

  const onCategoryDismiss: TagGroupProps['onDismiss'] = (_e, { value }) => {
    setSelectedCategories([...selectedCategories].filter((category: string) => category !== value));
  };

  const onClearAll = () => {
    setSelectedCategories([]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <RootCanvas className={styles.bg}>
      <div className={mergeClasses(styles.searchHeader, styles.bg)}>
        <Button className={styles.backBtn} icon={<ChevronLeftIcon />} iconPosition="before" appearance="transparent" onClick={() => { navigate(-1); }}>{t("Common:back")}</Button>
        <SearchBar className={styles.searchBar} initialValue={searchQuery} selectedCategories={selectedCategories} updateSearchQuery={updateSearchQuery} />
        <span className={styles.searchSpan} />
      </div>
      <DisplayCanvas className={mergeClasses(styles.search, styles.bg)}>
        <div className={styles.searchFilter}>
          <div className={styles.searchFilterText}>
            <Text>{t('filters')}:</Text>
          </div>
          <FilterCategory
            filters={categories}
            defaultOptions={selectedCategories}
            onChecked={onCategoryChecked}
          />
        </div>
        {width > screenSizes.lg && (
          <div className={styles.searchFilterResults}>
            <div className={styles.selectedCategoriesContainer}>
              {selectedCategories.map((category: string, index: number) => (
                <TagGroup onDismiss={onCategoryDismiss} aria-label="selected categories" key={index}>
                  <InteractionTag
                    value={category}
                    key={index}
                    className={styles.tag}
                    data-testid={`category-tag-${category}`}
                  >
                    <InteractionTagPrimary
                      id={`dismiss-primary-${category}`}
                      hasSecondaryAction
                      className={styles.tagButton}
                    >
                      {category}
                    </InteractionTagPrimary>
                    <InteractionTagSecondary
                      id={`dismiss-secondary-${category}`}
                      aria-label="remove"
                      aria-labelledby={`dismiss-primary-${category} dismiss-secondary-${category}`}
                      className={styles.tagButton}
                    />
                  </InteractionTag>
                </TagGroup>
              ))}
              {selectedCategories.length > 0 && (
                <Button appearance="subtle" onClick={onClearAll}>
                  {t('clearAll')}
                </Button>
              )}
            </div>
          </div>
        )}
        <SearchResults selectedCategories={selectedCategories} inputSearch={searchQuery} allCards={cardsData} />
      </DisplayCanvas>
    </RootCanvas>
  );
};

export default React.memo(SearchPage);

