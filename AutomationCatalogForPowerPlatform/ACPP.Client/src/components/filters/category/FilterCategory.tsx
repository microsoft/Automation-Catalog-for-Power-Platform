// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useMemo, useState } from 'react';
import {
  Button,
  Label,
  Menu,
  MenuButton,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuProps,
  MenuTrigger,
  Spinner,
} from '@fluentui/react-components';
import {
  bundleIcon,
  Checkmark16Filled,
  Checkmark16Regular,
  ChevronDownFilled,
  ChevronDownRegular,
  Dismiss16Filled,
  Dismiss16Regular,
} from '@fluentui/react-icons';
import { useTranslation } from 'react-i18next';
import { useScreenSize } from '../../../hooks/useScreenSize';
import { screenSizes } from '../../../common/helpers/Constants';
import FilterCategoryDrawer from './FilterCategoryDrawer';
import { FilterCategoryProps } from './FilterCategoryProps';
import { useStyles } from './FilterCategory.styles';

const DismissIcon = bundleIcon(Dismiss16Filled, Dismiss16Regular);
const CheckmarkIcon = bundleIcon(Checkmark16Filled, Checkmark16Regular);
const ChevronDownIcon = bundleIcon(ChevronDownFilled, ChevronDownRegular);

const FilterCategory: React.FC<FilterCategoryProps> = ({
  filters,
  defaultOptions,
  onChecked,
  loading,
}: FilterCategoryProps) => {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultOptions ?? []);
  const [checkedItems, setCheckedItems] = useState<string[]>(defaultOptions ?? []);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [enableDeselectAll, setEnableDeselectAll] = useState<boolean>(true);

  const { t } = useTranslation('SearchPage');
  const {width} = useScreenSize();
  const styles = useStyles();

  useMemo(() => {
    setSelectedCategories(defaultOptions ?? []);
    setCheckedItems(defaultOptions ?? []);
  }, [defaultOptions]);

  useMemo(() => {
    if (isDrawerOpen) {
      setCheckedItems(defaultOptions ?? []);
      setIsDirty(false);
    }
  }, [defaultOptions, isDrawerOpen]);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const onMenuOpenChange: MenuProps['onOpenChange'] = (e, data) => {
    if (width < screenSizes.lg) {
      toggleDrawer();
    } else {
      if (data.open) {
        setCheckedItems(defaultOptions ?? []);
        setIsDirty(false);
      }
      setOpen(data.open);
    }
  };

  const onCheckedValueChange: MenuProps['onCheckedValueChange'] = (e, { name, checkedItems }) => {
    setCheckedItems(checkedItems);
    setIsDirty(true);
    if (checkedItems.length === 0) {
      setEnableDeselectAll(false);
    } else {
      setEnableDeselectAll(true);
    }
  };

  const onClearFilters = (): void => {
    if (checkedItems.length > 0) {
      setIsDirty(true);
      setCheckedItems([]);
      toggleDeselectAll();
    }
  };

  const isApplyDisabled = (): boolean => {
    return checkedItems.length > 0 ? false : !isDirty;
  };

  const toggleDeselectAll = () => {
    setEnableDeselectAll(!enableDeselectAll);
  };

  const onSelectAllFilters = (): void => {
    setCheckedItems(filters);
    toggleDeselectAll();
  };

  const onApplyFilters = () => {
    if (checkedItems.length === 0) {
      setIsDirty(false);
    }
    setSelectedCategories(checkedItems);
    onChecked(checkedItems);
    setOpen(false);
  };

  const renderFilterItems = () => {
    return filters.map((filter: string, index: number) => (
      <MenuItemCheckbox key={index} className={styles.menuItemCheckbox} name="category" value={filter}>
        {filter}
      </MenuItemCheckbox>
    ));
  };

  return (
    <div>
      <div className={styles.filterCategory}>
        <Menu
          checkedValues={{ category: checkedItems }}
          onCheckedValueChange={onCheckedValueChange}
          open={open}
          onOpenChange={onMenuOpenChange}
        >
          <MenuTrigger disableButtonEnhancement>
            <MenuButton
              appearance="subtle"
              menuIcon={<ChevronDownIcon className={styles.menuIcon} />}
              className={styles.menuButton}
            >
              {t('category')}
              {selectedCategories.length > 0 && (
                <Label className={styles.filterSelectedCount}>{`(${selectedCategories.length})`}</Label>
              )}
            </MenuButton>
          </MenuTrigger>
          <MenuPopover className={styles.filterCategoryPopover}>
            {loading ? (
              <Spinner size="small" />
            ) : (
              <>
                <MenuList>{renderFilterItems()}</MenuList>
                <div>
                  <div className={`${styles.menuDismissButton}`}>
                    {enableDeselectAll
                      ? <Button
                        appearance="transparent"
                        icon={
                          <DismissIcon
                            className={styles.menuDismissIcon}
                          />
                        }
                        onClick={onClearFilters}
                      >
                        {t('deselectAll')}
                      </Button>
                      : <Button
                        appearance="transparent"
                        icon={
                          <CheckmarkIcon
                            className={styles.menuDismissIcon}
                          />
                        }
                        onClick={onSelectAllFilters}
                      >
                        {t('selectAll')}
                      </Button>
                    }
                  </div>
                  <div className={styles.menuApplyButton}>
                    <Button appearance="primary" disabled={isApplyDisabled()} onClick={onApplyFilters}>
                      {t('apply')}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </MenuPopover>
        </Menu>
      </div>
      <div>
        {width < screenSizes.lg && (
          <FilterCategoryDrawer
            filters={filters}
            isOpen={isDrawerOpen}
            defaultOptions={checkedItems}
            loading={loading}
            toggleDrawer={toggleDrawer}
            onCheckedValueChange={onCheckedValueChange}
            onApplyFilters={onApplyFilters}
            onClearFilters={onClearFilters}
            isApplyDisabled={isApplyDisabled}
            enableDeselectAll={enableDeselectAll}
            onSelectAllFilters={onSelectAllFilters}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(FilterCategory);

