import { makeStyles, shorthands } from '@fluentui/react-components';

import breakpoints from '../../../common/helpers/Breakpoints';

export const useStyles = makeStyles({
    cursorHover: {
        ":hover": {
            cursor: 'pointer'
        }
    },
    cardHeader: {
        display: 'flex',
        ...breakpoints.sm({ display: 'none' })
    },
    cardHeaderImage: {
        display: 'initial',
        ...breakpoints.sm({ display: 'none' })
    },
    displayFlex: {
        display: 'flex'
    },
    newTagStyle: {
        marginLeft: 'auto',
        alignSelf: 'center',
        display: 'inline-block',
        ...breakpoints.sm({ display: 'none' })
    },
    appIcon: {
        ...shorthands.borderRadius('4px'),
        height: '32px',
    }
});
