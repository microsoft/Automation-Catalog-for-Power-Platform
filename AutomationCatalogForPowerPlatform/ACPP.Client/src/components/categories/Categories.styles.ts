import { makeStyles, shorthands } from '@fluentui/react-components';

export const useStyles = makeStyles({
  root: {
    ...shorthands.gap('16px'),
    display: 'flex',
    flexDirection: 'column'
  },
  noMargin: {
    ...shorthands.margin(0)
  },
  section: {
    width: 'fit-content',
  },
  title: {
    ...shorthands.margin(0, 0, '12px'),
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
  },
  accordion: {
    marginLeft: '-1.5%'
  }
});
