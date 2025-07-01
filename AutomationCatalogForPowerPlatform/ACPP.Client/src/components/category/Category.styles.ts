// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import breakpoints from '../../common/helpers/Breakpoints';
import { CATEGORY_CARD_WIDTH_DEFAULT, CATEGORY_CARD_WIDTH_LG, CATEGORY_CARD_WIDTH_XL } from '../../common/helpers/Constants';

export const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: CATEGORY_CARD_WIDTH_DEFAULT,
    height: '205px',
    ...shorthands.padding('16px', '16px', 0, '16px'),
    boxShadow: 'rgb(0 0 0 / 14%) 0px 1px 2px, rgb(0 0 0 / 12%) 0px 0px 2px',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground2,
      boxShadow: 'rgb(0 0 0 / 14%) 0px 8px 16px, rgb(0 0 0 / 12%) 0px 0px 2px',
    },
    ...breakpoints.xl({
      minWidth: CATEGORY_CARD_WIDTH_XL,
      height: '187px',
    }),
    ...breakpoints.lg({
      minWidth: CATEGORY_CARD_WIDTH_LG,
      height: '187px',
    }),
  },
  cardPreview: {
    ...shorthands.margin('0px !important', 'auto !important'),
    textAlign: 'center',
    alignContent: 'center',
    width: '140px',
    height: '123px',
    ...breakpoints.xl({
      width: '119px',
      height: '100px',
    }),
    ...breakpoints.lg({
      width: '119px',
      height: '100px',
    }),
  },
  cardHeader: {
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px',
    flexGrow: 1,
    ...shorthands.margin(0, 'auto !important'),
  },
  text: {
    ...shorthands.overflow('hidden'),
    display: 'block',
    width: '135px',
    ...breakpoints.xl({
      width: '120px',
    }),
    ...breakpoints.lg({
      width: '105px',
    }),
  },
  smallRadius: {
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
});

