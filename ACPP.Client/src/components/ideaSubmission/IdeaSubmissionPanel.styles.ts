import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.margin('0%', '2%'),
  },
  card: {
    width: '100%',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding('10px'),
    justifyContent: 'center',
    alignItems: 'center',
    ...shorthands.gap('10px'),
    alignSelf: 'stretch',
    ...shorthands.borderRadius('6px'),
    backgroundColor: tokens.colorPaletteLightTealBackground2,
    ":hover": {
      backgroundColor: tokens.colorPaletteLightTealBorderActive
    }
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: '45px',
    height: '45px',
    ...shorthands.margin(0, '10px', 0, 0),
  },
  title: {
    lineHeight: '22px',
    ...shorthands.margin('auto', 0),
  },
  rightArrowIcon: {
    ...shorthands.margin('auto', '10px'),
  },
});
