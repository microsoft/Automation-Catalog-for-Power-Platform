import { makeStyles, shorthands } from '@fluentui/react-components';

import breakpoints from '../../../common/helpers/Breakpoints';

export const useStyles = makeStyles({
    cardHeader: {
        ...shorthands.margin('-5%', '-5%', 0, '-5%'),
        height: '55%',
        ...breakpoints.sm({
            ...shorthands.margin('inherit')
        })
    },
    cursorHover: {
        ":hover": {
            cursor: 'pointer'
        }
    },
    cardHeaderImage: {
        ...breakpoints.sm({ display: 'none' })
    },
    cardHeaderIcon: {
        ...shorthands.borderRadius('4px'),
        height: '32px',
        display: 'none',
        ...breakpoints.sm({ display: 'initial' }),
    }
});
