// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SearchBox } from '@fluentui/react-search-preview';

import { ISearchBarProps } from './ISearchBarProps';
import { Field } from '@fluentui/react-components';
import { Warning12Filled, Warning12Regular, bundleIcon } from '@fluentui/react-icons';
import { useStyles } from './SearchBar.styles';

const WarningIcon = bundleIcon(Warning12Filled, Warning12Regular);

export const SearchBar: React.FC<ISearchBarProps> = forwardRef(({ selectedCategories, className, initialValue, updateSearchQuery }: ISearchBarProps, ref) => {

  const { t } = useTranslation("SearchBar");
  const [searchQuery, setSearchQuery] = React.useState<string>(initialValue ?? "");
  const [valid, setValid] = React.useState<boolean>(true);
  const navigate = useNavigate();
  const styles = useStyles();

  React.useEffect(() => {
    setSearchQuery(initialValue ?? "");
    if (initialValue) {
      if (initialValue.length < 3)
        setValid(false);
      else
        setValid(true);
    }
  }, [initialValue]);

  const handleSearch = () => {
    if (searchQuery.length > 2) {
      setValid(true);
      if (window.location.pathname !== '/Search')
        navigate('/Search', { state: { queryText: searchQuery, selectedCategories: selectedCategories } });
      else if (typeof updateSearchQuery === 'function') {
        updateSearchQuery(searchQuery);
      }
    } else {
      setValid(false);
      if (searchQuery.length === 0 && window.location.pathname === '/Search' && typeof updateSearchQuery === 'function') {
        updateSearchQuery('');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <Field
      validationState={valid ? "none" : "error"}
      validationMessage={valid ? <></> : <span className={styles.validationStyles}>Input requires at least 3 characters.</span>}
      validationMessageIcon={valid ? <></> : < WarningIcon className={styles.validationStyles} />}
      className={className}
      role="search">
        <SearchBox
        placeholder={t("defaultSearchHint")}
        aria-label="Search Bar"
        autoComplete="on"
        id="searchQuery"
        size="medium"
        onChange={(e) => { setSearchQuery((e.target as HTMLInputElement).value); }}
        onKeyDown={handleKeyPress}
        data-testid="searchbar"
        defaultValue={searchQuery}
        value={searchQuery}
        className={styles.searchBar}
      />
    </Field>
      );
});
