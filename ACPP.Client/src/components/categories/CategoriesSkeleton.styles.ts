import { makeStyles } from '@fluentui/react-components';
import breakpoints from '../../common/helpers/Breakpoints';

export const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    halign: 'center',
  },
  cardWrapper: {
    flexDirection: 'column',
  },
  card: {
    width: '172px',
    height: '205px',
    ...breakpoints.xl({
      width: '151px',
      height: '187px',
    }),
    ...breakpoints.lg({
      width: '140px',
      height: '187px',
    }),
  },
  skeletonItem: {
    height: '100px',
    width: '100%',
  },
  cardPreview: {
    marginTop: '40px',
  },
});
