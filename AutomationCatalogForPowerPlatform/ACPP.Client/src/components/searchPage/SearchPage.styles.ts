import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

import breakpoints from '../../common/helpers/Breakpoints';

export const useStyles = makeStyles({
  bg: {
    ...breakpoints.sm({
      backgroundColor: tokens.colorNeutralBackground2
    })
  },
  search: {
    display: 'inherit',
    ...shorthands.padding('2%', '4%'),
    ...shorthands.gap('1.5em')
  },
  searchHeader: {
    display: 'flex',
    ...shorthands.margin('2%', '5%', '1%', '3%')
  },
  backBtn: {
    color: tokens.colorNeutralForegroundOnBrand,
    ...breakpoints.md({
      display: 'none'
    })
  },
  searchBar: {
    marginLeft: 'auto',
    width: '50%',
    ...breakpoints.lg({
      width: '70%',
    }),
    ...breakpoints.md({
      width: '100%',
      ...shorthands.margin('auto')
    })
  },
  searchSpan: {
    marginLeft: 'auto',
    ...breakpoints.md({
      display: 'none'
    })
  },
  searchFilter: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.gap('2px')
  },
  searchFilterText: {
    ...shorthands.padding('5px', 0, 0, 0),
    ...shorthands.margin(0, '20px', 0, 0),
  },
  searchFilterResults: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.gap('2px')
  },
  selectedCategoriesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...shorthands.gap('10px')
  },
  tag: {
    ...shorthands.padding('5px', '8px'),
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 0px 1px, rgba(0, 0, 0, 0.14) 0px 0px 2px',
    backgroundColor: tokens.colorNeutralBackground4,
    '&:hover': {
      boxShadow: '0 0 2px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.14)',
      backgroundColor: tokens.colorNeutralBackground4Hover,
    },
  },
  tagButton: {
    backgroundColor: 'inherit',
    '&:hover': {
      backgroundColor: 'inherit',
    },
    '&:active': {
      backgroundColor: 'inherit',
    },
  },
});
