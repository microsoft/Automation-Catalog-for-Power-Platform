import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import breakpoints from '../../common/helpers/Breakpoints';

export const useStyles = makeStyles({
  homeHeader: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          ...shorthands.margin('2%', '5%'),
          ...breakpoints.md({
              ...shorthands.margin('2%', '2%')
          })
      },
      headerText: {
          color: tokens.colorNeutralForegroundOnBrand,
          ...breakpoints.lg({
              display: 'none'
          })
      },
  root: {
    marginBottom: '10px',
    ...shorthands.gap('18px'),
    ...shorthands.padding('27px', 'auto', 'auto', '39px'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '472px',
    ...breakpoints.sm({
      width: '326px',
    }),
  },
  header: {
    fontSize: '18px',
    lineHeight: '24px',
  },
  body: {
    alignSelf: 'stretch',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
  },
  links: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '8px',
  },
  divider: {
    minHeight: 'inherit',
  },
});
