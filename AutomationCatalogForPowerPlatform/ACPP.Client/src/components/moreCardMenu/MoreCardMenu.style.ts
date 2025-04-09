import { makeStyles, shorthands } from '@fluentui/react-components';

export const useStyles = makeStyles({
    moreCardMenu: {
        display: 'inline-block'
    },
    menuButton: {
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
    }
});