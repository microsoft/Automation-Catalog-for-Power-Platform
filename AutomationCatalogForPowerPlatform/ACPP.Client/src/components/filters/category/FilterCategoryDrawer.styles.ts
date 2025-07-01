// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, shorthands } from '@fluentui/react-components';
import breakpoints from '../../../common/helpers/Breakpoints';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  scrollContainer: {
    maxHeight: '100%',
    height: '115px',
    overflowY: 'scroll',
    ...shorthands.padding('5px', '15px', '5px', 0),
    ...breakpoints.sm({
      height: '210px',  
    })
  },
  title: {
    ...shorthands.margin('inherit', '8px', '15px', '5px'),
  },
  menuItemCheckBox: {
    backgroundColor: 'transparent',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
    ...shorthands.margin('10px', '0', '0', '5px'),
  },
});

