import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

import breakpoints from '../../common/helpers/Breakpoints';

export const useStyles = makeStyles({
  cursorHover: {
    ":hover": {
      cursor: 'pointer'
    }
  },
  title: {
    ...shorthands.margin(0, 0, '12px'),
  },
  description: {
    ...shorthands.margin(0, 0, '12px'),
  },
  text: {
    ...shorthands.margin(0),
  },
  grayText: {
    color: tokens.colorNeutralForeground3,
  },
  caption: {
    marginBottom: '2px',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
  },
  cardContentFlex: {
    ...shorthands.gap('4px'),
    display: 'flex',
    flexDirection: 'column',
  },
  footerText: {
    width: 'max-content'
  },
  cardFooter: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardFooterButton: {
    ...shorthands.outline('transparent'),
    ...shorthands.borderStyle('none'),
    ...shorthands.borderRadius('2px'),
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    ':hover': {
      color: 'rgb(91, 95, 199)',
      backgroundColor: 'transparent'
    }
  },
  clicksIcon: {
    verticalAlign: 'middle',
  },
  noOfClicks: {
    verticalAlign: 'middle',
    marginRight: '5px',
    paddingLeft: '10px',
  },
  maxContentWidth: {
    ...breakpoints.sm({
      width: 'max-content'
    })
  }
});
