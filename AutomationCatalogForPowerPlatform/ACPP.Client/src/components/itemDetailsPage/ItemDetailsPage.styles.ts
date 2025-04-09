import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import breakpoints from '../../common/helpers/Breakpoints';

export const useStyles = makeStyles({
  root: {
    backgroundImage: 'none',
    width: '100vw',
    height: 'fit-content'
  },
  displayCanvas: {
    maxWidth: '100%',
    height: '100%',
    ...shorthands.padding('1%', '5%'),
    ...breakpoints.md({
      backgroundColor: 'none',
      ...shorthands.margin('0%'),
      ...shorthands.padding('2%'),
      boxShadow: `0 0 0, 0 0 0`,
    }),
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginLeft: '0.5%'
  },
  headerDivider: {
    maxWidth: '20px'
  },
  divider: {
    maxWidth: '97%',
    ...shorthands.margin('2.5%'),
  },
  shareToTeams: {
    display: 'inline-block'
  },
  title: {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 600,
    ...shorthands.margin('1%', 0, '1%', 0),
  },
  subtitle: {
    display: 'flex',
    flexDirection: 'column',
  },
  subtitleLine: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    color: tokens.colorNeutralForeground3,
  },
  subtitleLineDivider: {
    maxWidth: '1px'
  },
  subtitleTextLeft: {
    ...shorthands.margin(0, '1%', 0, 0)
  },
  subtitleTextRight: {
    ...shorthands.margin(0, 0, 0, '1%')
  },
  peopleIcon: {
    ...shorthands.margin('0.2%', 0, 0, '1%'),
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.margin('0%', '1%', '0%', '2%'),
  },
  bodyBox: {
    display: 'flex',
    flexDirection: 'row',
    ...breakpoints.lg({
      display: 'flex',
      flexDirection: 'column-reverse',
    }),
  },
  bodyDescription: {
    textAlign: "left",
    fontSize: "14px",
    lineHeight: "20px",
    width: "100%",
    ...shorthands.margin('3%', '0%', '3%', '0%'),
    ...breakpoints.md({
      maxWidth: "100%",
      minWidth: "20%",
    }),
  },
  installedItemButton: {
    marginRight: '8px',
  },
  createButton: {
    width: "fit-content",
  },
  bodyImage: {
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    width: '45%',
    height: "fit-content",
    alignSelf: "center",
    ...breakpoints.lg({
      ...shorthands.margin('2%', '0%', '0%', '0%'),
      width: '70%',
    }),
    ...breakpoints.md({
      display: 'none',
    }),
  },
  bodyVideo: {
    width: '90%',
    height: "fit-content",
    alignSelf: "center",
    ...shorthands.margin('0%', '0%', '0%', '10%'),
    ...breakpoints.lg({
      ...shorthands.margin('2%', '0%', '1%', '2%'),
    }),
    ...breakpoints.md({
      ...shorthands.margin('2%', '0%', '0%', '0%'),
    }),
  },
  relatedItemsDivider: {
    ...shorthands.margin('2%'),
    ...shorthands.padding('2%', '0'),
    width: 'auto'
  },
  relatedItemsTitle: {
    ...shorthands.padding('0', '1%', '0', '2%')
  },
  relatedItemsCarousel: {
    paddingLeft: '1%'
  },
  ideaSubmission: {
    marginTop: '4%'
  }
});