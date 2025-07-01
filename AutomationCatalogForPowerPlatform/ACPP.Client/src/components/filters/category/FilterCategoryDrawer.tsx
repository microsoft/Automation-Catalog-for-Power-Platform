// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { Body1Strong, Button, MenuItemCheckbox, MenuList, Spinner } from '@fluentui/react-components';
import { useTranslation } from 'react-i18next';
import Drawer from '../../../common/controls/Drawer/Drawer';
import { screenSizes } from '../../../common/helpers/Constants';
import { useScreenSize } from '../../../hooks/useScreenSize';
import { FilterCategoryDrawerProps } from './FilterCategoryDrawerProps';
import { FilterCategoryBaseProps } from './FilterCategoryProps';
import { useStyles } from './FilterCategoryDrawer.styles';

const FilterCategoryDrawer: React.FC<FilterCategoryBaseProps & FilterCategoryDrawerProps> = ({
  filters,
  defaultOptions,
  loading,
  isOpen,
  toggleDrawer,
  onCheckedValueChange,
  onApplyFilters,
  onClearFilters,
  onSelectAllFilters,
  isApplyDisabled,
  enableDeselectAll,
}) => {
  const { t } = useTranslation('SearchPage');
  const {width} = useScreenSize();
  const styles = useStyles();

  const onDrawerApplyFilters = () => {
    toggleDrawer();
    onApplyFilters();
  };

  const renderMenuItems = () => {
    return filters.map((filter: string, index: number) => (
      <MenuItemCheckbox key={index} name="category" value={filter} className={styles.menuItemCheckBox}>
        {filter}
      </MenuItemCheckbox>
    ));
  };

  return (
    <div>
      <Drawer open={isOpen} onClose={toggleDrawer} direction="bottom" size={width < screenSizes.sm ? 350 : 245}>
        <div className={styles.scrollContainer}>
          <div className={styles.title}>
            <Body1Strong>{t('filterByCategory')}</Body1Strong>
          </div>
          <div>
            {loading ? (
              <Spinner size="small" />
            ) : (
              <MenuList checkedValues={{ category: defaultOptions ?? [] }} onCheckedValueChange={onCheckedValueChange}>
                {renderMenuItems()}
              </MenuList>
            )}
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          {enableDeselectAll
            ? <Button onClick={onClearFilters}>
              {t('deselectAll')}
            </Button>
            : <Button onClick={onSelectAllFilters}>
              {t('selectAll')}
            </Button>
          }
          <Button appearance="primary" onClick={onDrawerApplyFilters} disabled={isApplyDisabled()}>
            {t('apply')}
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default React.memo(FilterCategoryDrawer);

