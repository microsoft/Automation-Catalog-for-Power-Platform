// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  filterCategory: {
    display: 'flex',
  },
  menuIcon: {
    fontSize: '15px',
  },
  menuButton: {
    fontWeight: 400,
    fontSize: '14px !important',
    lineHeight: '20px !important',
  },
  filterSelectedCount: {
    ...shorthands.padding(0, 0, 0, '5px'),
  },
  filterCategoryPopover: {
    minWidth: '187px !important',
    ...shorthands.padding('20px', '10px'),
    '& > *:first-child': {
      maxHeight: '208px',
      overflowY: 'scroll',
    },
  },
  menuItemCheckbox: {
    ...shorthands.padding('10px'),
  },
  menuDismissButton: {
    ...shorthands.padding('5px', 0, '10px', 0),
    '& > button': {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '16px',
      color: tokens.colorNeutralForeground2BrandHover,
      '& > span': {
        width: '14px',
        height: '14px',
        ...shorthands.padding('2px', 0, 0, 0),
      },
    },
  },
  menuDismissButtonDisabled: {
    '& > button': {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  menuDismissIcon: {
    color: tokens.colorNeutralForeground2BrandHover,
  },
  menuDismissIconDisabled: {
    color: tokens.colorNeutralForegroundDisabled,
  },
  menuApplyButton: {
    ...shorthands.margin(0, 'auto !important'),
    textAlign: 'center',
    '& > button': {
      width: '175px',
      height: '32px',
    },
  },
});

